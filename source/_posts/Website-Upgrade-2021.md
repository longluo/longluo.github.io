---
title: '网站升级（2021年度）'
date: 2021-03-10 23:11:22
tags: [网站, Hexo, 微博]
categories: Web
keywords: website, Hexo, Next, Font, 网站, 升级, 评论, JS, 
comments: true
---

***By Long Luo***

最近对网站进行了一些升级，增加了一些新特性，在此做下记录：

# Hexo升级到8.X版本

之前使用的`Hexo`是v7.8版本，最近升级到8.X版本。
`Next`主题的Github地址从[theme-next](https://github.com/theme-next/hexo-theme-next)切换到了[next-theme](https://github.com/next-theme/hexo-theme-next/) ，8.X版本都位于此网站[theme-next.js.org](https://theme-next.js.org/)上。

直接`git clone https://github.com/next-theme/hexo-theme-next/`最新代码，修改`Next Theme`的`_config.yml`文件。

# 增加说说页面

之前看到一些其他个人网站有类似于时间线的界面，如：[苏剑林科学空间的微言微语](https://spaces.ac.cn/me.html/comment-page-2#comments)
和[卢昌海的微言小义](https://www.changhai.org/articles/miscellaneous/blog/202101.php)。

因为很多时候写一篇博文太长太重了，而实际上想发表下一些碎片化的思考和感悟。这种时间线的句子更合适些。所以也想自己搭建一个，最终通过网络寻找资料找到并搭建了2个页面：

1. [碎碎念](http://longluo.me/suisuinian) 
2. [说说](http://longluo.me/bb)

搭建方法很简单，可参考下面的2篇文章：
1. [为你的hexo博客添加动态的（可直接发布说说的）说说页面](https://cndrew.cn/2020/04/10/hexo-shuoshuo/)
2. [BB短博文Hexo-Next主题(8.0+)适配](https://www.heson10.com/posts/26865.html)

哔哔可能更好点，因为可以通过微信公众号直接发送，但由于这部分没有开源，如果可以迁移到自己的微信公众号就更好了。

<!--more-->

# 字体改为思源宋体

Google Fonts在2018年12月7日支持思源宋体。这是一款适合**长时间阅读的字体**。
配置方法也很简单，直接修改Next主题配置文件`_config.yml`:

```xml
# ---------------------------------------------------------------
# Font Settings
# ---------------------------------------------------------------
# Find fonts on Google Fonts (https://fonts.google.com)
# All fonts set here will have the following styles:
#   light | light italic | normal | normal italic | bold | bold italic
# Be aware that setting too much fonts will cause site running slowly
# ---------------------------------------------------------------
# Web Safe fonts are recommended for `global` (and `title`):
# Arial | Tahoma | Helvetica | Times New Roman | Courier New | Verdana | Georgia | Palatino | Garamond | Comic Sans MS | Trebuchet MS
# ---------------------------------------------------------------

font:
  enable: true

  # Uri of fonts host, e.g. https://fonts.googleapis.com (Default).
  # 字体CDN
  host: https://fonts.loli.net

  # Font options:
  # `external: true` will load this font family from `host` above.
  # `family: Times New Roman`. Without any quotes.
  # `size: x.x`. Use `em` as unit. Default: 1 (16px)

  # Global font settings used for all elements inside <body>.
  # 全局字体设置
  global:
    external: true
    #family: Lato
    #size:
    family: Noto Serif SC
    size: 0.9

  # Font settings for site title (.site-title).
  # .site-title 站点标题字体设置
  title:
    external: true
    family: Merriweather
    size:

  # Font settings for headlines (<h1> to <h6>).
  # 文章标题字体设置
  headings:
    external: true
    family: EB Garamond
    size:

  # Font settings for posts (.post-body).
  # 文章页面字体设置
  posts:
    external: true
    family:

  # Font settings for <code> and code blocks.
  # 代码块字体设置
  codes:
    external: true
    family: Source Code Pro
```



# 增加阅读次数统计

之前统计次数一直使用[LeanCloud国内版](https://www.leancloud.cn/)，后来通知说网站需要备案才能用。之后一直拖延着导致文章阅读次数一直存在问题，今天切换到[LeanCloud国际版](https://www.leancloud.app/)，解决了这个问题。

具体操作和国内版没啥差别。

#  评论系统切换为twikoo

这个网站使用过很多评论系统，从[多说](https://baike.baidu.com/item/%E5%A4%9A%E8%AF%B4/5365567?fr=aladdin)，[Valine](https://valine.js.org/), [Gitment](https://github.com/imsun/gitment)到[GitTalk](https://github.com/gitalk/gitalk)。

GitTalk有2个缺点：
1. GitTalk评论需要登录Github，绝大部分人也许只想简单评论下，这个步骤会导致绝大部分人不想评论；
2. GitTalk需要手动进入每个页面，然后才会自动创建评论，如果之前有太多文章的话，一个一个点进去太麻烦了。

有鉴于此，将评论从`GitTalk`切换到[Twikoo](https://twikoo.js.org/)，具体操作可按照操作文档。

