---
layout: blog
title: 第一次代码发布
date: 2022-05-16 22:00 +0800
categories: 创建企业 搭建企业门户
tags: 代码发布 GitHub
image: "images/team/jimmyxu.png"
title-image: "images/blogs/jekyll.png"
author: "Jimmy Xu"
jobtitle: "Principle Consultant"
linkedinurl: ""
promoted: true
weight: 2
---

<meta name="referrer" content="no-referrer" />


在完成企业门户搭建与基本配置后，可以进行第一次发布。直接把生成好的代码 push 到 Github 的代码库，稍等几分钟，就可以看到这些变化。能做到这点的原因是 Chirpy 使用 Github Actions 来自动编译 Jekyll 的源码，并将它放入 gh-pages 分支。Github Pages 可以使用这个分支中的内容来生成静态的页面。

在部署之前，请确认 _config.yml 文件中的 url 已经正确配置。

处于安全上的考虑，Github Pages 是运行在 “安全模式” 下的，但这也阻挠了 Jekyll 中依赖插件自动生成的一些页面文件。因此，这里采用 Github Actions 的功能，在每次 git push 后自动构建整个站点。

- 确认 .github/workflows/pages-deploy.yml 文件存在。打开文件，确保 on.push.branches 中的值与网站代码库的默认分支一致。一般是 main。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652543547371-5e5c4b2d-7f18-40c9-8a99-8407a6e0c48f.png)

- 确认 tools/deploy.sh 文件存在。这个文件目前不需要任何修改。
- 另外，如果我们曾经运行过 bundle install，那么会自动生成一个 Gemfile.lock 文件。同时，你的操作系统如果不是 Linux，那么你还需要运行以下的命令保持兼容性。注意：这里的操作系统是指你运行 bundle install 的那个系统，如果你使用虚拟机，那要明确虚拟机的系统，而不是你电脑的系统。
```bash
 bundle lock --add-platform x86_64-linux
```
做完以上的步骤，在确认下 Github 上站点的代码库的名称为 <your-github-account>.github.io。

有了以上的设置，我们的站点在收到 git push 的内容之后就会自动构建并发布到 gh-pages 分支中。可以在 Github 上的代码库中看到 Actions 的执行情况。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652545379082-fd83b630-d99d-4d1c-be18-4abb0d128484.png)

这里还要有两个设置需要确认。

- 更改代码库使用的默认源码分支为 gh-pages。这里还能看到站点是否已经编译完成，可以访问。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652546294664-1c9591c2-9e0e-4ce8-bd50-8d8d972907f8.png)
- Actions 在运行中需要同时有读写权限，而 Github Actions 的设置在默认的情况下，仅有只读权限。如果看到这样的报错，可以在设置中打开写权限。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27640265/1652540206204-af7f4c56-88c8-4ffc-ad5f-212de3eb21a8.png)

第一次代码发布已完成，接下来我们尝试在企业门户中[撰写第一篇博客](https://usingnow.github.io/posts/create-a-new-blog/)。