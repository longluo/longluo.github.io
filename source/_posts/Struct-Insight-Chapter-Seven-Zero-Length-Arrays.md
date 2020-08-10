---
layout: post
title: "大话结构体之七：struct中0元素数组的意义在哪里？"
comments: true
date: 2013-01-03 04:28:58
tags: [结构体, 技术, 科普]
categories: Program
keywords: 大话结构体, Struct, 结构体, Cpp, C, 科普, 对齐, 0元素数组
---

***By Long Luo***

>前言
	[“大话结构体”](http://blog.csdn.net/column/details/structure.html)系列文章写于2012年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上连载的，这是系列的第七篇: [大话结构体之七：struct中0元素数组的意义在哪里？](http://blog.csdn.net/tcpipstack/article/details/8271856)

-----------

上一回[大话结构体之六：无即是有，没有成员变量的Struct(结构体)](http://www.longluo.me/blog/2013/01/01/Struct-Insight-Chapter-Six-Struct-With-No-Members/)，我们在文章的结尾留了一个悬念：

---为什么0元素数组在`class`和`struct`结构体之外定义就是错误的，而在`class`和`struct`中定义就是Okay的，那么**结构体中的0元素数组意义何在**？

<!--more-->

打个通俗的比喻，比如一个部门，有部门经理、PM、以及数量众多的苦逼程序猿们，某天部门接到一个项目，于是乎，拉出一个PM及数量未知的程序猿们，开工了：

```cpp
#include <iostream>

using namespace std;

struct Department
{
	int Manager;
	int PM;
	int ProgrammerNo[0];
};


int main(void)
{
	Department *pt = NULL;
	int Num = 5;
	pt = (Department *)malloc(sizeof(Department) + sizeof(int) * Num);

	pt->ProgrammerNo[0] = 006;
	pt->ProgrammerNo[1] = 99;
	

	getchar();
	return 0;
}
```

做一个项目，**程序猿的数量是变化的**，因此我们也就知道

`struct`中**0元素数组意义就是可以作数量未知的扩展**，所以也称为**flexible arrays**。 

通过系列之五和之六，我们了解了0元素数组的意义。在下一篇中我们将试图揭开`struct`最复杂和最难的部分：**Struct中的函数和函数指针**。

***不要走开，后面更精彩！***

***Updated by Long Luo at 2016-6-11 04:42:01 @Shenzhen, China.***

