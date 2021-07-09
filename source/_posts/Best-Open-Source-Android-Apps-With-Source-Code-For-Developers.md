---
title: '开发遇到了瓶颈？想提高你的能力吗？那你需要学习下列开源Android App源码'
comments: true
date: 2021-06-15 23:52:09
tags: [Android, App, Open Source]
categories: Android
keywords: Android, App, Open Source, Code, Developer, Practice, 源码, 
---

***By LongLuo***

在PC上，绝大部分软件都是Windows应用且闭源的，Linux系统只占了很小的份额，只有专业人士才会使用。随着移动互联网的到来，在智能手机系统中，Android由于开源免费的特性，已经占据了主要份额。当然iOS App由于闭源，且Apple软硬件一体，管控严格，体验更好，比如安全、动画流程、不卡顿等。

对于开发人员来说，最佳的学习方式莫过于开源项目了，我们可以学习到App的功能是如何实现的，提高我们自身的开发能力。我收集了一些最好的开源Android App项目，这些Apps可以作为很好的示例，帮助程序员们提高其Android开发技能。

下面就开始学习吧！

# UI界面

## FluentUI Android

微软开发的UI框架，用于在Android上Office App中实现统一的用户界面，从中可以学习如何构建UI部件及界面。

[Source Code](https://github.com/microsoft/fluentui-android)

## QMUI Android

QMUI Android是腾讯开发的一个项目，设计目的是用于辅助快速搭建一个具备基本设计还原效果的Android项目，同时利用自身提供的丰富控件及兼容处理，让开发者能专注于业务需求而无需耗费精力在基础代码的设计上。不管是新项目的创建，或是已有项目的维护，均可使开发效率和项目质量得到大幅度提升。

官网：http://qmuiteam.com/android

[Source Code](https://github.com/Tencent/QMUI_Android)

# 相机

## Open Camera

一个全功能开源Android相机App，包括自动稳定、远程拍照等，如果想开发一款相机App，请学习这个项目！

[Source Code](https://sourceforge.net/p/opencamera/code/ci/master/tree/)

# 多媒体播放器

## TimberX Music Player

一个全功能Android音乐播放器，遵循Material Design风格的用户界面，同时应用了最新的工具，包括Kotlin、组件、数据绑定等。

支持跨平台，可在手机、Android Wear、Android Auto、Chromecast和其他投射设备甚至谷歌助手上运行，如果你想编写一个音乐播放器以及适配各种设备，那这个App是最好不过的了！

官网：https://namand.in/

[Source Code](https://github.com/naman14/TimberX)

## Sound Recorder

一个Material Design风格的简易开源录音机App，可以学习到如何在Android中集成录音和操作功能。

[Source Code](https://github.com/dkim0419/SoundRecorder)

## LeafPic

一个全功能相册App，如果想了解如何实现一个相册，请从这个开始！

[Source Code](https://github.com/HoraApps/LeafPic)

## AntennaPod

一个播客App，你可以学习到如何开发一个播客App。

官网：https://www.antennapod.org/

[Source Code](https://github.com/AntennaPod/AntennaPod)

<!--more-->

# 聊天

## Telegram

Telegram是最常用的加密即时通讯App之一，适用于Android和iOS。如果想了解如何实现一个即时通信App，可以认真学习其源码！

[Source Code](https://github.com/Telegram-FOSS-Team/Telegram-FOSS)

# 邮件客户端

## K-9 Mail App

一个全功能电子邮件客户端，支持多帐户、多文件夹同步、标记、归档、BCC 自我、签名等等。
如果想了解电子邮件客户端的工作原理，开始动手写一个邮件客户端就从吃透这个项目源码开始吧！

官网地址：https://k9mail.app/

[Source Code](https://github.com/k9mail/k-9)

# 工具类

## LawnchairLauncher

开源Launcher App, 基于Launcher3开发，移植了Pixel Launcher功能和丰富的自定义选项，如果你想开发一个Launcher App，学习这个是最好不过的了！

官网：https://lawnchair.app/

[Source Code](https://github.com/LawnchairLauncher/lawnchair)

## AmazeFileManager

一个轻量级的文件管理器App，遵循了Material Design风格和指南。可以从这个App中学到很多东西，包括全功能文件管理及加解密文件。

官网：https://teamamaze.xyz/

[Source Code](https://github.com/TeamAmaze/AmazeFileManager)

## Minimal-Todo

一个Material风格的Todo App。

[Source Code](https://github.com/avjinder/Minimal-Todo)

## Omni-Notes

一个轻量级笔记App，实现了存档、垃圾箱、删除、插入图像等功能。

官网：https://omninotes.app/

[Source Code](https://github.com/federicoiosue/Omni-Notes)

## Keepass2Android

一个密码管理App，可以在将存储、检索密码和其他敏感信息在一个"database"的文件中。这个database使用主密码进行保护。主密码通常是一个强密码，需要提高安全性的话可以增加因子。密码数据库文件可以跨设备同步。如果你想开发一个密码管理App，学习这个App最好不过了！

[Source Code](https://github.com/PhilippC/keepass2android)

## ML Manager 

App管理器，可以实现提取已安装App和系统App并在本地保存为APK。

官网：https://javiersantos.github.io/mlmanager

[Source Code](https://github.com/javiersantos/MLManager)

# 开发工具

## DoraemonKit

DoKit是一个功能平台，能够让每一个App快速接入一些常用的或者你没有实现的一些辅助开发工具、测试效率工具、视觉辅助工具，而且能够完美在Doraemon面板中接入你已经实现的与业务紧密耦合的一些非通有的辅助工具，并搭配我们的dokit平台，让功能得到延伸，接入方便，便于扩展。

简单总结:
1. Kit能够快速让你的业务测试代码能够在这里统一管理，统一收口；
2. DoKit内置很多常用的工具，避免重复实现，一次接入，你将会拥有强大的工具集合；
3. 搭配dokit平台，借助接口Mock、健康体检、文件同步助手让你方便和他人协同，极大的提升研发过程中的效率。

[Source Code](https://github.com/didi/DoraemonKit)

## 内存检测

### Leak Canary

A memory leak detection library for Android.

[Source Code](https://github.com/square/leakcanary)

## 卡顿检测

### AndroidPerformanceMonitor

AndroidPerformanceMonitor的前身是BlockCanary，是一个Android平台的一个非侵入式的性能监控组件，应用只需要实现一个抽象类，提供一些该组件需要的上下文环境，就可以在平时使用应用的时候检测主线程上的各种卡慢问题，并通过组件提供的各种信息分析出原因并进行修复。

![AndroidPerformanceMonitor](https://github.com/markzhai/AndroidPerformanceMonitor/raw/master/art/flow.png)

[Source Code](https://github.com/markzhai/AndroidPerformanceMonitor)

# 开发框架

## MVVMHabit

MVVMHabit是以谷歌DataBinding+LiveData+ViewModel框架为基础，整合Okhttp+RxJava+Retrofit+Glide等流行模块，加上各种原生控件自定义的BindingAdapter，让事件与数据源完美绑定的一款容易上瘾的实用性MVVM快速开发框架。

[Source Code](https://github.com/goldze/MVVMHabit)

## ZBLibrary-Android

MVP架构，提供一套开发标准（View, Data, Event）以及模板和工具类并规范代码。封装层级少，简单高效兼容性好。
OKHttp网络请求、Glide图片加载、ZXing二维码、沉浸状态栏、下载安装、自动缓存以及各种Base、Demo、UI、Util 直接用。

[Source Code](https://github.com/TommyLemon/Android-ZBLibrary)

## FastDev4Android

Android开发框架，预先集成工具包，采用MVP开发模式，EventBus数据分发，沉浸式状态栏，ORM，网络请求(HTTPClint、Volley、OkHttps)，数据解析，依赖注入(AndroidAnnotations)，xutils，图片异步加载，二维码扫描等。

[Source Code](https://github.com/jiangqqlmj/FastDev4Android)

## AndroidUtilCode开发代码库

一个功能强大且易于使用的Android代码库，封装了Android开发中常用的功能，有完整的demo和单元测试。通过使用它封装的API，可以大大提高开发效率。该程序主要由两个模块组成，一个是开发中常用的utilcode，另一个是开发中很少用到的subutil，但是 utils 可以有利于简化主模块

[Source Code](https://github.com/Blankj/AndroidUtilCode)

# 插件

## DRouter

DRouter是滴滴乘客端自研的一套Android路由框架，基于平台化解耦的思想，为组件间通信服务。该项目以功能全面、易用为原则，支持各种路由场景，在页面路由、服务获取和过滤、跨进程及应用、VirtualApk插件支持等方面都能提供多样化的服务。目前已在滴滴乘客端、顺风车、单车、国际化、滴滴定制车等十多个滴滴的app内使用，得到各种场景的验证。

[Source Code](https://github.com/didi/DRouter)


