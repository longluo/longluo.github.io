---
title: '重构Java网络聊天室项目'
comments: true
date: 2021-04-22 08:15:50
tags: [Java, 网络聊天室]
categories: Program
keywords: Java, 网络聊天室, Web Chat Room, Chat Room, Free Chat Room, Internet,
---


***By Long Luo***

从2013年注册了[Github](https://github.com/longluo)账号开始，一直断断续续上传了自己写的很多项目，但Star数和Fork数并不多，目前来看，最多的居然是这个10年前学习Java时的练手项目:[网络聊天室](http://www.longluo.me/blog/2011/10/15/Implement-A-Chat-Room-By-Java/)。

[网络聊天室](https://github.com/longluo/WebChat/)项目绝大部分代码其实是拷贝一个学习项目，最近重新看了下，项目源码很多都不符合编程规范，作为初学者入门学习还是可以的，就5个class，方便入门，但可以学到Java Socket编程、Java Swing、多线程编程等。

<!--more-->

目前来看，这个项目还存在很大问题：

1. 代码不符合编程规范问题；
2. 同一台PC无法启动多个客户端等；
3. UI交互界面ugly;
4. 无法修改昵称、用户头像等；
5. 用户间私聊；
6. 用户间群聊；
7. 用户自定义头像等；
......


这些功能全部做完还是需要一定时间和精力的，这些将在后续一一完善。


