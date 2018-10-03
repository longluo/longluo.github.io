---
layout: post
title: "大话结构体之一: 从女孩怎么选男朋友开始...Struct是为了解决什么问题？"
date: 2012-12-23 22:37:20  
comments: true
tags: [结构体, 技术, 科普]
categories: Program
keywords:  大话结构体, Struct, 结构体, Cpp, C, 科普
---

***By Long Luo***

>前言
	[“大话结构体”](http://blog.csdn.net/column/details/structure.html)系列文章写于2012年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上连载的，这是系列的第一篇: [大话结构体之一: 从女孩怎么选男朋友开始...Struct是为了解决什么问题？](http://blog.csdn.net/tcpipstack/article/details/8267336)

-------------

“关关雎鸠，在河之洲。窈窕淑女，君子好逑”，《诗经》三百篇，开篇就是男女之间的恋情，可见几千年的古人也十分重视爱情。这也难怪，毕竟男女的婚姻是人伦之始，而且含有成家立业的意思。引用生物学的观点来解释，就是“求食求偶是关系到人类生存繁衍的大事”，能不重视么？

在我们的老祖宗还住在山洞里的那个时代，野外看到一个漂亮的女野人，一棍子敲晕，拖进洞里…不过那个年代已经一去不复返了。随着人类的进步，具体到现在这个社会，现代的女人都要求男方高富帅，有车有房…当然按照进化心理学的观点来看，这些东西都代表着男性获取资源的能力，而智人(人类)的后代是很脆弱的，为了繁衍，所以女性是将男性所获取的资源和获取资源的能力置于第一位的。

不过，由于拜国内的房地产所赐，身为一名D丝的话，想要追到一个女孩，也变得异常困难，一方面是硬件上的劣势，比如外表、车、房子、一份体面的工作灯；另外一方面又有软件上的劣势，比如幽默感，人品如何、性格等。付出的服务项目也越来越多，既要送花，要帮女孩做这个做那个表决心，还要送这个送那个表付出。

据说20年后国内将有3000w男性光棍，女孩也就成了卖方市场，眼前这么多追求者，高富帅各方面程度都不一样，应该把哪个放在第一位呢？该怎么选呢？

比如一位美女，就有3位男性追求者，比较来比较去，某天决定先按照“帅”的程度排个序，选一个最“帅”的：

```cpp
/************************************************************************************
** File: - Z:\work\code\c\Struct\WhyUsingStuct.c
** 
** Copyright (C) Long.Luo, All Rights Reserved!
** 
** Description: 
**      WhyUsingStruct.c ---
** 
** Version: 1.1
** Date created: 22:25:44,20/12/2012
** Author: Long.Luo
** 
** --------------------------- Revision History: --------------------------------
** 	<author>	<data>			<desc>
** 
************************************************************************************/

#include <stdio.h>

/* Number of the boys */	
#define BOYS_NUM	(3)

void main()
{
	int i, j;

	/* Name */		
	char name[BOYS_NUM][10];

	/* height */
	int height[BOYS_NUM];

	/* rich */
	int money[BOYS_NUM];

	/* handsome */
	int handsome[BOYS_NUM];

	/* pointer array of the boys' name */
	char *pName[BOYS_NUM];

	/* the temporary */
	int heightTemp, moneyTemp, handsomeTemp;
	char *nameTemp;

	for (i = 0; i < BOYS_NUM; i++)
	{
		pName[i] = name[i];
	}

	for(i = 0; i < BOYS_NUM; i++)
	{
		printf("Pls input the Name of the No. %d Boys:", i + 1);
		gets(pName[i]);
		if (*pName[i] == '\0')
		{
			gets(pName[i]);
		}

		printf("Pls input the Height of %s ：", pName[i]);
		scanf("%d", &height[i]);
		printf("Pls input the Money of %s ：", pName[i]);
		scanf("%d", &money[i]);
		printf("Pls input the Handsome of %s ：", pName[i]);
		scanf("%d", &handsome[i]);
	}

	/* sort by Height */
	/* Only write one item. */ 
	for (i = 0; i < BOYS_NUM - 1; i++)
	{
		for (j = i + 1; j < BOYS_NUM; j++)
		{
			if (handsome[i] < handsome[j])
			{
				nameTemp = pName[i];
				pName[i] = pName[j];
				pName[j] = nameTemp;

				handsomeTemp = handsome[i];
				handsome[i] = handsome[j];
				handsome[j] = handsomeTemp;
			}
		}
	}

	for (i = 0; i < BOYS_NUM; i++)
	{
		printf("\nThe Boys's info: %s\t, height: %d\t, money: %d\t, handsome: %d\t");
	}

	getchar();
}	
```

但是上面的代码有很明显缺点：

1. 变量过多，同一追求者的各个数据无联系，没有整体概念，不便管理；

2. 操作不便，假如某天想把“**富**”作为第一考虑呢？或者根据不同面采取不同的加权来选择呢？

***男人，不止一面!***(七匹狼广告)

**一个事物往往有很多的特征**，但是人们往往去表达事物的时候，不是***说特征***，而是***讲整体***。零碎的信息、有时候很难替代一个整体信息结构。

<!--more-->

显然，选用一种能把一个追求者的数据构造成一个**整体的构造型数据结构**更合适，但不能是**数组**。对于这种情况，可以将一个追求者的数据定义为一个`ExpectedBoyFriend`结构体类型：

```cpp
struct ExpectedBoyFriend
{
	char name[10];
	int height;
	int money;
	int handsome;
};
```

有时需要将不同类型的数据组合成一个有机的整体，以供用户方便地使用，而这些组合在一个整体中的数据是互相联系的。

Ｃ和C++允许***用户自己指定这样一种数据类型***，它称为***结构体***，在一个组合项中包含若干个类型不同（当然也可以相同）的数据项。

类似上例，我们就声明了一个新的结构体类型`ExpectedBoyFriend`，它向编译系统声明： 这是一种结构体类型，它包括`name, height, money, handsome`等不同类型的数据项。`ExpectedBoyFriend`是一个类型名，它和系统提供的标准类型（如int、char、float、double等）一样，都可以用来定义变量，只不过结构体类型需要**事先由用户自己声明**而已。

声明一个结构体类型的一般形式为：

```cpp
struct tag
{
	member-list
}
varible-list
```

结构体类型名用来作结构体类型的标志。上面的声明中`ExpectedBoyFriend`就是结构体类型名。大括号内是该结构体中的全部成员(member)，由它们组成一个特定的结构体。上例中的name, height, money, handsome等都是结构体中的成员。

在声明一个结构体类型时必须对各成员都进行类型声明：

	即类型名  成员名；

每一个成员也称为结构体中的一个域(field)。成员表列又称为**域表**。成员名的定名规则与变量名的定名规则相同。

我们再看看使用`Struct`之后的代码：

```cpp
/************************************************************************************
** File: - Z:\work\code\c\Struct\UsingStruct.c
** 
** Copyright (C) Long.Luo, All Rights Reserved!
** 
** Description: 
**      UsingStruct.c ---
** 
** Version: 1.2
** Date created: 22:52:29,20/12/2012
** Author: Long.Luo
** 
** --------------------------- Revision History: --------------------------------
** 	<author>	<data>			<desc>
** 
************************************************************************************/

#include <stdio.h>

/* Number of the boys */	
#define BOYS_NUM	(3)


struct ExpectedBoyFriend
{
	char name[10];
	int height;
	int money;
	int handsome;
};


void main()
{
	struct ExpectedBoyFriend ebf[BOYS_NUM];
	struct ExpectedBoyFriend ebfTemp;
	int i, j;

	for (i = 0; i < BOYS_NUM; i++)
	{
		printf("Pls input the Name of the No. %d Boys:", i + 1);
		gets(ebf[i].name);
		if (ebf[i].name[0] == '\0')
		{
			gets(ebf[i].name);
		}

		printf("Pls input the Height of %s ：", ebf[i].name);
		scanf("%d", &ebf[i].height);
		printf("Pls input the Money of %s ：", ebf[i].name);
		scanf("%d", &ebf[i].money);
		printf("Pls input the Handsome of %s ：", ebf[i].name);
		scanf("%d", &ebf[i].handsome);
	}

	/* Sort by Height */
	/* Only write one item. */ 
	for (i = 0; i < BOYS_NUM - 1; i++)
	{
		for (j = i + 1; j < BOYS_NUM; j++)
		{
			if (ebf[i].height < ebf[j].height)
			{
				ebfTemp = ebf[i];
				ebf[i] = ebf[j];
				ebf[j] = ebfTemp;
			}
		}
	}

	for (i = 0; i < BOYS_NUM; i++)
	{
		printf("%s: \tHeight:%d, \tMoney: %d, \tHandsome:%d\n", 
			ebf[i].name, ebf[i].height, ebf[i].money, ebf[i].handsome);
	}

	getchar();
}		
```

***代码是不是变得简洁多了呢***？

在这一篇里我们引入了结构体，了解了为什么需要结构体，在实际问题中作用及带来的好处。下一篇我们会对结构体的声明，定义及初始化进行详细讲解，不要走开，下节更精彩！


***By Long Luo transfer at 2016-6-5 02:15:28 @Shenzhen, China.***

