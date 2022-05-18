---
layout: post
title: 创建一篇新博客
date: 2022-05-18 15:35 +0800
categories: 创建企业 搭建企业门户
tags: Blog Markdown
---

<meta name="referrer" content="no-referrer" />

<a name="eRGi3"></a>
### 第一篇博客
<a name="EYjME"></a>
#### 创建一篇新博客
最简单的方式就是将命名方式为：YYYY-MM-DD-TITILE.EXTENSION的.md/.markdown 文件，存储到应用根目录 _posts 文件夹中。（ 参考网址：[https://chirpy.cotes.page/posts/write-a-new-post/](https://chirpy.cotes.page/posts/write-a-new-post/) ）

实际上，每篇博客就是一个采用 Markdown 语法的文本文件。这里推荐参考 Github Pages 和 Jekyll 的语法，以最大程度上保持兼容性。

在 Jekyll 中每个 Markdown 文件都定义了一个 Front Matter 的特殊代码块，里面记录了一些该博客的元数据 （ Meta Data ）。Front Matter 实际上就是一个 YAML 的语法块。Jekyll 利用这些信息知道用什么模板、文章的标题、什么日期时间发布、要打什么标签等事务。
```yaml
---
layout: post
title: Blogging Like a Hacker
---
```
每次都手动来建博客文章的话，就需要手动输入这些数据。为了能简化这个过程，且减少人工输入造成的拼写错误等，我们建议使用 jekyll-compose 来简化这个过程。
（参考网址：[https://github.com/jekyll/jekyll-compose](https://github.com/jekyll/jekyll-compose)）
```ruby
# 在 Gemfile 文件中插入以下代码并保存：
gem 'jekyll-compose', group: [:jekyll_plugins]

# 保存后，执行bundle install
> bundle install

# bundle完成后，即可创建第一篇博客。
> bundle exec jekyll post "Create a new blog"
```
使用jekyll-compose创建的名为 "Create a new blog" 的.md文件将会自动存储在应用根目录 _posts 文件夹中，并以规定格式命名。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27573692/1652710124206-8f7fc435-a388-4a0b-bc09-f0ed87c3e7f7.png)

<a name="KdKQU"></a>
#### 博客内容撰写
进入对应post文档（"2022-05-16-create-a-new-blog.md"），可以看到jekyll-compose已经自动创建了元数据信息，你可以根据自己的需求进行信息更新。例如，将原始title "Create a new blog" 修改为 "如何创建一篇新博客"。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27573692/1652710618221-da40a135-1db1-4d35-8a21-df3a6f87d746.png)

启动服务器，可以看到原始blog标题已被成功修改为 "如何创建一篇新博客"。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27573692/1652711303415-b50e9630-efb9-49fc-81a5-1a50f35af07a.png)

如果你希望针对该blog进行分类或者标签，可以在元数据区域中通过新增 categories 和 tags 并键入相应的内容进行管理。
```markdown
---
layout: post
title: 如何创建一篇新博客
date: 2022-05-16 22:00 +0800
categories: 创建企业门户 创建新博客
tags: 门户 博客
---
```

博客正文请使用markdown语法进行撰写，Markdown基本语法可参照官网文档（[https://www.markdownguide.org/basic-syntax/](https://www.markdownguide.org/basic-syntax/)），并保存成功后，push 到 Github 的代码库中，刷新您配置的网址，即可看到已发布的blog。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27573692/1652712184674-0130ecfd-9910-4454-9945-a545be5cd910.png)

博客已经发布完成啦！为了便于与用户的线上互动，接下来，我们尝试添加评论系统。