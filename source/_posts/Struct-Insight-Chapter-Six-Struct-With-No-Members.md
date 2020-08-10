---
layout: post
title: "大话结构体之六：无即是有，没有成员变量的Struct(结构体)"
comments: true
date: 2013-01-01 03:08:58
tags: [结构体, 技术, 科普]
categories: Program
keywords: 大话结构体, Struct, 结构体, Cpp, C, 科普, 对齐, 成员变量, members
---

***By Long Luo***

>前言
	[“大话结构体”](http://blog.csdn.net/column/details/structure.html)系列文章写于2012年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上连载的，这是系列的第六篇: [大话结构体之六：无即是有，没有成员变量的Struct(结构体)](http://blog.csdn.net/tcpipstack/article/details/8249915)

-----------

在上一篇[大话结构体之五：以空间换时间，Struct(结构体)中的成员对齐之道(下)](http://www.longluo.me/blog/2012/12/29/Struct-Insight-Chapter-Five-Data-Structure-Alignment-Part-Two/) 中，我们学习了`struct`的内存对齐的前世今生。

在开始本篇之前，想问大家一个问题：

	---0是什么？
	---呵呵，就是没有呗！
	---那好，这5块钱拿去，就当抵我上次向你借的500块钱。
	---什么？这哪和哪啊！这不一样
	---可是你自己说的， 0就是“没有”。
	---我说不清，反正不行，你必须还我500.
 
0是什么？
起什么作用呢？
为什么500 ≠ 5？

这节我们来讨论***0的作用***。

<!--more-->

例如，500块钱，它后面0起到了什么作用呢？ 

500 的0，表示十和个位“没有”。虽说“没有”，但这个0却不能省略。因为如果省略了0，一件500块的衣服，你只给5块，小心遭到暴打。

那原因是什么呢？

在***按位计数法***中，***数位***具有很重要的意义。即使十位的数“没有”，也不能不写数字。这时就轮到0出场了，即`0`的作用就是***占位***。换言之，0占着一个位置以保证数位高于它的数字不会产生错位。

正因为有了表示“没有”的0，数值才能正确地表现出来。可以说在按位计数法中0是不可或缺的。
 
打住，这和我们讲的`struct`有什么关系？

当然有关系了，请问下面这段代码输出的是什么呢？
```cpp
#include <iostream>

using namespace std;

struct NoMember
{

};

int main(void)
{
	cout<<"The size of the struct NoMem is:"<<endl;
	cout<<sizeof(NoMember)<<endl;

	getchar();
	return 0;
}
```

---是0呢？
---还是1？2？3？

想必大部分人还是说不出来的，那我们先看看输出结果：
![没有成员变量的结构体](http://img.my.csdn.net/uploads/201212/03/1354466907_1355.jpg)

一个没有任何变量的`struct`居然占了**1个字节**的空间。

---***这不科学！***

那这是为什么呢？

不急，让子弹先飞一会儿.....

再看下面一段代码：
```cpp
#include <iostream>

using namespace std;

struct NoMember
{

};

struct NoMember1
{
	int mA[0];
};

int main(void)
{
	//cout<<endl<<"The size of the struct NoMember is: "<<sizeof(NoMember)<<endl;
	cout<<endl<<"The size of the struct NoMember1 is: "<<sizeof(NoMember1)<<endl;

	getchar();
	return 0;
}
```

一个结构体里面定义了一个空的数组，那这次的输出会是什么呢？

---厄， 这还是一个空的结构体，所以**输出还是1**吧？

好的，你还真蒙对了，请看结果：

![空的数组的结构体](http://img.my.csdn.net/uploads/201212/05/1354637651_7390.jpg)

但是，如果`struct`里面还有另外的变量呢？会是什么情况呢？
```cpp
#include <iostream>

using namespace std;

struct NoMember
{

};

struct NoMember1
{
	int mA[0];
};

struct NoMember2
{
	char mB;
	int mA[0];
};

int main(void)
{
	//cout<<endl<<"The size of the struct NoMember is: "<<sizeof(NoMember)<<endl;
	//cout<<endl<<"The size of the struct NoMember1 is: "<<sizeof(NoMember1)<<endl;
	cout<<endl<<"The size of the struct NoMember2 is: "<<sizeof(NoMember2)<<endl;

	getchar();
	return 0;
}
```

---那这一次的输出是什么呢？

---`char mB`占据4个字节，然后`int mA[0]`占据1个字节，所以结果**应该是5**吧？ 

结果是什么呢？请看大屏幕！

![0元素数组和成员变量](http://img.my.csdn.net/uploads/201212/05/1354637651_3893.jpg)

结果是4，为什么呢？

其实结合**500 ≠ 5**的话也很好理解，虽然结构体包含0个成员变量，但是结构体起到“占位”的作用，“空结构体”变量必须被存储，编译器为其分配一个字节的空间用于占位了。这样一来，不光可以取地址，两个不同的“空结构体”变量又可以得以区分。

我们可以输出各个结构体的地址：
```cpp
#include <iostream>

using namespace std;

struct NoMember
{

};

struct NoMember1
{
	int mA[0];
};

struct NoMember2
{
	char mB;
	int mA[0];
};

int main(void)
{
	NoMember nm0;
	NoMember1 nm1;
	NoMember2 nm2;

	cout<<endl<<"The size of the struct NoMember is: "<<sizeof(NoMember)<<endl;
	cout<<"The address of the struct of NoMember: 0x"<<&nm0<<endl;

	cout<<endl<<"The size of the struct NoMember1 is: "<<sizeof(NoMember1)<<endl;
	cout<<"The address of the struct of NoMember: 0x"<<&nm1.mA<<endl;

	cout<<endl<<"The size of the struct NoMember2 is: "<<sizeof(NoMember2)<<endl;
	cout<<"The address of the struct of NoMember: 0x"<<&nm2.mA<<"\t0x"<<&nm2.mA<<endl;

	getchar();
	return 0;
}
```

从输出结果，可以看出内存情况如下：
![内存情况](http://img.my.csdn.net/uploads/201212/05/1354637651_4158.jpg)


注意下面这份简谱，注意到乐谱上也有很多的***休止符***，在简谱上也是用`0`来表示，但是它们**不是“没有”**， 而是表示**不发音**！

![简谱](http://img.my.csdn.net/uploads/201212/06/1354802731_3968.jpg)

这些0都**不能去掉**的，因为去掉，节奏肯定乱了。
 
 0与其说是“空”，还不如说是“填空”更恰当。因为它的作用是***占位***。

结合这个例子，想必大家就理解了， “空结构体” 为什么需要占用一个字节的空间。

***可见，科学和艺术不分家的啊！***

对数组比较熟悉的同学可能会问，怎么可以有0元素数组呢？

是的，如果我们在`struct`和`class`之后定义0元素数组，会编译报错，如下代码所示：
```cpp
#include <iostream>

using namespace std;

struct NoMember
{

};

struct NoMember1
{
	int mA[0];
};

struct NoMember2
{
	char mB;
	int mA[0];
};


struct NoMember3
{
	int arr[0];
};


int arr[0];


int main(void)
{
	NoMember nm0;
	NoMember1 nm1;
	NoMember2 nm2;

	cout<<endl<<"The size of the struct NoMember is: "<<sizeof(NoMember)<<endl;
	cout<<"The address of the struct of NoMember: 0x"<<&nm0<<endl;

	cout<<endl<<"The size of the struct NoMember1 is: "<<sizeof(NoMember1)<<endl;
	cout<<"The address of the struct of NoMember: 0x"<<&nm1.mA<<endl;

	cout<<endl<<"The size of the struct NoMember2 is: "<<sizeof(NoMember2)<<endl;
	cout<<"The address of the struct of NoMember: 0x"<<&nm2.mA<<"\t0x"<<&nm2.mA<<endl;

	getchar();
	return 0;
}
```

出错信息如下：
```
1>e:\code\vs2010_prjs\struct\structdeclare\nomems.cpp(28): error C2466: 不能分配常量大小为 0 的数组
```

而`stuct`里面的0元素数组报的是**warning**，如下所示：
```
1>e:\code\vs2010_prjs\struct\structdeclare\nomems.cpp(24): warning C4200: 使用了非标准扩展 : 结构/联合中的零大小数组
1>          当 UDT 包含大小为零的数组时，无法生成复制构造函数或副本赋值运算符
```

那么，问题又来了，这些`struct`里面的**0元素数组**有什么意义呢？

***欲知后事如何，请听下回分解......***

***Updated by Long Luo at 2016-6-11 04:17:09 @Shenzhen, China.***

