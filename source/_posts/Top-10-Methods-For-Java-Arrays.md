---
layout: post
title: "Java Array最重要的10个方法"
comments: true
date: 2016-08-06 22:26:58
tags: [Java, Array]
categories: Java
keywords: Java, Array, 数组, 方法, 
---

本文将展示Java Array的最重要的10个方法：

# 0. 声明一个数组

```java
String[] aArray = new String[5];
String[] bArray = {"a","b","c", "d", "e"};
String[] cArray = new String[]{"a","b","c","d","e"};
```

# 1. 打印数组

```java
int[] intArray = { 1, 2, 3, 4, 5 };
String intArrayString = Arrays.toString(intArray);
 
// print directly will print reference value
System.out.println(intArray);
// [I@7150bd4d
 
System.out.println(intArrayString);
// [1, 2, 3, 4, 5]
```

<!--more-->

# 2. 从一个数组中创建一个ArrayList

```java
String[] stringArray = { "a", "b", "c", "d", "e" };
ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(stringArray));
System.out.println(arrayList);
// [a, b, c, d, e]
```

# 3. 判断数组中是否包含一个特定的值

```java
String[] stringArray = { "a", "b", "c", "d", "e" };
boolean b = Arrays.asList(stringArray).contains("a");
System.out.println(b);
// true
```

# 4. 连接2个数组

```java
int[] intArray = { 1, 2, 3, 4, 5 };
int[] intArray2 = { 6, 7, 8, 9, 10 };
// Apache Commons Lang library
int[] combinedIntArray = ArrayUtils.addAll(intArray, intArray2);
```

# 5. 声明一个inline数组

```java
method(new String[]{"a", "b", "c", "d", "e"});
```

# 6. 将一个数组中元素变成一个字符串

```java
// containing the provided list of elements
// Apache common lang
String j = StringUtils.join(new String[] { "a", "b", "c" }, ", ");
System.out.println(j);
// a, b, c
```

# 7. 将一个ArrayList转换成一个数组

```java
String[] stringArray = { "a", "b", "c", "d", "e" };
ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(stringArray));
String[] stringArr = new String[arrayList.size()];
arrayList.toArray(stringArr);
for (String s : stringArr)
	System.out.println(s);
```

# 8. 将一个数组转换成一个Set

```java
Set<String> set = new HashSet<String>(Arrays.asList(stringArray));
System.out.println(set);
//[d, e, b, c, a]
```

# 9. 反转一个数组

```java
int[] intArray = { 1, 2, 3, 4, 5 };
ArrayUtils.reverse(intArray);
System.out.println(Arrays.toString(intArray));
//[5, 4, 3, 2, 1]
```

# 10. 从一个数组中删除一个单元

```java
int[] intArray = { 1, 2, 3, 4, 5 };
int[] removed = ArrayUtils.removeElement(intArray, 3);//create a new array
System.out.println(Arrays.toString(removed));
```

# One more - 将int转换成一个byte array

```java
byte[] bytes = ByteBuffer.allocate(4).putInt(8).array();
 
for (byte t : bytes) {
   System.out.format("0x%x ", t);
}
```

以上！

