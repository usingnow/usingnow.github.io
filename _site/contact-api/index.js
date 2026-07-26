// contact-api - usingnow.tech 联系表单，飞书多维表
// 运行时：Node.js 18，函数计算 FC3

const TOKEN_URL = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal';
const RECORD_URL = (appToken, tableId) =>
  `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`;

// ---------- 工具 ----------

const corsHeaders = (origin) => ({
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
});

function resp(statusCode, body, origin) {
  return {
    statusCode,
    headers: corsHeaders(origin),
    body: JSON.stringify(body),
  };
}

const trim = (v) => (typeof v === 'string' ? v.trim() : '');

// ---------- 校验 ----------

const PHONE_RE = /^1[3-9]\d{9}$/;

function validate(body) {
  const subject   = trim(body.subject);
  const name      = trim(body.name);
  const cellphone = trim(body.cellphone);
  const company   = trim(body.company);
  const content   = trim(body.content);
  const website   = trim(body.website); // Honeypot

  if (website) {
    // 静默拒绝：返回假成功，避免被探测
    return { ok: true, data: { subject, name, cellphone, company, content, silent: true } };
  }

  if (!subject || subject.length > 100)  return { error: '请填写主题（1-100 字）' };
  if (!name    || name.length > 50)      return { error: '请填写联系人姓名（1-50 字）' };
  if (!PHONE_RE.test(cellphone))         return { error: '请填写正确的手机号' };
  if (company.length > 100)              return { error: '企业名称过长' };
  if (!content || content.length > 2000) return { error: '请填写咨询内容（1-2000 字）' };

  return { ok: true, data: { subject, name, cellphone, company, content } };
}

// ---------- 限流（实例内存，每实例独立计数） ----------

const RATE_LIMIT = 5;       // 5 次
const RATE_WINDOW = 3600;   // 1 小时
const buckets = new Map();  // ip -> { count, resetAt }

function rateLimit(ip) {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW * 1000 });
    return true;
  }
  if (b.count >= RATE_LIMIT) return false;
  b.count += 1;
  return true;
}

// ---------- 飞书 ----------

let cachedToken = null;     // { token, expireAt }

async function getTenantToken(env) {
  const now = Date.now();
  if (cachedToken && cachedToken.expireAt - now > 60_000) {
    return cachedToken.token;
  }
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_id: env.FEISHU_APP_ID,
      app_secret: env.FEISHU_APP_SECRET,
    }),
  });
  const j = await r.json();
  if (j.code !== 0 || !j.tenant_access_token) {
    throw new Error(`token failed: ${j.code} ${j.msg}`);
  }
  // 提前 5 分钟过期
  cachedToken = {
    token: j.tenant_access_token,
    expireAt: now + (j.expire - 300) * 1000,
  };
  return cachedToken.token;
}

async function createRecord(env, token, fields) {
  const r = await fetch(RECORD_URL(env.FEISHU_APP_TOKEN, env.FEISHU_TABLE_ID), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ fields }),
  });
  const j = await r.json();
  if (j.code !== 0) {
    throw new Error(`record failed: ${j.code} ${j.msg}`);
  }
  return j.data;
}

function mapFields(d) {
  // 表单英文字段 → 飞书多维表中文列名
  return {
    '主题':     d.subject,
    '联系人':   d.name,
    '手机号':   d.cellphone,
    '潜客企业': d.company,
    '咨询内容': d.content,
    '提交时间': Date.now(),
    '线索来源': 'usingnow.tech/contact',
    '处理状态': '待跟进',
  };
}

// ---------- 入口 ----------

// FC3 HTTP 触发器：event 可能是 Buffer/字符串；method 在 requestContext.http.method
function normalizeEvent(raw) {
  let event = raw;
  if (Buffer.isBuffer(event)) event = event.toString('utf8');
  if (typeof event === 'string') {
    try { event = JSON.parse(event); } catch (_) { event = {}; }
  }
  if (!event || typeof event !== 'object') event = {};

  const method = String(
    (event.requestContext && event.requestContext.http && event.requestContext.http.method) ||
    event.httpMethod ||
    event.method ||
    ''
  ).toUpperCase();

  const headers = event.headers || {};
  return { event, method, headers };
}

module.exports.handler = async (rawEvent, context) => {
  const env = {
    FEISHU_APP_ID:     process.env.FEISHU_APP_ID,
    FEISHU_APP_SECRET: process.env.FEISHU_APP_SECRET,
    FEISHU_APP_TOKEN:  process.env.FEISHU_APP_TOKEN,
    FEISHU_TABLE_ID:   process.env.FEISHU_TABLE_ID,
    ALLOWED_ORIGIN:    process.env.ALLOWED_ORIGIN || 'https://usingnow.tech',
  };
  const origin = env.ALLOWED_ORIGIN;
  const { event, method, headers } = normalizeEvent(rawEvent);

  // CORS 预检
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(origin), body: '' };
  }

  // 仅允许 POST
  if (method !== 'POST') {
    return resp(405, { ok: false, message: 'Method Not Allowed' }, origin);
  }

  // 解析 body（FC HTTP 触发器 body 常为 base64）
  let body;
  try {
    body = event.body
      ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body)
      : {};
    if (typeof body === 'string') body = JSON.parse(body);
  } catch (_) {
    return resp(400, { ok: false, message: '请求格式错误' }, origin);
  }

  // 校验
  const v = validate(body);
  if (v.error) {
    return resp(400, { ok: false, message: v.error }, origin);
  }
  if (v.data.silent) {
    // Honeypot 命中：假成功
    return resp(200, { ok: true, message: '提交成功，我们会尽快与您联系' }, origin);
  }

  // 限流
  const ip = headers['x-forwarded-for'] || headers['X-Forwarded-For'] || 'unknown';
  if (!rateLimit(String(ip).split(',')[0].trim())) {
    return resp(429, { ok: false, message: '提交过于频繁，请稍后再试' }, origin);
  }

  // 写飞书
  try {
    const token = await getTenantToken(env);
    await createRecord(env, token, mapFields(v.data));
    return resp(200, { ok: true, message: '提交成功，我们会尽快与您联系' }, origin);
  } catch (e) {
    console.error('feishu error:', e.message);
    return resp(502, { ok: false, message: '提交失败，请稍后重试' }, origin);
  }
};