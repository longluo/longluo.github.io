---
layout: post
title: "3分钟速读：图解Java Collections的接口以及类层级关系"
comments: true
date: 2016-08-08 18:56:28
tags: [Java, Collection, Basic]
categories: Java
keywords: Java, Collections, 基础知识, 层级, Collection,
---

***翻译 By Long Luo***

本文翻译自[The Interface and Class Hierarchy Diagram of Java Collections](http://www.programcreek.com/2009/02/the-interface-and-class-hierarchy-for-collections/)，主要通过一系列简单易懂的图片让你迅速了解Java容器类，容器接口以及类层级关系。

大段文字会看得很烦，图片才是王道！

# 一、 Collection vs Collections

"Collection"和"Collections"是2个完全不同的概念，在Java容器的类层级图中，"Collection"是一个根接口，但是"Collections"仅仅只是一个提供多种静态方法的类用于操作一些Collection类型。

![Collection Vs Collections](http://www.programcreek.com/wp-content/uploads/2009/02/CollectionVsCollections.jpeg)

# 二、 Collection的类层级图

下图展示了Collection的类层级图：

![java-collection-hierarchy](http://www.programcreek.com/wp-content/uploads/2009/02/java-collection-hierarchy.jpeg)

<!--more-->

# 三、 Map的类层级图

下图是一张Map的类层级图：

![MapClassHierarchy](http://www.programcreek.com/wp-content/uploads/2009/02/MapClassHierarchy-600x354.jpg)

# 四、 总结

![collection summary](http://www.programcreek.com/wp-content/uploads/2009/02/collection-summary.png)

# 五、 代码示例

下面展示容器类的一个代码示例：

```java
List<String> a1 = new ArrayList<String>();
a1.add("Program");
a1.add("Creek");
a1.add("Java");
a1.add("Java");
System.out.println("ArrayList Elements");
System.out.print("\t" + a1 + "\n");
 
List<String> l1 = new LinkedList<String>();
l1.add("Program");
l1.add("Creek");
l1.add("Java");
l1.add("Java");
System.out.println("LinkedList Elements");
System.out.print("\t" + l1 + "\n");
 
Set<String> s1 = new HashSet<String>(); // or new TreeSet() will order the elements;
s1.add("Program");
s1.add("Creek");
s1.add("Java");
s1.add("Java");
s1.add("tutorial");
System.out.println("Set Elements");
System.out.print("\t" + s1 + "\n");
 
Map<String, String> m1 = new HashMap<String, String>(); // or new TreeMap() will order based on keys
m1.put("Windows", "2000");
m1.put("Windows", "XP");
m1.put("Language", "Java");
m1.put("Website", "programcreek.com");
System.out.println("Map Elements");
System.out.print("\t" + m1);
```

输出如下：

```
ArrayList Elements
	[Program, Creek, Java, Java]
LinkedList Elements
	[Program, Creek, Java, Java]
Set Elements
	[tutorial, Creek, Program, Java]
Map Elements
	{Windows=XP, Website=programcreek.com, Language=Java}
```

以上！
