---
layout: post
title: "一道迅雷面试题:求出一个字符串中每个字母出现的次数"
date: 2015-04-12 00:59:54 +0800
comments: true
categories: Data Structures and Algorithms
tags: [面试, Algorithm]
keywords: 算法, 面试题, 字符串,迅雷面试题, Algorithm, 
---


***By Long Luo***

上次在`迅雷`面试的时候，遇到了一个算法题，题目是：

>有一个很长很长的字符串，全部都是由大写字母组成，要求求出其中每个字母在这个字符串中出现的次数。
不允许使用STL中的方法。
	
当时拿到这个题目，我首先想到了以下几个方法：

1. **穷举法**，一个个比较，最后算出每个字母出现的次数，这种方法可行，但不轻巧与优雅。
2. 每个字符与'A'想减，会得到一个**值**，统计下这个值出现次数，和方法1类似。(事后回顾这个已经很接近了，但是还是没能完美解决。)

其实这个题目，事后回顾起来，是比较简单的，但遗憾的是，当时未能在规定时间内解答出来，导致未能通过面试，拿到Offer，在此将这个题目记录下来。

重新认真解答这个题目。

# How?

<!--more-->

其实这个题目有一个很简单的解决防范，新建一个数组，大小为26，将字符串中每个字符都与`'A'`相减，得到的就是每个字母在数组中的`元素下标值`，我们最后得到的这个数组就是每个字母在这个字符串中出现的次数。

根据以上分析，可以写出如下代码：

```java
    package com.algorithm.alphabetSort;
    
    /**
     * 有一个很长的字符串，其中都是一些字母，求其中每个字母出现的次数(大小写区分)。
     * 
     * @author luolong
     * @date: 2015-04-12 00:54:17
     * 
     */
    public class AlphabetSort {
        private static String str = "AWQEYIOAHDHDKKLDLAHFHJALAFHANNAFGJCXCKBZCQIEOPADHAZBZVCFGCSHDJCKCLDMDHFAKAIIAYQO";
    
        private static int[] outArray = new int[26];
    
        public static void main(String[] args) {
            AlphabetSortString(str);
            printSortArray(outArray);
        }
    
        public static void AlphabetSortString(String str) {
            char cTemp;
    
            for (int i = 0; i < str.length(); i++) {
                cTemp = str.charAt(i);
                
                outArray[cTemp - 'A']++;
            }
        }
    
        private static void printSortArray(int[] arr) {
            for (int i = 0; i < arr.length; i++) {
                char c = (char) ('A' + i);
                System.out.print("" + c + "=" + arr[i] + " ");
            }
        }
    
    }
```

# 引申与扩展一

如果字符串不仅仅是大写字母，而是大小写字母都存在的情况下，那应该如何写呢？

其实也很简单，如下所示：

```java
	if (cTemp >= 'A' && cTemp <= 'Z') {
		/**
		* 大写字母
		*/
		outArray[cTemp - 'A']++;
	} else if (cTemp >= 'a' && cTemp <= 'z') {
		/**
		* 小写字母
		*/
		outArray[cTemp - 'a' + 26]++;
	} else {
    
	}
```
	
# 引申与扩展二

如果字符串，假如`所有字符`都需要统计呢？

那又应该如何做呢？

后来我发现了用HashMap来存储也是可以的，也可以完美解决这个问题，代码如下所示：

```java
    package com.algorithm.alphabetSort;
    
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;
    
    /**
     * 有一个很长的字符串，其中都是一些字母，求其中每个字母出现的次数(大小写区分)。
     * 
     * @author luolong
     * @date: 2015-04-12 01:03:38
     * 
     */
    public class CharSort {
        private static String str = "AWQEYIOAHDHDKKLDLAHFHJALAFHANNAFGJCXCKBZCQIEOPADHAZBZVCFGCSHDJCKCLDMDHFAKAIIAYQO";
    
        public static void main(String args[]) {
            Map<Character, KeyValue> map = new HashMap<Character, KeyValue>();
            char c;
            KeyValue kv = null;
            for (int i = 0; i < str.length(); i++) {
                c = str.charAt(i);
                kv = map.get(c);
                if (kv == null) {
                    kv = new KeyValue();
                    kv.ch = c;
                    kv.count = 1;
                    map.put(c, kv);
                } else {
                    kv.count++;
                }
            }
            List<KeyValue> list = new ArrayList<KeyValue>(map.values());
            Collections.sort(list);
            for (KeyValue o : list) {
                System.out.print(o.ch + "=" + o.count + "  ");
            }
        }
    }
    
    class KeyValue implements Comparable {
        public int compareTo(Object obj) {
            if (obj instanceof KeyValue) {
                KeyValue kv = (KeyValue) obj;
                return kv.count - this.count;
            }
    
            return -1;
        }
    
        char ch;
    
        int count;
    }
```

以上。

如果大家还有其他更好的方法，欢迎一起讨论:-)

***Created by Long Luo at 2015-04-12 01:08:20 @Shenzhen, China.***
***Completed By Long Luo at 2015-04-12 01:28:39 @Shenzhen, China.***

