---
layout: post
title: "视频频道页面重构总结"
date: 2014-07-02 23:16:42 +0800
comments: true
categories: Android
tags: [Android, 性能优化]
keywords: Android,视频,重构,性能优化,软件
---

***By Long Luo***


# 一、重构前的一些缺点

1. 频道显示在VideoListActivity实现的，代码结构不够清晰；
2. 频道页面需要根据不同频道目前存在矩阵式显示和列表式显示2种方式，矩阵式显示嵌入在ListView中实现的，造成加载时绘制矩阵式页面需要更长的时间；
3. 后续频道页面会参考第三方视频应用，不同频道会有不同的展示方式，而目前功能可扩展性不够好；

# 二、重构方案

重构方案:

1. 将频道页面独立出来，新建一个ChannelListActivity，作为所有频道页面的Activity，负责所有频道界面的绘制，便于后续扩展；
2. 针对不同频道，具有不同的布局方式，比如对于需要矩阵式显示的频道，使用矩阵式布局；
3. 矩阵式布局，替换原有的ListView加GridView显示，提高加载速度；

# 三、具体实现

技术实现方案如下所示：

1. 新建ChannelListActivity，在VideoListActivity中用进入频道页的接口替换原有的接口，将相关处理在ChannelListActivity中实现；
2. 根据传入的频道ID不同，使用**setContentView()**加载不同的布局方式，实现不同频道不同布局显示；
3. 新建ChannelGridAdapter，替换原有的ChannelListAdapter加ChannelGridListAdapter方式，提高加载速度；

<!--more-->

# 四、数据对比

我们通过TraceView工具比较前后2种方案的区别：

## 4.1 启动时间：

比较两者启动时间，可以看出重构之后的方案是有大概20ms的提升。

![Startup Time](http://blogresource.qiniudn.com/images/2014/Android/Channel/Channel_startupTime.png)

--------

## 4.2 TraceView对比：

通过DDMS TraceView工具，我们再比较下2者性能上的区别：

### 4.2.1 重构之前：

重构之前的在绘制页面时需要绘制ListView，然后在每一个List中在绘制GridView，在TraceView获取到的数据如下：

![ChannelListAdapter](http://blogresource.qiniudn.com/images/2014/Android/Channel/traceview_ChannelListAdapter_getView.png)

![ChannelGridListAdapter](http://blogresource.qiniudn.com/images/2014/Android/Channel/traceview_ChannelGridListAdapter_getView.png)

从以上可以分析，在ChannelListAdapter的getView()就占据了**1.0%**的Incl Cpu Time, GridView的getView()占据了**6.9%**的Incl Cpu Time，合计占用了**7.9%**的CPU Time。

### 4.2.2 重构之后：

重构之后，我们仅需要在ChannelGridAdapter中绘制View，测量数据如下：

![ChannelGridAdapter](http://blogresource.qiniudn.com/images/2014/Android/Channel/traceview_ChannelGridAdapter_getView.png)

从上图可以看出，getView()占据的CPU时间仅为**3.2%**，效率大大提高。


***Created by Long Luo at 2014/7/1 15:45:01***
***Completed by Long Luo at 2014/7/2 14:42:29***
***Modified by Long Luo at 2018年9月27日22点40分 at Hangzhou, China.***

