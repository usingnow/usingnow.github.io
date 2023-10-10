---
layout: blog
title: 如何在 chirpy 中配置 giscus 评论功能
date: 2022-06-03 22:24 +0800
categories: 创建企业 搭建企业门户
tags: giscus  评论管理
image: "images/team/jimmyxu.png"
title-image: "images/blogs/jekyll.png"
author: "Jimmy Xu"
jobtitle: "Principle Consultant"
linkedinurl: ""
promoted: true
weight: 3
---
<meta name="referrer" content="no-referrer" />

### 添加 giscus 评论系统
如果博客系统需要和用户进行互动的话，可以添加评论系统。这里使用 Github Discussions，把评论放到博客系统的代码库统一管理。

#### Github 代码库上打开 Discussion 功能
打开博客系统代码库的 Github Discussions 功能。以管理员身份登陆，并进入代码库主页，点击 Setting。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652627837728-0d689894-04d6-4505-a403-d3192fcb1acb.png)

在 Features 专栏下面，勾选 Discussions。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652627908458-f1472c03-be32-45aa-95fc-26fe0ed51fe0.png)

#### 配置 giscus.app
进入 giscus.app 官网，有中文版。（ [https://giscus.app/zh-CN](https://giscus.app/zh-CN)）下拉到“配置”处，可以看到有三个前置条件需要完成。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652628024902-b0a810f1-2475-4659-986f-56a1f6cd49fd.png)

1. Github Pages 博客系统必须是“公开的”，加评论一般博客都能正常打开了，这个没有问题。
1. giscus app 是否已经安装。一般没有。在登陆博客代码库管理员的情况下，点击这个 giscus 的链接即可进入 Github Marketplace，点击 Install 的按钮进行安装。安装成功的话，可以看到以下页面。如果对安全要求比较高，可以选择 giscus.app 可以写入 Discussions thread 的具体代码库，当然，这里一般就是博客系统啦。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652628243641-680f7508-ac65-4fd1-b5a6-e0cd9554694d.png)

3. Discussions 在前一步中已经打开。

至此，所有前置条件都已经完成。在仓库中，输入 <your-github-account>/<repo>。

接着往下，页面和 discussion 映射关系。默认是 pathname。如果和笔者一样希望使用中文作为文章的标题的话，建议选择 <title>。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652628492414-86ed3db0-70b0-4857-a76b-a79c48e2e407.png)

继续往下，Discussion 分类建议使用 Annoucements，理由已经很明显，还是保持尽可能的安全。毕竟谁也不想惹麻烦。特性和主题可以随意。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652628594117-32806877-dce9-4742-a8d4-c0e056dae87b.png)

接着往下，可以看到 giscus 网站已经把相关的配置项都列出了。
```javascript
// 可以看到这样一个<script>标签
// 这里比较重要的部分，已经标注了

<script src="https://giscus.app/client.js"
        data-repo="usingnow/usingnow.github.io"
        data-repo-id="SomeStrings"				//重要
        data-category="Announcements"			//重要
        data-category-id="AnotherStrings"	//重要	
        data-mapping="title"							//重要
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"					//重要
        data-theme="light"
        data-lang="zh-CN"									//重要
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

#### 在 Chirpy 中配置 giscus
在 Chirpy 中，并不需要直接将这个 js 代码块直接引入，而是通过在 _config.yml 中进行配置。可以发现并不是所有的配置项都已经包括，如果需要，可以增加去掉“data-” 的部分即可。注意，“active:” 这个配置项默认是空的，也就是不激活评论，必须填入 giscus。
```yaml
comments:
  active:         giscus  # The global switch for posts comments, e.g., 'disqus'.  Keep it empty means disable
  # The active options are as follows:
  disqus:
    shortname:    # fill with the Disqus shortname. › https://help.disqus.com/en/articles/1717111-what-s-a-shortname
  # utterances settings › https://utteranc.es/
  utterances:
    repo:         # <gh-username>/<repo>
    issue_term:   # < url | pathname | title | ...>
  # Giscus options › https://giscus.app
  giscus:
    repo:             usingnow/usingnow.github.io
    repo_id:          SomeStrings
    category:         Announcements
    category_id:      AnotherStrings
    mapping:          title
    input_position:   top
    lang:             zh-CN
```
全部完成保存后，直接推送即可。如果需要在本地起 jekyll s 的话，记得要重启服务器让配置文件加载生效。

#### 在 Github Discussions 中管理评论
管理员和合作者可以在 Github Discussions 中管理评论。进入 Github 代码库，点击 Discussions。可以看到我们的每篇博客文章都被作为一个单独的 Discussion 列出（只有被评论过的会有，且按 title 来标明）。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652630281273-74a6e68b-6eff-48d3-9b78-5f84a5bf942a.png)

点击进入某个 Dicussion。浏览到需要管理的评论，选择右上角的 ··· 就可以进行编辑、隐藏、删除等管理工作了。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652630404112-c852fd0b-0399-402e-9977-9e5ca1828056.png)

如果想要锁定或者删除整个 Discussion。在右侧边栏的底部，可以看到如下菜单。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652630537325-7924d472-90a0-44f1-8b6a-face10ab8c1b.png)

好啦，至此采用 giscus 的评论系统已经可以使用了。Enjoy～