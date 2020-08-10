---
layout: post
title: "《编程珠玑》第二章 “杂技算法” 和 “翻转算法” C语言实现"
comments: true
date: 2016-06-06 11:17:49
tags: [Algorithm, 编程]
categories: Data Structures and Algorithms
keywords: 字符串翻转, 编程珠玑, 杂技算法, 翻转算法, 算法, 编程, Algorithm, 
---


***By Long Luo***

# 题目：

将一个n元一维数组a[n]左移i个位置。例如，当n=8，i=3时，数组abcdefgh旋转为defghabc。请设计一个算法完成这个任务。

# 解答

## 杂技算法

分析：将a[0]存储在一个临时变量中，然后将a[i]替换a[0],a[2i]替换a[i]….当一个循环结束的时候，若替换次数小于n，则从a[1]开始替换…，需要经过gcd（n,i）(n和i的最大公约数)次循环后，才能把每一个元素都移到该移的地方。

```cpp
/*
**
**	tcpipstack @29/10/2012.
**  shenzhen.
**
*/
#include <iostream>
#include <string>

using namespace std;

/* Acrobat Rotate Shift Alogrithm */
string AcrobatRotateShift(string str, int n);

//
int main(void)
{
	string str1 = "abcdefg";
	string str2 = "";

	cout<<"str1= "<<str1<<endl;
	cout<<"str2= "<<str2<<endl;


	str2 = AcrobatRotateShift(str1, 2);

	cout<<"str1= "<<str1<<endl;
	cout<<"str2= "<<str2<<endl;

	getchar();

	return 0;
}


/*
*
*	the Acrobat Rotate Shift Alogrithm
*
*/
string AcrobatRotateShift(string str, int n)
{
	int strlen = str.length();
	int count = 0; //统计移动次数
	int i, j = 0; //k初始化为0，从str[0]开始
	char temp;

	while (1)
	{
		//开始的元素保存到临时变量temp中
		temp = str[j]; 
		i = (j + n) % strlen;

		//开始移动，直到遇到开始的元素
		while (i != j) 
		{
			str[(i - n + strlen) % strlen] = str[i];
			count++;    //移动次数统计量+1
			i = (i + n) % strlen;
		}

		//临时变量temp中保存的值赋值给刚才移动的最后一个位置
		str[(j - n + strlen) % strlen] = temp;
		count++;

		//判断是否所有元素都已经移动
		if (count < strlen)    
		{
			//没有移动所有元素，再次从str[j+1]开始
			j++; 
		}
		else
		{
			//所有元素都已经移动，跳出循环
			break; 
		}
	}

	return str;
}
```

<!--more-->

## 翻转算法

我们将问题看成把数组ab转换成ba，同时假定我们拥有一个函数可以将数组中的特定部分元素求逆。从ab开始，先对a求逆，得到ar b,然后对b求逆，得到ar br  ，然后整体求逆，得到（ar br）r 。此时就是ba。

```cpp
/*
**
**	tcpipstack @29/10/2012.
**  shenzhen.
**
*/
#include <iostream>
#include <string>

using namespace std;


string Reverse(string str, int m, int n);
string InverseRotateShift(string str, int n);


//
int main(void)
{
	string str1 = "abcdefg";
	string str2 = "";

	cout<<"str1= "<<str1<<endl;
	cout<<"str2= "<<str2<<endl;
	
	str2 = InverseRotateShift(str1, 5);

	cout<<"str1= "<<str1<<endl;
	cout<<"str2= "<<str2<<endl;

	getchar();

	return 0;
}


//
string Reverse(string str, int m, int n)
{
	char temp;

	while (m < n)
	{
		temp = str[m];

		str[m] = str[n];
		str[n] = temp;

		m++;
		n--;
	}

	return str;
}


string InverseRotateShift(string str, int n)
{
	int strlen = str.length();

	str = Reverse(str, 0, n-1);
	str = Reverse(str, n, strlen-1);
	str = Reverse(str, 0, strlen-1);

	return str;
}
```

*** Modified By Long Luo at 2018年10月1日 in Shenzhen, China.***

