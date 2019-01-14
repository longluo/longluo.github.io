---
layout: post
title: "Android编译时出现aapt.exe finished with non-zero exit value 1错误的解决方法"
date: 2016-04-08 23:15:56
comments: true
categories: Android
tags: [Android, Tech, Debug]
keywords: Android, Exception, Error, Debug, Gradle
---


***By Long Luo***

昨天在开发一个项目时，在Android Studio中编译时，gradle编译之后出现了如下错误：

	Error:Execution failed for task ':samples-simplevideowidget:processDebugResources'.
	> com.android.ide.common.process.ProcessException: org.gradle.process.internal.ExecException: Process 'command 'E:\Android\SDK\build-tools\23.0.1\aapt.exe'' finished with non-zero exit value 1

首先看到这个错误之后，因为移植的代码在之前的`eclipse`编译时OK的，所以先检查了下Android Studio项目中资源，代码有无提示的错误，经过确认没有之后，将错误信息在Google中搜索。

经过搜索之后，在StackOverflow和CSDN上发现有很多人遇到了这个错误，不过解决方法却各不相同。有的建议`Clean`然后`Rebuild`，有的建议修改使用内存，有的说是代码问题，也有的说是资源问题，比如本来是jpg图片，文件后缀却是png也会导致问题...

我按照以上方案一一检查，还是未能解决，于是只能自己动手排查原因了！

<!--more-->

# 1. 定位错误点

在项目root路径，命令行输入：

	gradlew processDebugResources --debug

然后项目开始编译，屏幕上输出大量编译Log信息，从Log中找到了输出的出错信息：

	org.gradle.process.internal.DefaultExecHandle] Changing state to: FAILED
	org.gradle.process.internal.DefaultExecHandle] Process 'command 'E:\Android\SDK\build-tools\23.0.1\aapt.exe'' finished with exit value 1 (state: FAILED)
	org.gradle.api.Project] Unknown source file : ERROR: In <declare-styleable> ListItemLinearLayout, unable to find attribute singleLine

	org.gradle.api.internal.tasks.execution.ExecuteAtMostOnceTaskExecuter] Finished executing task ':samples-simplevideowidget:processDebugResources'
	E] [class org.gradle.TaskExecutionLogger] :samples-simplevideowidget:processDebugResources FAILED
	
从上述Log信息，我们可知出错点是`ERROR: In <declare-styleable> ListItemLinearLayout, unable to find attribute singleLine`，那么肯定是`attrs`文件的`ListItemLinearLayout`styleable出错了。
	
# 2. 错误原因

经过上述分析，我们进入`attrs.xml`文件，找到`ListItemLinearLayout`，如下所示：

	    <declare-styleable name="ListItemLinearLayout">
        <attr name="singleLine" />
        <attr name="titleSize" format="dimension" />

可以看出`singleLine`没有对应的`format`属性，确定`singleLine`没有在代码中使用之后，将此属性删掉。

重新编译之后，问题解决。
	
***Completed by Long Luo at 2016-04-09 00:36 @Shenzhen, China.***

