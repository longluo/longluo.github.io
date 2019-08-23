---
layout: post
title: '经典算法：从约瑟夫问题说开去...'
comments: true
date: 2017-11-10 23:27:04
tags: [Algorithm, Josephus Problem, Program]
categories: Data Structures and Algorithms
keywords: Algorithm, 算法, Josephus Problem, 递归, 约瑟夫问题, Problem, 
---


***By Long Luo***

约瑟夫问题是每个学计算机的同学都会遇到的经典编程题，下面我们就来通过这道题对好好学习下算法和编程吧，Let's go!

# 一、约瑟夫问题简介

据说著名犹太历史学家Josephus有过以下的故事：

>在罗马人占领乔塔帕特后，39个犹太人与Josephus及他的朋友躲到一个洞中，39个犹太人决定宁愿死也不要被敌人抓到，于是决定了一个自杀方式，41个人排成一个圆圈，由第1个人开始报数，每报数到第3人该人就必须自杀，然后再由下一个重新报数，直到所有人都自杀身亡为止。

然而Josephus和他的朋友并不想遵从这个规则，Josephus要他的朋友先假装遵从，他将朋友与自己安排在第16个与第31个位置，于是逃过了这场死亡游戏。

# 二、约瑟夫问题算法分析

约瑟夫问题可用代数分析来求解，将这个问题扩大好了，假设现在您与m个朋友不幸参与了这个游戏，您要如何保护您与您的朋友？

只要画两个圆圈就可以让自己与朋友免于死亡游戏，这两个圆圈内圈是排列顺序，而外圈是自杀顺序，如下图所示：

<!--more-->

![Josephus Problem](https://github.com/AppUnion/DataBank/blob/master/images/blog/JosephusProblem/Josephus41-3_1000.gif?raw=true)

假如使用编程来求解的话，只要将array当作环状来处理就可以了，在array中由计数1开始，每找到3个无数据区就填入1个计数，直到计数达41为止，然后将array由索引1开始列出，就可以得知每个位置的自杀顺序，这就是约瑟夫排列，41个人而报数3的约琴夫排列如下所示：

>14 36 1 38 15 2 24 30 3 16 34 425 17 5 40 31 6 18 26 7 37 19 8 35 27 9 20 32 10 41 21 11 28 39 12 22 33 13 29 23

由上可知，最后一个自杀的是在第31个位置，而倒数第二个自杀的要排在第16个位置，而之前的人都死光了，所以他们也就不知道约瑟夫与他的朋友并没有遵守游戏规则了。 

这是一道经典算法问题，每个学编程的同学都会遇到。一般常见的问法有以下几种：

1. 输出自杀顺序
2. 输出最后一个自杀同学编号

下面我们就来动手实践下，具体实现代码如下所示：

```java
private static int Josephus(int n, int m) {
	    int[] peopleArr = new int[n];
	    for (int i = 0; i < n; i++) {
	        peopleArr[i] = i + 1;
	    }
	
	    int index = 0;
	    int length = n;
	    int count = 1;
	
	    while (length > 0) {
	        if (peopleArr[index % n] > 0) {
	            if (count % m == 0) {
	                // 找到要出圈的人，并把圈中人数减1
	                System.out.print(peopleArr[index % n] + "  ");
	                peopleArr[index % n] = -1;
	                count = 1;
	                index++;
	                length--;
	            } else {
	                index++;
	                count++;
	            }
	        } else {
	            // 遇到空位了，就跳到下一位，但count不加1，也就是这个位置没有报数
	            index++;
	        }
	    }
	
	    return index;
	}
```

# 三、递归实现

这道题也可以使用递归来实现，原理如下：

>令f[n]表示当有n个候选人时，最后当选者的编号。则：
>	f[1] = 0
>	f[n] = (f[n - 1] + K) mod n

***方法证明：***

上述公式可以用数据归纳法简单证明其正确性：

	f[1] = 0
当只有一个候选人的时候，显然结果应该是0

	f[n] = (f[n - 1] + K) mod n
f[n - 1]为第n - 1次数到的id序列，则第n次就是再往下数k个，最后进行取模运算即可得到结果序列

这种算法的时间复杂度为***O(N)***，空间复杂度为***O(1)***，效率有所提高！

以n=5, m=3为例，一开始有这么5个人：

	0 1 2 3 4
第一轮报数后2号死亡，圈子里剩下来的人的编号是这些：

	3 4 0 1
这里把3号写在最前面了，因为轮到3开始报数。如果我们有办法知道n=4时的答案，即初始圈子为：

	0 1 2 3
时的答案，那么可以把n=4的初始圈子的所有数x变换成(x+3) mod 5，得到：

	3 4 0 1
这个恰好就是n=5时第一轮结束后的圈子状态，也就是说我们可以根据n=4的答案推出n=5时的答案。

归纳如下：

>设f(n)为初始有n人时最后一个自杀的人的编号，那么有如下递推式：
>	f(n) = (f(n-1) + m) mod n

手工演算一下就能发现**n = z**时的圈子第一轮结束后(即m-1号自杀后)的圈子状态，可以由n = z - 1的初始圈子施以变换***x -> (x+m) mod z***得到。于是我们可以从n = 1开始(此时的答案是0)，推出n=2的答案，再推出n=3，直到计算到所要求的n。

下面为具体实现：

```cpp
	private static int Josephus(int n, int m) {
	    int s = 0;
	    for (int i = 2; i <= n; i++) {
	        s = (s + m) % i;
	    }
	
	    return s;
	}
```


# 四、扩展

>假如有k个好人，和k个坏人，所有人站成一圈，前k个人是好人，后k个人是坏人， 编写程序计算一个最小的m，使k个坏人都被处决，而不处决任何好人。
>	输入: 
>		k为正整数
>
>	输出: 
>		返回: 最小的m，使k个坏人都被处决，而不处决任何好人。

算法及代码实现如下：

```java
	public static int getMinimumM(int K) {
	    /* 在这里实现功能 */
	    int m = K + 1;
	     
	    while (true) {
	        int index = 0;
	        int size = 2 * K;
	        while (true) {
	            index = (index + m - 1) % size;
	            if (index < K) {
	                break;
	            }
	            size--;
	        }
	        if (size == K) {
	            return m;
	        }
	        m++;
	    }
	}
```

以上。


***Updated By Long Luo at Shenzhen 19th, Aug, 2019.***
