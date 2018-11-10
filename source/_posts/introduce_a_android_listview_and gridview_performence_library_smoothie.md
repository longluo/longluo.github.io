---
layout: post
title: "介绍一个提高Android ListView或GridView的Smoothie库"
date: 2014-02-15 11:41:06 +0800
comments: true
categories: Android
tags: [Android, ListView, GridView]
keywords: Android, ListView, GridView, Layout, 库
---

***翻译 By Long Luo***

原文链接：[Introducing Smoothie](http://lucasr.org/2013/01/06/introducing-smoothie/)


![smoothie](http://blogresource.qiniudn.com/2014/Android/smoothie.png)

[Pattrn](http://pattrnapp.com/) UI中的很大一部分是在滑动时从云端获取图片列表。所以我花了相当长的一段时间去调试，以获得滑动时的体验尽可能的流畅。在过去的几周里，我一直在试图解耦代码，完成了一个很小的库：[Smoothie](https://github.com/lucasr/smoothie)。

***Smoothie***提供了一个简单的API来异步加载*ListView/GridView*的项目，以和UI线程分离。它做了所有你所期望做的事情，加载项目变得可见，取消要求回收的View对应的项目等。但它所完成的还不止这些。

***Smoothie***是**手势识别**：在Fling手势时，它会必须发起加载项目请求；在滑动列表时，当你的手指按下时，将会启用增量加载项目请求。此外，它支持当前屏幕外项目预加载功能，当你滑动时，可以减少加载占位符类型的项目数。说穿来，***Smoothie***使用了一个支持可以阻塞队列动态优先执行的的线程池。在屏幕上滑动时，屏幕外即将可见的项目加载请求将动态的获取更高的优先级。

那么，怎么使用它呢？很简单：

<!--more-->

1. 首先在你的布局文件中增加一个[AsyncListView](https://github.com/lucasr/smoothie/blob/master/library/src/org/lucasr/smoothie/AsyncListView.java)或者[AsyncGridView](https://github.com/lucasr/smoothie/blob/master/library/src/org/lucasr/smoothie/AsyncGridView.java)，只需要增加一个额外传递的方法到响应的父类中。

2. 然后实现一个和你的应用程序加载和显示项目逻辑一致的[ItemLoader](https://github.com/lucasr/smoothie/blob/master/library/src/org/lucasr/smoothie/ItemLoader.java)。你将需要重写下面四种方法：*getItemParams()*, *loadItem()*, *loadItemFromMemory()*以及*displayItem()*。

3. 最后在*ItemLoader*中建一个[ItemManager](https://github.com/lucasr/smoothie/blob/master/library/src/org/lucasr/smoothie/ItemManager.java)，同时把它和目标*AsyncListView*或者*AsyncGridView*关联起来。

在你的*ListView/GridView*控件需要异步加载时，考虑下把***Smoothie***作为你的轻量骨架。您可以轻松地连接您自己的图像加载/缓存框架在里面。例如，一个典型的示例应用，[Android-BitmapCache](https://github.com/chrisbanes/Android-BitmapCache)实现了[ItemLoader](https://github.com/lucasr/smoothie/blob/master/samples/bitmap-cache/src/org/lucasr/smoothie/samples/bitmapcache/PatternsListLoader.java)使用一个简单的淡入淡出的动画来显示图像。

除了在代码中的API文档，还可以看看App示例，一边更好地了解如何使用该库。请记住，API是​不是最终版本哦。目前反响是非常好的！

**Enjoy it:-)**


***Long Luo at AM11:30 ~ 12:42 Feb. 15th, 2014 @Shenzhen, China.***

