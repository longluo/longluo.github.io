---
layout: post
title: "大话结构体之五：以空间换时间，Struct(结构体)中的成员对齐之道(下)"
comments: true
date: 2012-12-29 01:08:58
tags: [结构体, 技术, 科普]
categories: Program
keywords: 大话结构体, Struct, 结构体, Cpp, C, 科普, 对齐, 
---

***By Long Luo***

>前言：
	[“大话结构体”](http://blog.csdn.net/column/details/structure.html)系列文章写于2012年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上连载的，这是系列的第五篇: [大话结构体之五：以空间换时间，Struct(结构体)中的成员对齐之道(下)](http://blog.csdn.net/tcpipstack/article/details/8272233)

-------------------

# 引言

在上一篇[大话结构体之四：以空间换时间，Struct(结构体)中的成员对齐之道(上)](http://www.longluo.me/blog/2012/12/27/Struct-Insight-Chapter-Four-Data-Structure-Alignment-Part-One/) 中，我们了解到`struct ALIGN2`和`struct ALIGN3`的成员变量都是1个int型，1个char型及1个short型，可是它们所占的空间却1个是8字节，一个是12字节。

***为什么会有这样的区别呢？***

通过上篇关于**对齐**的介绍，我们已经猜测这是*因为编译器对其作了对齐的处理*所致，但是***编译器处理的细节***具体是什么呢？

在这一篇里，我们将对程序的**编译，汇编，链接**进行逐一分析，解开这个谜团。

***不要走开，下面更精彩！***

# 编译过程：

一般情况下，`C`程序的编译过程为

1. 预处理
2. 编译成汇编代码
3. 汇编成目标代码
4. 链接

这一篇我们将使用`gcc`对上述几个过程进行仔细分析，了解其处理细节。

首先我们看一个例子，源码如下：

```cpp
/************************************************************************************
** File: - Z:\code\c\Alignment\Align.c
**  
** Copyright (C), Long.Luo, All Rights Reserved!
** 
** Description: 
**      Align.c --- To learn the details of Alignment by the compiler.
** 
** Version: 1.1
** Date created: 22:33:50,10/12/2012
** Author: Long.Luo
** 
** --------------------------- Revision History: --------------------------------
** 	<author>	<data>			<desc>
** 
************************************************************************************/

#include <stdio.h>

struct ALIGN2
{
	char mA;
	int mB;
	short mC;
};

struct ALIGN3
{
	int mB;
	char mA;
	short mC;
};


int main(void)
{
	struct ALIGN2 aln2;
	struct ALIGN3 aln3;

	printf("The size of struct ALIGN2 is: %d\n", sizeof(aln2));
	printf("\t aln2.mA=0x%x, aln2.mB=0x%x, aln2.mC=0x%x\n", &aln2.mA, &aln2.mB, &aln2.mC);

	printf("The size of struct ALIGN3 is: %d\n", sizeof(aln3));
	printf("\t aln3.mA=0x%x, aln3.mB=0x%x, aln3.mC=0x%x\n", &aln3.mA, &aln3.mB, &aln3.mC);

	return 0;
}
```

<!--more-->

接下来我们对`Align.c`按照C程序的编译流程进行一一分析，如下所示：

## 1. 预处理
输出文件的后缀为：`*.cpp`文件。

![预处理](http://img.my.csdn.net/uploads/201212/10/1355152365_3674.jpg)

## 2. 编译成汇编代码
1. 使用-x参数说明根据指定的步骤进行工作，`cpp-output`指明从预处理得到的文件开始编译；

2. 使用-S说明生成汇编代码后停止工作

```cmake
gcc –x cpp-output –S –o align.s align.cpp
```

![汇编处理](http://img.my.csdn.net/uploads/201212/10/1355152365_5219.jpg)

我们也可以直接编译到汇编代码：
```cmake
gcc –S Align.c
```

得到`align.s`文件之后，在最开始之处我们可以看到：
```
	.file	"Align.c"
	.section	.rodata
	.align 4
```

其中的`.align 4`就表明了**其后面所有的数据都遵守4字节对齐的限制**。

## 3. 编译成目标代码
汇编代码--->目标代码
![Object Code](http://img.my.csdn.net/uploads/201212/10/1355153534_1992.jpg)

## 4. 编译成执行代码
目标代码-->执行代码

最终的输出结果如下所示：
![Execute Result:](http://img.my.csdn.net/uploads/201212/10/1355153534_2589.jpg)

#  内存分析

我们可以绘出`struct ALIGN2`和`struct ALIGN3`的***内存分配图***：
![Memory](http://img.my.csdn.net/uploads/201212/11/1355157509_6978.jpg)

##  假如我们不对齐？

上图是**内存对齐**的`struct ALIGN2`和`struct ALIGN3`的内存分配情况，但是假如我们不对齐呢？

其内存分配如下所示：
![内存不对齐](http://img.my.csdn.net/uploads/201212/11/1355157973_3867.jpg)

很明显，`int mB`和`short mC`都不满足对齐要求。

## 对齐的好处是什么呢？
通过上一节，我们知道了**如果不对齐**，我们可以节省出几个byte的内存空间，在计算机世界中，可以对齐也可以不对齐，但是实际中，都做了对齐。

那么，***对齐的好处是什么呢***？

答案是：**对齐**是在***时间***和***空间***之间做了一个***tradeoff***!

对齐可以**提高取数据的效率**！

在IA32架构中，数据总线是32位，即一次可以存取4个字节的数据。

在对齐的情况下，`struct ALIGN2`的每个成员都可以在一个指令周期内完成；

而假设我们的`struct ALIGN2`没有对齐，那么对于`struct ALIGN2`中`char mA`，CPU可以一次取出4个字节获得低位的一个字节，同时需要将高位的3个字节保存在寄存器中，之后的`int mB`，CPU必须再取得低位的1个字节并通之前保存在寄存器中的数据结果组合在一起，***每一个都需要好几条指令***，是不是相当麻烦？

## 如何自定义对齐？
那肯定有同学要问了，有没有办法**让处理器按照自己的要求进行地址对齐**呢？

---当然可以！

我们可以通过**预编译命令**`#pragma pack(n)，n=1,2,4,8,16`来改变这一系数，其中的`n`就是你要指定的“**对齐系数**”。

比如，我想让处理器按照1个字节的方式对齐，则代码如下:
```cpp
/************************************************************************************
** File: - Z:\code\c\Alignment\AlignPackOne.c
**  
** Copyright (C), Long.Luo, All Rights Reserved!
** 
** Description: 
**      Align.c --- To learn the details of Alignment by the compiler.
** 
** Version: 1.1
** Date created: 23:39:05,10/12/2012
** Author: Long.Luo
** 
** --------------------------- Revision History: --------------------------------
** 	<author>	<data>			<desc>
** 
************************************************************************************/

#include <stdio.h>


#pragma pack(1)

struct ALIGN2
{
	char mA;
	int mB;
	short mC;
};

struct ALIGN3
{
	int mB;
	char mA;
	short mC;
};


int main(void)
{
	struct ALIGN2 aln2;
	struct ALIGN3 aln3;

	printf("The size of struct ALIGN2 is: %d\n", sizeof(aln2));
	printf("\t aln2.mA=0x%x, aln2.mB=0x%x, aln2.mC=0x%x\n", &aln2.mA, &aln2.mB, &aln2.mC);

	printf("The size of struct ALIGN3 is: %d\n", sizeof(aln3));
	printf("\t aln3.mA=0x%x, aln3.mB=0x%x, aln3.mC=0x%x\n", &aln3.mA, &aln3.mB, &aln3.mC);

	return 0;
}
```

编译之后输出结果如下：
![自定义对齐内存情况](http://img.my.csdn.net/uploads/201212/10/1355154279_8492.jpg)

可以看出，在我们要求的1字节对齐方式下，`struct ALIGN2`和`struct ALIGN3`的结果都是***7***，只占了**4+2+1**个字节，内存空间一个字节都利用到极致。

至此，关于**内存对齐**就到此告一段落了，**你弄明白了吗**？

之前的系列文章，我们的`struct`都有成员变量，那么你有没有考虑过如果过`struct`完全是空的情况呢？

下一篇我们将重点探讨这个问题！

***不要走开，后面更精彩！***

***Updated by Long Luo at 2016-6-11 03:44:26 @Shenzhen, China.***
***Updated by Long Luo at 2018年9月28日23点23分 @Hangzhou, China.***
