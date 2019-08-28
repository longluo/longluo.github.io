---
layout: post
title: "面试算法题:爬楼梯，N级楼梯有多少种走法？"
date: 2015-04-06 22:20:50 +0800
comments: true
categories: Data Structures and Algorithms
tags: [Algorithm, 面试]
keywords: 算法, 递归, 树, 栈, 面试, Tree, Algorithm, 
---


***By Long Luo***

最近去面试时，在一家小公司面试时，公司小BOSS给我出了一道算法题：

>一个人爬楼梯，一步可以迈一级，二级，三级台阶，如果楼梯有N级，要求编写程序，求总共有多少种走法。

这个问题应该是一个很老的题目了，用中学数学来说，就是一个***排列组合***问题。当时拿到这个题目之后，首先想到使用**递归**的思想去解决这个问题：

>N级楼梯问题可以划分为：N-1级楼梯，N-2级楼梯，N-3级楼梯的走法之和。

先计算下0，1，2，3及楼梯有多少种走法：

>1 --> 1
	2 --> 11 2
	3 --> 111 12 21 3
	
那么，根据以上的分析很容易写出如下代码：

```java
    public static int countNumber(int stepsNum) {
        int sum = 0;

        if (stepsNum == 0) {
            return 0;
        }

        if (stepsNum == 1) {
            return 1;
        } else if (stepsNum == 2) {
            return 2;
        } else if (stepsNum == 3) {
            return 4;
        } else if (stepsNum > 3) {
            return countNumber(stepsNum - 3) + countNumber(stepsNum - 2)
                    + countNumber(stepsNum - 1);
        }

        return sum;
    }

    public static void main(String[] args) {

        for (int i = 0; i <= 10; i++) {
            System.out.println("楼梯台阶数:" + i + ", 走法有:" + countNumber(i));
        }
    }
```

再看看输出：

	楼梯台阶数:0, 走法有:0
	楼梯台阶数:1, 走法有:1
	楼梯台阶数:2, 走法有:2
	楼梯台阶数:3, 走法有:4
	楼梯台阶数:4, 走法有:7
	楼梯台阶数:5, 走法有:13
	楼梯台阶数:6, 走法有:24
	楼梯台阶数:7, 走法有:44
	楼梯台阶数:8, 走法有:81
	楼梯台阶数:9, 走法有:149

<!--more-->

# 但是如何求解具体走法呢？

但是仅仅算出有多少种走法是很容易的，基于这个基础，如何输出`具体的走法`呢？

我们可以使用`Stack`数据结构和`递归`的思想去完成这个题目：

```java
Stack<T>用于保存每一步的走法。
```

具体代码如下所示：

```java
    /**
     * 一个人爬楼梯，一步可以迈一级，二级，三级台阶，如果楼梯有N级，编写程序，输出所有走法。
     * 
     * @param args
     */
    public static void main(String[] args) {
        Stack<Integer> stt = new Stack<Integer>();
        
        buileT(stt, 3);
    }

    public static void buileT(Stack<Integer> stt, int N) {
        if (N >= 1) {
            stt.push(1);
            buileT(stt, N - 1);
            stt.pop();
        }
        if (N >= 2) {
            stt.push(2);
            buileT(stt, N - 2);
            stt.pop();
        }
        if (N >= 3) {
            stt.push(3);
            buileT(stt, N - 3);
            stt.pop();
        }
        if (N == 0) {
            for (int i : stt) {
                System.out.print("Step:" + i + "-->");
            }
            System.out.println("完成");
        }
    }
```

以上。

***Created by Long Luo at 2015-04-08 00:40:12 @Shenzhen, China.***
***Completed By Long Luo at 2015-04-08 18:15:38 @Shenzhen, China.***

