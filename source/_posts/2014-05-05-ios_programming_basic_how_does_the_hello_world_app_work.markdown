---
layout: post
title: "iOS编程基础: Hello World App是如何运作的?"
date: 2014-05-05 19:11:03 +0800
comments: true
categories: 
description: "iOS编程基础: Hello World App是如何运作的?"
keywords: iOS,App,原理
---

#### ***翻译 By Long Luo***

#### 原文链接：[iOS Programming Basic: How Does the Hello World App Work?](http://www.appcoda.com/ios-programming-basic-how-does-the-hello-world-app-work/)


	译者注：
	1. 由于这是技术文章，所以有些词句使用原文，表达更准确。
	2. 由于水平有效，有些地方可能翻译的不够准确，如有不当之处，敬请批评指正.

我希望你享受了第一个***iOS编程教程***，同时已经创造了你的第一个App。在进入下一教程以及制作一个更复杂的App之前，我们有必要回过头，分析这个Hello World App。对于你理解一些Objective-C语言的语法和App的内部工作机制有很大帮助。

目前为止，想必你已经按照教程完成了你的第一个Hello World App。不过，当你完成了这个教程之后，你脑海里肯定冒出了更多疑问：

- **xib,.h,.m**文件是做什么用的？
- 在`showMessage`内部的代码是什么？用什么作用？
- 当你按下`Hello World`的按钮发生了什么呢？按钮是如何触发了显示消息的动作呢?
- Xcode中的`Run`按钮是如何运作的？

<!--more-->

我希望你已经对Xcode IDE开发环境比较熟悉了，这样我就不用再解释一遍上面的内容了。对于每个开发者来说，理解代码的内部细节和抓住基本概念对于iOS编程是很有必要的。对于某些技术概念，如果你没有丝毫的编程背景来说，理解一些技术概念是有一定难度的。但是，别担心，这里仅仅是一个开始。如果你继续学习后续的教程，写出更多的代码，你就能更好的理解iOS编程。尽你所能努力学习更多知识吧！

## Interface Builder, Header and Implementation Files

首先，.xib, .h, .m文件是什么呢？这是一位读者提出的一个非常好的问题。在项目导航中，你应该可以找到3种主要的文件类型：**.xib, .h, .m**。(如果你打开“Supporting Files”文件夹，你可以找到其他的文件类型，例如plist和framework。但到目前为此，我们先忘掉它们，在今后课程中我们会讨论它们。)

### .xib
- 如果一个文件也有.xib的扩展名，它们是Interface Builder文件，存储了应用的UI。当你点击了.xib文件，Xcode会自动的打开Interface Builder界面，你可以通过拖动和放下来编辑应用的UI。如下图所示:

