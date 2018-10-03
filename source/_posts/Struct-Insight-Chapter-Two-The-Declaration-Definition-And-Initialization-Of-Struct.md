---
layout: post
title: "大话结构体之二：名不正则言不顺---Struct(结构体)的声明、定义及初始化"
comments: true
date: 2012-12-24 00:38:25 
tags: [结构体, 技术, 科普]
categories: Program
keywords: 大话结构体, Struct, 结构体, Cpp, C, 科普
---

***By Long Luo***

>前言
	[“大话结构体”](http://blog.csdn.net/column/details/structure.html)系列文章写于2012年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上连载的，这是系列的第二篇: [大话结构体之二: 名不正则言不顺---Struct(结构体)的声明、定义及初始化](http://blog.csdn.net/tcpipstack/article/details/8267339)

-----------

在上一篇[大话结构体之一: 从女孩怎么选男朋友开始...Struct是为了解决什么问题？](http://blog.csdn.net/tcpipstack/article/details/8267336)里我们讲了为什么我们要引入Struct这个数据类型，我们了解到Struct是一种聚合数据类型，是为了用户描述和解释一些事物的方便而提出的，Struct是一种用户自定义数据类型，如下图所示：

![数据类型](http://img.my.csdn.net/uploads/201212/09/1355020124_4311.png)

其实从理论上讲，***数据类型就是人为制订的如何解释内存中的二进制数的协议***，也就是说一个数字对应着一块内存（可能4字节，也可能20字节），而这个数字的类型则是附加信息，**以告诉编译器当发现有对那块内存的操作语句（即某种操作符）时，要如何编写机器指令以实现那个操作**。比如两个char类型的数字进行加法操作符操作，编译器编译出来的机器指令就和两个long类型的数字进行加法操作的不一样，也就是所谓的“如何解释内存中的二进制数的协议”。

具体到我们之前的例子来说，只是指定了一种结构体类型，它相当于一个模型，但其中并无具体数据，系统也不为之分配实际的内存单元。为了能在程序中使用结构体类型的数据，应当定义结构体类型的变量，并在其中存放具体的数据。 

本篇将详细对Struct的声明、定义和初始化进行分析。

<!--more-->

# 一、Struct的声明

要了解Struct的声明，我们需要首先了解**声明的含义**到底是什么？

---***声明是要求编译器产生映射元素的语句***。

所谓的映射元素，就是前面介绍过的变量及函数，都只有3栏（或3个字段）：类型栏、名字栏和地址栏（成员变量类型的这一栏就放偏移值）。即编译器每当看到声明语句，就生成一个映射元素，并且将对应的地址栏空着，然后留下一些信息以告诉连接器——此*.obj文件（编译器编译源文件后生成的文件）需要一些符号，将这些符号找到后再修改并完善此*.obj文件，最后链接。

具体到上一回的例子，我们假如在另外一个源文件中需要使用`struct ExpectedBoyFriend`，那么就需要在该源文件使用之前处使用下面的声明语句：

```cpp
extern struct ExpectedBoyFriend;
```

# 二、Struct的定义

上一小节我们了解了声明的定义，那么定义是什么呢？
  
---定义是要求编译器填充前面声明没有书写的地址栏。
也就是说某变量对应的地址，只有在其定义时才知道。

因此***实际的在栈上分配内存等工作都是由变量的定义完成的，所以才有声明的变量并不分配内存***。但应注意一个重点，定义是**生成映射元素需要的地址**，因此**定义也就说明了它生成的是哪个映射元素的地址**，而如果此时编译器的映射表（即之前说的编译器内部用于记录映射元素的变量表、函数表等）中没有那个映射元素，即还没有相应元素的声明出现过，那么编译器将报错。
 
在这里我们需要说下C和C++在定义Struct的区别， 先看下面2段代码：

```cpp
#include <iostream>

using namespace std;

struct SIMPLE
{
	int a;
	char b;
	float c;
};

SIMPLE x;
```

再看下面一段源码：

```cpp
#include <stdio.h>

struct S0
{
	char mName[10];
	int mBornYear;
};

typedef struct _S1
{
	char mName[10];
	int mBornYear;
}
S1;


S0 sa;
S1 sb;
```

那么上面的代码中对Struct的定义**都对**了吗？

熟悉C/C++的同学应该能够马上知道第二段的代码错了。

***为什么呢？***

因为**C语言中对于Struct的定义**是需要使用`struct S0 sa`这种方式。

# 三、C99标准下的Struct的初始化方法

Struct的常见初始化方法我们可以在任何一本关于C语言书里面都可以找到，这里就不赘述了。我们先看下面一段代码：

```cpp
static struct usb_driver usb_storage_driver = { 
	.owner = THIS_MODULE,    
	.name = \"usb-storage\",    
	.probe = storage_probe,    
	.disconnect = storage_disconnect,    
	.id_table = storage_usb_ids, };  
```

我们在阅读GNU/Linux内核代码时，我们会经常遇到上述这样一种特殊的结构初始化方式，这种方式称为指定初始化。这种初始化方法源自C99标准。

以下文字摘录了C Primer Plus第五版中相关章节的内容，从而就可以很好的理解Linux内核采用这种方式的优势就在于由此初始化不必严格按照定义时的顺序。

已知一个结构，定义如下：

```cpp
struct Book 
{   
	char title[MAXTITLE];   
	char author[MAXAUTHOR];   
	float value; 
};   
```

C99支持结构的指定初始化项目，其语法与数组的指定初始化项目近似。只是，结构的指定初始化项目使用点运算符和成员名（而不是方括号和索引值）来标识具体的元素。例如，只初始化`book`结构的成员`value`，可以这样做：

```cpp
struct Book surprise = 
{
	.value = 10.99 
};   
```

可以按照任意的顺序使用指定初始化项目：   
```cpp

struct Book gift = 
{ 
	.value = 25.99,                  
	.author = \"James Broadfool\",                  
	.title = \"Rue for the Toad\"
};  
```

正像数组一样，跟在一个指定初始化项目之后的常规初始化项目为跟在指定成员后的成员提供了初始值。另外，对特定成员的最后一次赋值是它实际获得的值。例如，考虑下列声明：   

```cpp

struct Book gift = 
{ 
	.value = 18.90,                  
	.author = \"hilionna pestle\",                  
	0.25
};  
```

这将把值0.25赋给成员value，因为它在结构声明中紧跟在author成员之后。新的值0.25代替了早先的赋值18.90。

这一篇内容会比较枯燥，大量的代码及大段的文字内容可能会让你比较迷糊，但还是多看看，看懂它们。

我们知道`C`里面只有`Struct`，而在`C++`里面则引入了**Class**和**Struct**，那么我们就要问了，`C++`中的**Class**和**Struct**有什么区别呢？

答案将在下一篇里揭晓！


***By Long Luo transfer at 2016-6-8 21:11:36 @Shenzhen, China.***

