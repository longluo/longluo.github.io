---
layout: post
title: "一道有趣的算法题:仿照Excel的列编号,给定一个数字,输出该列编号字符串"
date: 2014-05-02 22:15:57 +0800
comments: true
categories: Algorithm 
description: "一道有趣的算法题:仿照Excel的列编号,给定一个数字,输出该列编号字符串"
keywords: Algorithm
---

#### ***By Long Luo***

最近遇到一个算法题：

仿照Excel的列编号，给出一个数字，输出该列编号字符串。

例如：A对应1，Z对应26，AA对应27，AZ对应52 ......

这个题目是一个典型的***26进制***思路去处理，一个整数除26然后但是这个题目里面有很多陷阱，在1, 26, 52等特殊情况进行考虑，经过晚上接近1个小时的编写，完成的代码如下：

<!--more-->

#### `C++`代码如下所示：

	#include <iostream>
	#include <string.h>

	using namespace std;

	//函数itos：正整数到编号转换
	//num：输入的正整数，pcout：输出，Max：输出控件最大长度
	void itos(int num, char *pcout )
	{
		char *res = new char[255];
		int m = 0, n = 0;
		
		while((num >= 1) && (n < 255))
		{
			m = num % 26;
			if (m != 0)
			{
				res[n] = 'A' + m - 1;
			}
			else
        {
        		res[n] = 'Z';
        		num--;
        }
         
			num /= 26;
			n++;
    }

		for(m = n; m > 0; m--)
		{
			pcout[n - m] = res[m - 1];
		}

		pcout[n] = '\0';
		delete[] res;

		return;
	}

	//soti：字符串到数字的转换
	int stoi(char *cha)
	{
     int m = 0, n = 0, i = 0, val = 0, a = 0;
     char *pc = cha ;

     while(*pc != '\0' )
    {
          //后移到个位 
         pc++;
         n++;
    }
    
     for(i = 1; i <= n; i++)
    {
          //位循环
         pc--;
         a = i;
         m = 1;
         
          while(a > 1)
         {
              //位权
             m *=26;
             a--;
         }
         
         m *= (*pc - 'A' +1);
         val += m;
    }
    
     return val;
	}

	int main()
	{
		char out[255] = {0};
    	printf( "out = %s\n", out);
    	itos(32, out);
    	printf( "out = %s\n", out);

    	getchar();

     	return true ;
	}


#### `JAVA`代码如下所示：

	package com.Algorithms.excelrow;
	
	/*
	 * @author: Long Luo
	 * @Created By Frank Luo @2014.05.01
	 */
	public class ExcelRow {
		public static void main(String args[]) {
	
			System.out.println("25=" + int2Str(5) + ",28=" + int2Str(28) + ",123="
					+ int2Str(123));
			System.out.println("C=" + str2Int("C") + ",ZA" + str2Int("ZA")
					+ ",AAF=" + str2Int("AAF"));
		}
	
		/*
		 * @Description: covert the String to Integer.
		 */
		public static int str2Int(String input) {
			int val = 0;
			int len = input.length();
			int mul = 0;
	
			for (int i = len - 1, j = 0; i >= 0; i--, j++) {
				mul = 1;
	
				int temp = input.charAt(i) - 'A' + 1;
				double weiquan = Math.pow(10, j);
				mul = (int) (temp * weiquan);
				val += mul;
	
				System.out.println("temp=" + temp + ",weiquan=" + weiquan + ",mul="
						+ mul + ",val=" + val);
			}
	
			return val;
		}
	
		/*
		 * @Description: covert the Integer to String.
		 */
		public static String int2Str(int rowNum) {
			StringBuffer temp = new StringBuffer(255);
			char ch;
	
			while (rowNum >= 1) {
	
				int i = rowNum % 26;
				if (i != 0) {
					ch = (char) ('A' + i - 1);
					temp = temp.append(ch);
				} else {
					ch = 'Z';
					temp = temp.append(ch);
					rowNum--;
				}
	
				System.out.println("temp=" + temp + ",ch=" + ch + ",rowNum="
						+ rowNum);
				rowNum /= 26;
			}
	
			return temp.reverse().toString();
		}
	
	}


以上代码均测试通过。

如有不当错误之处，敬请批评指正，如有更好的方法，也请共同探讨, Thx:-)


#### ***Long Luo Created at PM22:25 ~ 22:40 @May 02nd, 2014 at Shenzhen, China.***




