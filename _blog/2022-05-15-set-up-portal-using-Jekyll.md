---
layout: blog
title: 使用Jekyll快速搭建企业门户
date: 2022-05-15 12:15 +0800
categories: 创建企业 搭建企业门户
tags: 代码发布 GitHub
image: "images/team/jimmyxu.png"
title-image: "images/blogs/jekyll.png"
author: "Jimmy Xu"
jobtitle: "Principle Consultant"
linkedinurl: ""
promoted: true
weight: 1
---

<meta name="referrer" content="no-referrer" />

创业团队需要在互联网上建立对外沟通的渠道，企业门户和内容博客就是其中之一。利用免费的 Github Pages 与 开源的 Jekyll 可以快速建立一个企业级的门户网站和内容博客。

<a name="QPOuI"></a>
### 准备工作
1）Github Pages

Github Pages 是 Github 提供的一个静态页面服务，支持 MarkDown 格式的静态页面的展示，非常适合开源项目的说明文档和内容博客发布 （ [https://pages.github.com/](https://pages.github.com/) ）。

2）Jekyll

由于其默认支持 Jekyll，这里就选择使用 Jekyll 来构建我们的企业门户和内容博客 （ [https://jekyllrb.com/](https://jekyllrb.com/) ）。Jekyll 使用的语言是 Ruby，也符合采客推荐的技术栈。同时，Jekyll 也支持各种主题，可以通过 gem 或者 fork 的方式直接安装与客制化，方便创业者把精力集中到内容本身。

3）MarkDown

MarkDown 是一种简易的格式化文本的方式，对于有一定技术背景的人来说，是非常方便的文档编辑的工具。Github Pages 和 Jekyll 均默认支持这种格式的（ [https://www.markdownguide.org/](https://www.markdownguide.org/) ）

4）Git

对 Git 的基本功能的了解。不需要深入理解 Git。能 clone、add、commit、pull 和 push 即可。当然，也可以安装一个免费的图形界面 app。


<a name="R9LZT"></a>
### 搭建过程
下面我们以 Chirpy 为例，对搭建的过程做一个说明。

Chirpy 有一个 Live Demo 的示例网站，可以先浏览一下对基本的界面有个大致的了解。同步，了解下介绍的帮助文档（ [https://chirpy.cotes.page/posts/getting-started/](https://chirpy.cotes.page/posts/getting-started/) ）
<br /> ![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1651508318180-f3638a50-b5ad-47e4-8b9a-ad15fba0c011.png)<br />

这里我们选择 Option 1，使用 Chirpy Starter 的方式来直接创建一个 Github 的代码库。保证正在使用的浏览器（ 比如 Edge 或者 Safari 已经登陆了 Github ），点击上图中 Chirpy Starter 的链接，会直接跳转到 Github 的创建代码库（ Repository ）的页面。使用你的github的用户名 + .github.io 来创建。如下图示例，笔者的用户名是 xujianmin，那么需要填入的就是 xujianmin.github.io。

<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1651508586926-feaef682-88ab-4111-aa99-16932ae9582c.png)<br /> 按 Github 的约定，这个代码库必须是 开源 （Public） 的，如果选成了私有（ Private ）那就不能直接使用 https://your-user-name.github.io 来访问了。当然，Github Pages 允许使用自由的域名和证书，按帮助配置即可。

代码库好了之后，就可以克隆到本地。其实，这个时候已经可以使用 https://usingnow.github.io 来查看效果了，只是默认的安装没有 _layouts 文件夹，因此没有任何的页面效果，只能看到以下文字，而这 index.html 文件可以在应用主目录下找到。
<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1651509455418-6487de12-0bab-4e5b-84c7-302e1f489f0a.png)
<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1651509897371-10e14182-990a-4d1f-97f3-e31f6e93d43f.png)<br />

我们来尝试在本地跑起来 Jekyll server，类似 rails s 一样，这样就可以在本地看到效果之后再部署。

{% highlight  bash %}
> cd your-repositories-folder
> git clone git@github.com:usingnow/usingnow.github.io.git
> cd usingnow.github.io

# 如果使用 RVM 管理 Ruby。

> rvm install 2.7.2 # ruby 3.1.0 似乎和 eventmachine 有冲突，此处使用 2.7.2。
> rvm gemset create chirpy
> rvm use 2.7.2@chirpy

# 如果使用 rbenv 管理 Ruby。
# 需要安装 rbenv 的 gemset 插件。 https://github.com/jf/rbenv-gemset#usage
> rbenv install 2.7.2
> rbenv gemset create 2.7.2 chirpy

> bundle install

> bundle info --path jekyll-theme-chirpy # 查看 chirpy gem 的实际安装地址。

# 打来文件浏览器，找到这个文件夹，将 _layouts 和 assets 里的内容都拷贝到主目录下。

> bundle exec jekyll s # 启动 jekyll server。

# 通过 http://localhost:4000 可以看到网站。
{% endhighlight %}

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1651509169053-65124fd6-ae57-493a-85d4-4d0398f74465.png)
<a name="VQBA0"></a>
### 配置站点
Jekyll 的主目录下有一个 _config.yml 文件，主要个配置都是在这个文件中。这里挑一些主要的配置项。

{% highlight  yaml %}
# The language of the webpage › http://www.lingoes.net/en/translator/langcode.htm
# If it has the same name as one of the files in folder `_data/locales`, the layout language will also be changed,
# otherwise, the layout language will use the default value of 'en'.

# 改成支持简体中文。可以在主目录下找到 _locale 文件夹，里面有所有支持的语言。
lang: zh-CN

# Change to your timezone › http://www.timezoneconverter.com/cgi-bin/findzone/findzone

# 设置为 +8
timezone: Asia/Shanghai

# jekyll-seo-tag settings › https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md
# ↓ --------------------------

# 为搜索引擎 SOE 做的网站描述。
title: 采客               # the main title

tagline: 你身边的创业智库   # it will display as the sub-title

description: >-          # used by seo meta and the atom feed
  让每个认真的创业者都能借力互联网与开源工具降本增效，从而专注于业务本身。
  知识决定创业的基石，多了解一些知识，就少走些弯路。
  工具的本质，就是通过可习得的方式，复用现成的经验或者知识，来快速拉齐和天才的差距。
  牛顿说的“站在巨人的肩膀上”即如是。
  
# fill in the protocol & hostname for your site, e.g., 'https://username.github.io'
url: 'usingnow.github.io'
{% endhighlight %}

<a name="eRGi3"></a>

配置保存后，企业门户搭建的过程已经完成，接下来我们需要进行[第一次代码发布](https://usingnow.github.io/posts/first-code-release/)。