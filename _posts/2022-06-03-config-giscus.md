---
layout: post
title: 如何在 chirpy 中配置 giscus 评论功能
date: 2022-06-03 22:24 +0800
categories: 创建企业 搭建企业门户
tags: giscus  评论管理
---
<meta name="referrer" content="no-referrer" />

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