![Interface Builder in Xcode](http://www.appcoda.com/wp-content/uploads/2012/04/Hello-World-Interface-Builder.jpg)

**Interface Builder in Xcode**

###.h and .m 

- **.h**扩展名的文件表示这是`头文件`，**.m**扩展名表示是具体的`实现`。和其他大多数编程语言一样，Objective-C的源码也分为2部分：`接口`和`实现`。

为了便于你更好的理解这2者关系，我们拿电视遥控器打比方。我们可以很方便地使用无线遥控器调节电视的音量。你按下音量+按钮增大扬声器的音量。切换频道时，你只需要按下频道数字。那我来问问你，你知道当你按下音量按钮的背后发生了什么吗？估计你不知道吧。我相信大部分人都不知道遥控器和扬声器之间是如何通信的。我们仅仅知道的是，那个按钮是用来调节音量的。在这里，按钮就是`接口`，而按钮之后的具体细节我们称之为`实现`。

现在你应该对接口和实现有了一个更深的理解。让我们回到代码，在Objective-C语言中，一个类的接口是放在`.h`文件中。我们使用语法标示符`@interface`来声明一个类的接口。看下**HelloWorldViewController.h**的具体实现：

	@interface HelloWorldViewController : UIViewController

	-(IBAction)showMessage;

	@end

HelloWorldViewController这个类名以“@interface”开头。内部则声明了一个“showMessage”的实现，也可以称之为**方法**。

就像音量按钮，显然我们不知道`showMessage`这个方法是如何运作的。你仅仅知道它是用于在屏幕上显示一条信息。具体的实现则放在HelloWorldViewController.m文件中，如下所示：

	@implementation HelloWorldViewController

	// I've removed other methods for better reading. Focus on the showMessage method first.

	- (IBAction)showMessage 
	{
    	UIAlertView *helloWorldAlert = [[UIAlertView alloc]
                                    initWithTitle:@"My First App" message:@"Hello, World!" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
    
    	// Display the Hello World Message
    	[helloWorldAlert show];
	}

	@end

正如你上面所示，你使用“@implementation”去声明一个实现。在“showMessage”中，代码用于定义在屏幕中弹出一条警告。你不需要弄明白在“showMessage”的方法中每一行代码具体含义。简单来说，创建了一个以“My First App” 为标题，“Hello, World”作为消息的UIAlertView。然后调用“show”方法去请求iOS用于在屏幕上显示一个弹出消息。如下图所示：

![Hello World App](http://www.appcoda.com/wp-content/uploads/2012/04/Hello-World-App.jpg)

**Hello World App**

想必你已经弄明白了接口和实现吧？

## Behind the Touch and Tap

当你按下 “Hello World”按钮实际上发生了什么？ “Hello World” 按钮是如何调用 “showMessage” 方法去显示“Hello World”的消息呢？

回想起你是如何在Interface Builder建立起“Hello World”按钮和“sendMessage”的具体动作的关联的。再次打开“HelloWorldViewController.xib” ，选择“Hello World” 按钮，在Utility区域点击“Sent Events”按钮打开发生事件。

![Hello World Button Send Events](http://www.appcoda.com/wp-content/uploads/2012/04/Hello-World-Button-Sent-Events.jpg)

发送部分展示了所有的关于事件和动作的联系。例如上述图片所示，“Touch Up Inside” 事件就关联到 “showMessage”的动作。在iOS中，app是事件驱动的。控制/目标监听特定的动作，例如触摸和按下。当事件触发之后，目标就会调用预设的关联到事件的动作。

在我们的Hello World App中，当用户在按钮上抬起手指， “Touch Up Inside”的事件就触发了。结果，它会调用“showMessage”的动作去显示 “Hello World” 的消息。

下图很直观的展示了刚才所描述的事件流:

![Event and Message Flow of Hello World App](http://www.appcoda.com/wp-content/uploads/2012/04/HelloWorld-Message-Flow.jpg)

**Event and Message Flow of Hello World App**

## Behind the Scene of the “Run” Button

当你点击“Run” 按钮，Xcode就会载入模拟器，运行你的App。但是在这个场景之后，发生了什么？作为一名程序员，你需要了解它的整个流程。

![Event and Message Flow of Hello World App](http://www.appcoda.com/wp-content/uploads/2012/04/Xcode-Build-Process.jpg)

整个流程可以分为3部分：**编译、打包和运行**。

#### 编译
- 你可能会认为iOS可以读懂Objective-C代码。大错特错，实际上，iOS只能读懂机器码。Objective-C代码只是便于程序员去读和写代码。我们需要将Objective-C源码翻译成机器码，这样iOS才可以读懂你的App的源码。这个过程就称之为编程。Xcode已经自带了编译器用于编译源码。

#### 打包
- 不同于其他源码，一个App通常包含大量的资源文件，比如图片，文本，xlib文件等等。所有的这些资源都必须要打包进最终的App中。

我们通过把上述2个过程称之为**build**。

![Xcode-Build-Option](http://www.appcoda.com/wp-content/uploads/2012/04/Xcode-Build-Option.jpg)

#### Run 
- 按下之后，启动模拟器，载入你的App.


#### ***Long Luo created at 19:22 ~ 21: 06 May 5th, 2014 @Shenzhen, China.***
