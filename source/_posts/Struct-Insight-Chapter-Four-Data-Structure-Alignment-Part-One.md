---
layout: post
title: "大话结构体之四：以空间换时间，Struct(结构体)中的成员对齐之道(上)"
comments: true
date: 2012-12-27 00:32:28
tags: [结构体, 技术, 科普]
categories: Program
keywords: 大话结构体, Struct, 结构体, Cpp, C, 科普
---

***By Long Luo***

>前言
	[“大话结构体”](http://blog.csdn.net/column/details/structure.html)系列文章写于2012年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上连载的，这是系列的第四篇: [以空间换时间，Struct(结构体)中的成员对齐之道(上)](http://blog.csdn.net/tcpipstack/article/details/8267255)

--------------------------

在开始今天的文章之前，请先看下面一道面试题：

问题： 阅读下面一段代码并回答题目之后的问题：
```cpp
struct ALIGN
{
	int mA;
	int mB;
};
```

请问在**32位**系统下`sizeof(ALIGN)`的结果是多少？

当然这道题目是难不到广大程序员同学们滴！

在32位机器上int类型占4个字节，**Struct ALIGN**里面有2个int型变量，那么总共就是***8***个字节喽！

Bingo，在这个例子中，`sizeof(ALIGN)`的结果的确是***8***。

![结构体对齐](http://img.my.csdn.net/uploads/201212/03/1354465795_4041.jpg)

下面，我们把代码修改一下：
```cpp
#include <iostream>

using namespace std;

struct ALIGN
{
	int mA;
	int mB;
};

struct ALIGN1
{
	int mA;
	short mB;
};


int main()
{
	cout<<sizeof(short)<<endl;
	cout<<sizeof(ALIGN1)<<endl;

	getchar();
	return 0;
}
```

请问输出是多少？

<!--more-->

这还不简单，小case嘛！

	mA占4个字节，mB占2个字节，所以Struct ALGN1应该是4+2=6个字节，所以答案是2和6。

---**你确定么？** （*小丫的语言*）
---**我确定**！

好的，请看大屏幕：

![结构体对齐2](http://img.my.csdn.net/uploads/201212/03/1354466216_5266.jpg)

咦？

结构体的大小不是将结构体元素单纯相加就可以的吗？

怎么结果却变成8了呢？

要回答这个问题，需要从计算机的***地址对齐***讲起。至于为什么需要对齐，当然是**对齐能够带来很多好处的**。

第一，可以大大简化处理器和存储器之间接口的硬件设计；

第二，提高处理器访问数据的效率。

首先讲下，**对齐**(alignment)就是**计算机系统对基本数据类型的可允许地址做了限制，某种类型的对象的地址必须是某个值k的倍数**。

以IA32为例，在自然对齐方式下，基本数据类型（如short，int，double）**变量的地址必须被他们的大小整除**。

通俗的说，对于int类型的变量，因为宽度为4，因此存放int类型变量的`起始地址必须能被4整除`，宽度为2的基本数据类型（short等）则`位于能被2整除的地址上`，以此类推对于char和bool类型的变量，由于其只占用一个字节，则`没有特别要求`。

我们修改下程序，让其输出成员变量的地址：
```cpp
#include <iostream>

using namespace std;

struct ALIGN
{
	int mA;
	int mB;
};

struct ALIGN1
{
	int mA;
	short mB;
};


int main()
{
	ALIGN aln0;
	ALIGN1 aln1;

	cout<<"\n"<<&aln0.mA<<"\t"<<&aln0.mB<<endl;
	cout<<"\n"<<&aln1.mA<<"\t"<<&aln1.mB<<endl;

	getchar();
	return 0;
}
```

程序调试我们可以看到：
![变量地址](http://img.my.csdn.net/uploads/201212/07/1354887698_4439.jpg)

从上述结果中，可以看出在`struct ALIGN1`中，int mA的起始地址为**0x0012ff4c**可以被4整除，short mB的起始地址为**0x0012ff50**可以被2整除。

再看下列代码：

```cpp
#include <iostream>

using namespace std;

struct ALIGN
{
	int mA;
	int mB;
};

struct ALIGN1
{
	int mA;
	short mB;
};

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
	ALIGN aln0;
	ALIGN1 aln1;
	ALIGN2 aln2;
	ALIGN3 aln3;

	cout<<"The size of struct ALIGN is:"<<sizeof(ALIGN)<<endl;
	cout<<"\t"<<&aln0.mA<<"\t"<<&aln0.mB<<endl;

	cout<<"The size of struct ALIGN1 is:"<<sizeof(ALIGN1)<<endl;
	cout<<"\t"<<&aln1.mA<<"\t"<<&aln1.mB<<endl;

	cout<<"The size of struct ALIGN2 is:"<<sizeof(ALIGN2)<<endl;
	cout<<"\t"<<&aln2.mA<<"\t"<<&aln2.mB<<"\t"<<&aln2.mC<<endl;

	cout<<"The size of struct ALIGN3 is:"<<sizeof(ALIGN3)<<endl;
	cout<<"\t"<<&aln3.mA<<"\t"<<&aln3.mB<<"\t"<<&aln3.mC<<endl;

	getchar();
	return 0;
}
```

输出结果如下：

![地址输出](http://img.my.csdn.net/uploads/201212/07/1354888541_6359.jpg)

是不是觉得很奇怪？

ALIGN2 和 ALIGN3都是1个int型，1个char型，1个short型，可是它们所占的空间却**1个是8，一个是12**？

***这非常非常不科学啊***！

2个结构体都拥有一样的成员变量，可是所占的大小却有很大的区别。这一切的一切，是**计算机中的幽灵在作祟，还是另有隐情**？ **编译器如此厚此薄彼，到底是为什么？被偷去的内存，到底去了哪里**？

下一篇我们将使用gcc编译，分析编译生成的每一步，了解编译器具体是怎么做的，为什么需要这么做，为你揭开这些谜团！！！

***欲知后事如何，且听下回分解!***


***By Long Luo transfer at 2016-6-8 21:51:38 @Shenzhen, China.***
***Modified By Long Luo at 2018年9月28日23点28分 @Hangzhou, China.***

