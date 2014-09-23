---
layout: post
title: "如何从零实现一个你的个人博客Android App?"
date: 2014-09-21 11:43:03 +0800
comments: true
categories: App
description: "这篇文章描述的是我个人在制造我的个人阅读App所走过的弯路，因为历时比较长，直到最近2周才有突破性进展，在此将这些经验与教训总结下来，希望对有需要的同学有所帮助。"
keywords: Android, App, RSS, XML
---

#### *By Long Luo*

### 一、Overview

最近实现了我的第一个个人博客阅读App，但是***目前存在很多很多Bugo(╯□╰)o  >_<|||***。

可以通过这个App来实现RSS订阅功能，第一时间阅读我的个人博客文章，同时可实现文章收藏与分享功能。App使用截图如下所示：


#### 1. RSS 订阅最新的20篇文章

![All Articles](http://blogresource.qiniudn.com/images%2F2014%2FAndroid%2FBlogReader%2Fblogreader_all.png?imageView/1/w/540/h/960/q/62/format/PNG)

<!--more-->


#### 2. 可以收藏文章

![Favorite Articles](http://blogresource.qiniudn.com/images%2F2014%2FAndroid%2FBlogReader%2Fblogreader_favorite.png?imageView/1/w/540/h/960/q/62/format/PNG)

#### 3. 查看文章全文

![Article Detail](http://blogresource.qiniudn.com/images%2F2014%2FAndroid%2FBlogReader%2Fblogreader_article_detail.png?imageView/1/w/540/h/960/q/62/format/PNG)

#### 4. 支持将文章分享到SNS

![SNS Share](http://blogresource.qiniudn.com/images%2F2014%2FAndroid%2FBlogReader%2Fblogreader_article_share.png?imageView/1/w/540/h/960/q/62/format/PNG)


### 二、How to make it?

其实我去年就想实现一个我的个人App，但是由于种种原因一直拖到现在才有了1.0版本，期间走过了很多弯路，也进行了反思，为什么失败？我觉得部分原因如下：

#### 1. 产品功能不清晰

最开始产品功能不清楚，到底仅仅是博客阅读App还是一个大而全式的App，包含自己的简历，网站，展示自己的一些作品？

如果一开始就仅仅是最简单的博客阅读App，那实现难度就降了一个数量级了，目前完成的成品也仅仅是一个阅读App。

#### 2. 没有选择一个合适的产品参考

对于从无到有，最好是有成熟的产品可以参考，但是一开始我没有找到。有一天新大陆似的发现了[**WordPress**](https://wordpress.org/)的开源Android客户端，于是决定参照此开源代码进行开发。

WordPress的Android客户端代码*太庞大*了，当时也没有去认真阅读里面的源码。后来有很长一段时间，我的这个项目又放弃了。

#### 3. 网站自动制作App

有一天看到别人分享的网站自动制作App，于是折腾了2天，看能不能给我制作出来，不过最后以失败告终。

#### 4. 制定详细规划

为什么在最近2周又突飞猛进了呢？
中秋节3天，也没啥事，于是绝对重新捡起来。首先，我思考了这款App要做成什么样？有那些功能？各需要哪些技术？

于是分析如下：

##### 需要的功能

1. 1.0版本只做最基本的博客阅读功能；
2. 文章可以收藏也可以分享；
3. 文章可以删除以及标记阅读情况功能

##### 需要的技术

1. 博客阅读，也就是RSS订阅功能，需要学习RSS解析技术；
2. 最基本的页面设计，使用底部Tab技术；
3. 文章可以编辑处理，也就需要一个数据库，需要对这个阅读数据库设计，由ContentProvider实现；
4. 收藏功能，爷就是在数据库增加一个字段，在查询时进行处理，新建一张表；
5. 分享功能，使用分享SDK完成

#### 5. 实现

经过上述分析，那么开始学习相关技术，努力编程实现吧！

在实现RSS技术的过程中，其实也就是XML解析技术。通过研读了网上开源代码，移植Ok。其实界面调优也花了不少时间。

### 三、Download

说了这么多，放下新Apk下载链接吧，大家也体验一下吧：


[**点我下载**](http://blogresource.qiniudn.com/images%2F2014%2FAndroid%2FBlogReader%2Fapk%2FBlogReader_v1.0_20140923.apk)

#### *Created by Long Luo at 2014-09-21 22:09:21 @Shenzhen, China.*
#### *Completed By Long Luo at 2014-09-21 23:12:02 @Shenzhen, China.*

#### *Modified By Long Luo at 2014-9-23 21:07:26 @Shenzhen, China.*


