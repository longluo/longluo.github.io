---
title: '二分查找算法：迭代和递归'
comments: true
date: 2019-01-28 22:21:49
tags: [Algorithms, 二分查找, 递归]
categories: Data Structures and Algorithms
keywords: 二分查找, 迭代, 递归, 算法, Data Structures and Algorithms, 数据结构, Algorithms,
---

***By Long Luo***

<!-- TOC -->

- [迭代](#迭代)
- [递归](#递归)

<!-- /TOC -->

二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法，**算法复杂度**为：O(log2n)。但是，折半查找要求线性表必须采用[顺序存储结构](https://baike.baidu.com/item/顺序存储结构/1347176)，而且表中元素按关键字有序排列。

1.必须采用顺序存储结构；
2.必须按关键字大小有序排列。

二分查找充分利用了元素间的次序关系，采用分治策略。算法的基本思想是(假设数组arr呈升序排列)：

1. 将n个元素分成个数大致相同的两半；
2. 取arr[n/2]与欲查找的x作比较，如果x=a[n/2]则找到x，算法终止；
3.  如果x < a[n/2]，则只要在数组arr的左半部继续搜索x；如果x>a[n/2]，则我们只要在数组a的右半部继续搜索x。

二分查找常见有2种实现方式，迭代和递归，下面我们来实现这2种方式：

<!--more-->

# 迭代

代码如下所示：

```java
    /**
     * Returns the index of the specified target in the specified array.
     *
     * @param arr    the array of integers, must be sorted in ascending order
     * @param target the search target
     * @return index of key in array {@code arr} if present; {@code -1} otherwise
     */
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else if (arr[mid] > target) {
                high = mid - 1;
            }
        }

        return -1;
    }
```

# 递归


```java
    /**
     * Returns the index of the specified target in the specified array.
     *
     * @param arr    the array of integers, must be sorted in ascending order
     * @param low    the low index of the interval
     * @param high   the high index of the interval
     * @param target the search target
     * @return index of key in array {@code arr} if present; {@code -1} otherwise
     */
    public static int binarySearch(int[] arr, int low, int high, int target) {
        if (low > high) {
            return -1;
        }

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] > target) {
                return binarySearch(arr, low, mid - 1, target);
            } else if (arr[mid] < target) {
                return binarySearch(arr, mid + 1, high, target);
            }
        }

        return -1;
    }
```

以上。
