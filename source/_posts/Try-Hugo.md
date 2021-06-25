---
title: '使用Hugo搭建个人网站'
comments: true
date: 2021-03-26 22:50:25
tags: [Hugo, Web]
categories: Web
keywords: Hugo, Web, Website, 个人网站, 网站, Hexo, 
---

***By Long Luo***

<!-- TOC -->

- [Hugo vs. Hexo](#hugo-vs-hexo)
- [Hugo使用指南](#hugo使用指南)
  - [下载Hugo](#下载hugo)
  - [创建站点项目](#创建站点项目)
  - [添加主题](#添加主题)
  - [运行站点](#运行站点)
- [小结](#小结)

<!-- /TOC -->

# Hugo vs. Hexo 

目前我的个人网站使用的是: Hexo + Next，这也是目前绝大多数个人网站的标配。[Hugo](https://gohugo.io)官网号称是最快的网站框架，构建速度快，因为我的文章数比较多，以后考虑切换成Hugo，今天花了点时间来学习了下。

以下是学习过程：

# Hugo使用指南

## 下载Hugo

因为是Windows 10系统，先去下载：https://github.com/gohugoio/hugo/releases

选择Windows版本，下载之后解压，解压可以得到`hugo.exe`，将`hugo.exe`所在文件路径添加到Windows的Path变量中:
```bash
E:\Website>hugo version
hugo v0.82.0-9D960784+extended windows/amd64 BuildDate=2021-03-21T17:28:04Z VendorInfo=gohugoio
```
<!--more-->

## 创建站点项目

以我为例， 假设要创建站点存放在`F:\Hugo\Website\`目录中，在命令行中切换到该目录下执行：
```bash
E:\Website>hugo new site mywebsite
Congratulations! Your new Hugo site is created in E:\Website\mywebsite.
```
出现上述信息，创建出了`mywebsite`站点项目，其文件列表如下：
```bash
2021/03/28  15:52    <DIR>          .
2021/03/28  15:52    <DIR>          ..
2021/03/28  15:51    <DIR>          archetypes
2021/03/28  16:09               103 config.toml
2021/03/28  16:12    <DIR>          content
2021/03/28  15:51    <DIR>          data
2021/03/28  15:51    <DIR>          layouts
2021/03/28  15:52    <DIR>          resources
2021/03/28  15:51    <DIR>          static
2021/03/28  16:08    <DIR>          themes
```

## 添加主题
有了文件之后，还无法构建网站，因为hugo默认是没有主题文件的。这里选取一个简洁的主题
```bash
git clone https://github.com/yihui/hugo-prose.git themes/prose
```
当前项目目录内打开`config.toml`配置文件，在最后添加一行`theme = "prose"`，即将这个网站设置为prose主题。

## 运行站点
在站点项目内执行命令`hugo server -D`
```bash
E:\Website\mywebsite>hugo server -D
Start building sites …

                   | EN
-------------------+-----
  Pages            | 10
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  4
  Processed images |  0
  Aliases          |  1
  Sitemaps         |  1
  Cleaned          |  0

Built in 30 ms
Watching for changes in E:\Website\mywebsite\{archetypes,content,data,layouts,static,themes}
Watching for config changes in E:\Website\mywebsite\config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```
然后在浏览器界面中输入：http://localhost:1313/

如果顺利打开之后，出现了Hugo网站界面，那说明安装好了！

不过这个时候还是没有内容的，因为我们还没有添加内容:-)

# 小结
从hugo初体验来看，Hugo确实很快。不过由于目前缺乏时间，无法一一去美化。以后有时间精力之后，再折腾！
