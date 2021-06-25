---
title: 'Java网络聊天室的设计与实现'
comments: true
date: 2011-10-15 23:27:22
tags: [Java, ChatRoom]
categories: Program
keywords: Java, Chat Room, Web Chat Room, 网络聊天室,
---

***By Long Luo***

<!-- TOC -->

- [一、 问题描述](#一-问题描述)
- [二、 软件设计](#二-软件设计)
  - [客户端：](#客户端)
  - [服务器端:](#服务器端)
- [三、软件实现](#三软件实现)
  - [3.1 客户端](#31-客户端)
  - [3.2 服务器端](#32-服务器端)
    - [3.3 程序运行及说明](#33-程序运行及说明)

<!-- /TOC -->

# 一、 问题描述

Java聊天室是用Java程序实现的，由客户端和服务器端组成。先启动服务器端，再启动客户端，服务器验证身份后客户便可登陆聊天室。 

对于客户来说：
-  注册、登陆和退出聊天室时都有相关提示信息；
-  用户应该可以看到所有在线的用户；
-  聊天时可以群聊，也可以选择某个聊天对象私聊。

对于服务器来说：
-  登录聊天室时必须输入正确的用户名和密码，未注册用户必须先注册；
-  可以显示当前使用的端口，IP地址及在线人数；
-  可以显示所有用户注册、登陆及退出等信息，且在用户登陆和退出时可以实时刷新在线用户列表
-  可以显示所有聊天记录，并可以将记录保存在文件中。

<!--more-->

# 二、 软件设计
完成这个作业参考了马士兵的Java系列视频及从网络上下载的代码，对其进行了修改和完善，主要是增加了服务器窗口，实时显示相关信息、在线用户列表等。

对于网络聊天器来说，核心思想是基于套接字的编程。在这里，打个小小的比方，我们的程序在Win32环境下表示为一个进程，也可以比喻成一所房子，该进程的套接字就好比是一扇门。我们的服务器，也就是房子的主人，如果他没睡觉的情况下，也就是位于运行状态时，是一直在倾听且欢迎着门外的敲门声的。

客户端程序运行时，会向服务器发起一个连接，即敲服务器家里的门，在程序上是通过创建一个套接字来完成的。当服务器听到了敲门声之后，他会创建一个新的门，专门为这个客户服务，在Java代码上是通过`serverSocket.accept()`来实现的。这个门也就只为这个客户而开，当客户离开之后，服务器也会将这扇门关闭。

## 客户端： 

- `ChatClient.java`，完成客户端窗口的绘制及发起连接、关闭、聊天；

## 服务器端: 
- `ChatServer.java`，服务器端，启动服务器端口并进行监听；
- `ServerFrame.java`，服务器窗口，主要是服务器窗口绘制；
- `ServerProcess.java`，服务器和客户端连接的处理，包括登陆、注册、退出、信息的发送。

# 三、软件实现

## 3.1 客户端

进入聊天室主界面之前有一个登陆对话框。其中包括服务器ip地址，用户名和密码的填写。聊天室的主界面主要分为两个大容器，中间是`textViewTalk(TextArea)`，显示详细的聊天信息，界面下面是一个输入的界面，包括发言(`labelTalk`)、发送按钮，聊天信息输入框(`textTalk`)，在线人员下拉列表（`ComboBox`组合框)。

进入聊天室主界面之前有一个登陆对话框。其中包括服务器ip地址，用户名和密码的填写。聊天室的主界面主要分为两个大容器，中间是`textViewTalk(TextArea)`，显示详细的聊天信息，界面下面是一个输入的界面，包括发言(`labelTalk`)、发送按钮，聊天信息输入框(`textTalk`)，在线人员下拉列表（`ComboBox`组合框)。

`ChatClient`：主类，实现客户端的主要功能

```java
    // 窗口绘制
    public class ChatClient extendsJFrame
    // 建立与服务端通信的套接字
    void connectServer()
    // 监听事件
    public void actionPerformed(ActionEvent evt)
```

`ClientThreat`：处理聊天的类

## 3.2 服务器端
`ChatServer`：主类，服务器启动及监听；

```java
    // 服务器启动及监听；
    public ChatServer()
    // 获取服务器的主机名和IP地址
    public void getServerIP()
```

`ServerFrame`：服务器窗口界面绘制

```java
    // 服务器窗口绘制
    public ServerFrame()
    // Log信息保存
    protected void saveLog()
```

`ServerProcess`：服务器处理

```java
// 处理与客户端连接的功能
    public ServerProcess(Socket client, ServerFrame frame)
// 判断是否有该注册用户
    private boolean isExistUser(Stringname)
// 判断用户的用户名密码是否正确
    private boolean isUserLogin(String name, String password)
// 用户注册
    private void register()
// 用户登陆
    private void login()
// 用户登陆成功
    private void userLoginSuccess(String name)
// 刷新在线用户列表
    private void freshClientsOnline()
// 用户关闭套接字，并将用户信息从在线列表中删除
    private String closeSocket()
```

### 3.3 程序运行及说明

源码已经开源，地址位于： https://github.com/longluo/WebChat



***注：***

​	最开始这篇文章发布在[个人CSDN博客](https://blog.csdn.net/tcpipstack)上：[JAVA网络聊天室的设计与实现](https://blog.csdn.net/tcpipstack/article/details/8610849?spm=1001.2014.3001.5502)
