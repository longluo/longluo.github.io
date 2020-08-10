---
layout: post
title: "大话结构体之八：小个头也有大智慧---C语言Struct中的函数和函数指针"
comments: true
date: 2013-01-09 03:58:28
tags: [结构体, 技术, 科普]
categories: Program
keywords: 大话结构体, Struct, 结构体, Cpp, C, 科普, 函数, 函数指针, 
---

***By Long Luo***

>前言
	[“大话结构体”](http://blog.csdn.net/column/details/structure.html)系列文章写于2012年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上连载的，这是系列的第八篇: [大话结构体之八：C语言Struct中的函数和函数指针](http://blog.csdn.net/tcpipstack/article/details/8259225)

-------------------

在系列之三[大话结构体之三：借我一双慧眼吧，让我把C++中Class(类)和Struct(结构体)看个清清楚楚明明白白...](http://www.longluo.me/blog/2012/12/25/Struct-Insight-Chapter-Three-The-Differences-Between-Class-And-Struct-In-Cpp/)，我们在文章的结尾留了一个悬念：

我们了解到C语言规范是`struct`里面是**不能有函数体**的，但是在应用中假如`struct`中没有函数的话，我们会遇到很多问题，第一数据往往是依附于函数来进行操作的；其二是我们需要**用C来实现面向对象的思想**。

比如下面这段代码：
```cpp
#include <stdio.h>

struct FuncInside
{
	int mA;
	void func()
	{
		printf("Hello, function inside!\n");
	}
};


void main(void)
{
	struct FuncInside f;

	f.mA = 99;
	f.func();

	getchar();
}
```

编译会提示：

```
1>e:\learn\vs\struct\struct\funcpointer.c(7) : error C2032: “func”: 函数不能是 struct“FuncInside” 的成员
```

那么这个问题应该如何解决呢？

一刹那，一句话在脑海中闪现，“***指针是C语言的精华。***”

***啊哈，灵机一动！***

<!--more-->

虽然`Struct`中不能有函数体，但是我们可以在**Struct中使用函数指针来实现同样的目的**。

***函数指针是什么?***

函数指针，注意要区别于**指针函数**，声明格式如下：

	函数类型 (标志符 指针变量名) (形参列表);

就像某一数据变量的内存地址可以存储在相应的指针变量中一样，函数的首地址也以存储在某个函数指针变量里的。

这样，我们就可以通过这个函数指针变量来调用所指向的函数了。

举个例子来说明吧：

```cpp
int *pfun(int, int);
```

你注意到它们之间的区别了吗？

我们修改下之前的代码：
```cpp
#include <stdio.h>

struct FuncInside
{
	int mA;
	void (*pFunc)();
};

void Foo()
{
	printf("Hello, Function Inside Struct!\n");
}


void main(void)
{
	struct FuncInside f;

	f.mA = 99;
	f.pFunc = Foo;

	f.pFunc();

	getchar();
}
```

编译顺利通过，输出也是我们期望的结果：
![函数指针](http://img.my.csdn.net/uploads/201212/09/1354984449_3322.jpg)

之前`int (*pFun)(int, int)`，其中`pFun`是一个函数指针。

而事实上，为了代码的移植考虑,一般使用typedef定义函数指针类型：
```cpp
typedef int (*pFun)(int, int);
```

当使用`typedef`声明后，则`pFun`就成为了一个函数指针“类型”，即一种**函数回调**类型。这其实是一种回调函数的实现方法。

一个简单的例子如下：

```cpp
/************************************************************************************
** File: - E:\Code\VS2010_prjs\Struct\StructDeclare\pFunCallBack.c
**  
** Copyright (C), Long.Luo, All Rights Reserved!
** 
** Description: 
**      pFunCallBack.c - A demo show the usage of function pointer.
** 
** Version: 1.0
** Date created: 01:03:04,09/12/2012
** Author: Long.Luo
** 
** --------------------------- Revision History: --------------------------------
** 	<author>	<data>			<desc>
** 
************************************************************************************/

#include <stdio.h>

// Defines the function callback type.
typedef int (*pFun)(int paraA, int paraB);

struct FuncPtr
{
	int x;
	int y;

	// A function pointer to the implementation of the Summary.
	pFun GetSum;
};

// The function of summary.
int GetSum(int paraA, int paraB)
{
	return (paraA + paraB);
}

void main(void)
{
	struct FuncPtr fp;
	int result = 0;

	fp.x = 1987;
	fp.y = 1988;

	fp.GetSum = GetSum;
	result = fp.GetSum(fp.x, fp.y);
	printf("\n result = %d\n", result);

	getchar();
}
```

输出结果如下：

![函数指针输出](http://img.my.csdn.net/uploads/201212/09/1354986253_6040.jpg)

至此，我们了解了C语言struct中是如何通过函数指针来实现函数的。

不过，回顾这一节，也同样带来了几个问题，什么是指针函数，什么是函数指针，这2者的区别之处在哪里呢？回调函数的概念又是怎么回事呢？

这些疑问，都会在后续的文章中一一为你讲诉，所以不要走开，请关注我的博客更新:-)

***Updated by Long Luo at 2016-6-11 05:18:27 @Shenzhen, China.***
***Modified by Long Luo at 2018年9月28日23点20分 @Hangzhou, China.***

