---
layout: post
title: "大话结构体之三：借我一双慧眼吧，让我把C++中Class(类)和Struct(结构体)看个清清楚楚明明白白..."
comments: true
date: 2012-12-25 23:52:25 
tags: [结构体, 技术, 科普]
categories: Program
keywords: 大话结构体, Struct, 结构体, Cpp, C, 科普
---

***By Long Luo***

>前言
	[“大话结构体”](http://blog.csdn.net/column/details/structure.html)系列文章写于2012年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上连载的，这是系列的第三篇: [大话结构体之三: 借我一双慧眼吧，让我把C++中Class(类)和Struct(结构体)看个清清楚楚明明白白...](http://blog.csdn.net/tcpipstack/article/details/8267346)

-----------

之前一篇 [大话结构体之二: 名不正则言不顺---Struct(结构体)的声明、定义及初始化](http://blog.csdn.net/tcpipstack/article/details/8267339)，我们已经了解了**C++**中**Struct**的定义方法和**C**中有点不一样，而且增加了一种新的类型---***Class***。从C++的名字我们就可以知道，C++是从C进化而来，“**++**”就是在C的基础上加了一些东西：***面向对象的东西***。

虽然C++作为一种面向对象语言，要区别于面向过程的C语言，但是在设计时，一个很重要的原则是C++必须向前兼容C，必须是C的超集。这样一来就可以带来好多好处：

第一个嘛，首先呢，C++就可以站在C这个巨人的肩膀上，大量过去用C编写的程序可以不加修改地在C++环境下使用；
第二，把很多C程序员忽悠进C++这个大坑里，为C++之崛起而加班，上了贼船可就由不得你了**XD**
.......

也正是因为这个原因，C++中保留了Struct结构类型，并使得Struct的功能更强大，不仅仅是简单继承C的结构体，而且扩充了Struct，使得它也具有类的特点，那么**在C++中，Class和Struct到底有什么区别呢**？

***Talk is cheap, show me the Code!***

```cpp
#include <iostream>

using namespace std;

struct S1
{
	char mA;
	int mB;
};

class C2
{
	char mA;
	int mB;
};


int main(void)
{
	S1 a;
	C2 b;
	cout<<sizeof(a)<<&a<<endl;
	cout<<sizeof(b)<<&b<<endl;

	getchar();
	return 0;
}
```

上面这段代码非常简单，分别定义了一个Struct类型和Class类型，并输出其大小和地址，我们先看看输出结果：

![Class And Struct Output](http://img.my.csdn.net/uploads/201212/06/1354804133_7588.jpg)

从结果我们可以看出，**没啥区别**啊！

<!--more-->

且慢，再看下面这段代码：

```cpp
#include <iostream>

using namespace std;

struct S1 
{
	char mA;
	int mB;
};

class C1
{
	char mA;
	int mB;
};

struct S2
{
	char mA;
	int mB;

	void foo()
	{
		cout<<"mA="<<mA<<endl;
		cout<<"mB="<<mB<<endl;
	}
};

class C2
{
	char mA;
	int mB;

	void foo()
	{
		cout<<"mA="<<mA<<endl;
		cout<<"mB="<<mB<<endl;
	}
};


int main(void)
{
	S1 a;
	C1 b;

	S2 c;
	C2 d;

	cout<<sizeof(S1)<<"\t"<<&a<<endl;
	cout<<sizeof(C1)<<"\t"<<&b<<endl;

	c.foo();
	d.foo();

	getchar();
	return 0;
}
```

编译，结果报错了，如下所示：
```
e:\code\vs2010_prjs\struct\structdeclare\classandstruct.cpp(54): error C2248: “C2::foo”: 无法访问 private 成员(在“C2”类中声明)
e:\code\vs2010_prjs\struct\structdeclare\classandstruct.cpp(34) : 参见“C2::foo”的声明
e:\code\vs2010_prjs\struct\structdeclare\classandstruct.cpp(30) : 参见“C2”的声明
```

编译提示说C2中函数foo是**没有权限访问C2的成员变量的**，是因为Class C2里面的成员变量是***private***的，而Struct S2就没有这个问题。

Class可以**完全替代Struct**，只不过是由于C++是在C的基础上设计的，所以保留了Struct这个遗产。而Java作为一种完全面向对象设计的语言，就没有Struct了。

最后总结下，**C++中的struct与class的区别**：
1. Class中默认的成员访问权限是***private***的，而Struct中则是***public***的；
2. 从Class继承默认是**private继承**，而从Struct继承默认是public继承。

细心的同学也会发现，C++中的Struct是可以拥有函数体的，这是C所不允许的，
C语言中要实现函数的话，必须通过***函数指针***来实现，那么C中Struct函数应该以一种什么样的形态出现呢？

**欲知后事如何，且听下回分解**！！！

***By Long Luo transfer at 2016-6-8 21:32:16 @Shenzhen, China.***

