---
layout: post
title: "解析RSA加解密算法"
comments: true
date: 2013-09-24 12:26:49
tags: [RSA, 加解密, 算法]
categories: Data Structures and Algorithms
keywords: 加解密算法, RSA, 细节, 信息安全
---

<strong><em>By Long Luo</strong></em>


# 一、RSA说明  

***RSA***公钥加密算法是1977年由Ron Rivest、Adi Shamirh和LenAdleman在（美国麻省理工学院）开发的。RSA取名来自开发他们三者的名字。

RSA算法基于一个十分简单的数论事实：将两个大素数相乘十分容易，但想要对其乘积进行因式分解却极其困难，因此可以将乘积公开作为加密密钥。

# 二、RSA算法实现  

RSA算法是一种非对称密码算法，所谓非对称，就是指该算法需要一对密钥，使用其中一个加密，则需要用另一个才能解密。

<!--more-->

详细加密过程如下：

1. 选择两个大素数P、Q
2. 计算N = P*Q
3. 选择一个公钥（加密密钥）E，使其不是(P-1)与(Q-1)的因子
4. 选择私钥（解密密钥）D，满足如下条件：
          (D*E) mod (P-1)(Q-1) = 1
5. 加密时，明文PT计算密文CT如下：
          CT = PTE mod N
6. 解密时，从密文CT计算明文PT如下：
          PT = CTD mod N 这也是SSL中会用一种密钥交换算法。
 
<strong>源码如下所示：</strong>

<!--more-->

```cpp
/********************************************************************************************
*	Copyright(c) tcpipstack
*	File Name				:	RSA.c 
*	Abstract Description	:	RSA加解密算法的简单演示	
*	Create Date				:	2010/08/17
*	Author					:	tcpipstack
*-------------------------Revision History--------------------------------------------------
*	No	Version		Date		Revised By			Item			Description
*	 1		1.0		10/08/17
*
********************************************************************************************/

#include <stdio.h>
#include <math.h>

/* RSA算法中加密方公布的密钥是N和E，解密方使用N和D解密 */
#define P	5	/* P和Q必须为素数，在实际运用中通常为很大的数 */
#define	Q	7

#define N	(P*Q)	/* add the (), or will cause the mistake */
#define Z	((P - 1)*(Q - 1))

#define E	5		/* 加密方选择E，E必须和Z只有一个公约数 */
#define D	5		/* (E * D - 1)必须能够被Z整除 */
/* 由于long int无法表示过大的数字，所以D取5 */ 

void main(void)
{
	int i;
	int TrsMsg[4] = {12, 15, 22, 5};
	long en[4], de[4];
	int SecCode[4], DeMsg[4];

	printf("下面是一个RSA加解密算法的简单演示:\n");
	printf("\t Copyright(C) Long.Luo.\n\n");
	printf("报文\t加密\t   加密后密文\n");

	for (i=0; i<4; i++)
	{
		/* s = m(E) mod N */
		en[i] = (int)pow(TrsMsg[i], E);
		SecCode[i] = en[i] % N;

		printf("%d\t%d\t\t%d\n", TrsMsg[i], en[i], SecCode[i]);
	}

	printf("\n原始报文\t密文\t加密\t\t解密报文\n");
	for (i=0; i<4; i++)
	{
		/* d = s(D) mod N */
		de[i] = pow(SecCode[i], D);
		DeMsg[i] = de[i] % N;

		printf("%d\t\t%d\t%d\t\t%d\n", TrsMsg[i], SecCode[i], de[i], DeMsg[i]);
	}

	getchar();
}
```

<strong>输出结果如下所示：</strong>
<img src="http://databank.u.qiniudn.com/blog/images/2013/09/RSA_demo_output.jpg" alt="RSA_Output" />

通过以上，我们就了解了***RSA***算法的原理及其实现。


***By Long Luo transfer at 2016-6-5 17:30:58 @Shenzhen, China.***

