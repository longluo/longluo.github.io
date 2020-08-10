---
layout: post
title: "关于Java字符串(String)10个最常见问题"
comments: true
date: 2016-08-05 09:49:42
tags: [Java, String]
categories: Java
keywords: Java, String, 字符串, 问题,
---

Java语言中，String一直很基础，但很多人都很多概念还是很模糊。这里我们选取了网络上最常见的10个问题，希望通过这篇文章让大家对Java String有更深刻的认识。

# 1. 如何对字符串进行比较？用“==” 还是`equals()`？

简单来说，如果**引用是否相同**那么使用`==`， 判断***值是否相等***则用`equals()`。除非你想判断2个字符串是否是同一对象，否则你都应该使用`equals()`。

<!--more-->

# 2. 为什么在安全敏感信息场合应该用char[]而不是string？

String具有不可变的特性，当字符串一旦被创建，那么知道垃圾收集器处理之前他们都是不可变的。如果使用数组，那么你可以明确地改变其内部单元数据。因此，安全敏感的信息例如密码不应该在系统中任何时候都存在。

# 3. 我们可以在switch语句中使用string吗？

是的，在Java 7中可以！JDK7中，我们可以在`switch`中使用string。但是之前的Java版本是不可以的。

```java
// java 7 only!
switch(str.toLowerCase()){
	case "a":
		value = 1;
		break;

	case "b":
		value = 2 ;
		break;
	}
```

# 4. 如何将字符转成Int类型？

```java
int n = Integer.parseInt("10");
```

就是这样简单！

# 5. 如何用白色空格字符分离一个字符串？

可以使用***正则表达式***分离字符串。""表示白色空格字符比如" ", ""。

```java
String [] strArray = aString.split("\\s+");
```

# 6. `substring()`这个方法起什么作用？

在JDK6中，`substring()`方法并不会创建一个新的字符数组，而是给现存的字符串一个窗口用于表示当前字符串。如果想用一个新的字符数组来表示新的字符串，你可以加一个空支付串来实现，如下所示：

```java
str.substring(m, n) + ""
```

使用上述方法，会创建一个新的字符数组来表示新的字符串。有时候可以让你的代码更快，因为垃圾收集器会收集一些没有使用的大字符串但子字符串确实保留的。

JDK7中，`substring()`会创建一个新的字符数组，而不是使用现在的这个。


# 7. String vs StringBuilder vs StringBuffer

String vs StringBuilder: StringBuilder是可变的,你可以在创建之后继续修改它。 

StringBuilder vs StringBuffer: StringBuffer是同步的，线程安全但是也因为如此，它比StringBuilder要慢。

# 8. 如何重复一个字符串？

Python语言，要重复一个字符串只需要乘以一个数字即可。Java语言中，我们可以使用StringUtils中的`repeat()`方法。

```java
String str = "abcd";
String repeated = StringUtils.repeat(str,3);
//abcdabcdabcd
```

# 9. 如何将字符串转换成日期？

```java
String str = "Sep 17, 2013";
Date date = new SimpleDateFormat("MMMM d, yy", Locale.ENGLISH).parse(str);
System.out.println(date);
//Tue Sep 17 00:00:00 EDT 2013
```

# 10. 如何计算一个字符串中某个字符的出现次数？

使用StringUtils中方法：

```java
int n = StringUtils.countMatches("11112222", "1");
System.out.println(n);
```

以上！

