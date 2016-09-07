---
layout: post
title: "Java Array最重要的10个方法"
comments: true
date: 2016-08-06 22:26:58
tags: [Java, Array]
categories: Java
keywords: Java, Array, 数组
---

本文将展示Java Array的最重要的10个方法：

# 1. 声明一个数组

```java
	String[] aArray = new String[5];
	String[] bArray = { "a", "b", "c", "d", "e" };
	String[] cArray = new String[] { "a", "b", "c", "d", "e" };
```

<!--more-->

# 2. 打印一个数组

```java
	int[] intArray = { 1, 2, 3, 4, 5 };
	String intArrayString = Arrays.toString(intArray);
	
	// print directly will print reference value
	System.out.println(intArray);
	// [ I@7150bd4d
	System.out.println(intArrayString);
	// [ 1 , 2 , 3 , 4 , 5]	
```	

# 3. 从一个数组中创建一个ArrayList

```java
	String[] stringArray = { " a ", "b", " c ", "d", " e " };
	ArrayList<String> arrayList = new ArrayList<String>(
			Arrays.asList(stringArray));
	System.out.println(arrayList);
	// [a, b, c, d, e]
```


# 4. 检查一个数组是否包含一个特定的值

```java
	String [] stringArray = {"a", "b", "c", "d", "e"};
	boolean b = Arrays.asList(stringArray).contains("a");
	System.out.println(b);
	// tr u e
```

# 5. 连接2个数组

```java
	int [] intArray = {1, 2, 3, 4, 5} ;
	int [] intArray2 = {6, 7, 8, 9, 10};
	// Apache Commons Lang library
	int [] combinedIntArray = ArrayUtils.addAll(intArray, intArray2);
```

# 6. declare an array inline

```java
	method(new String[ ]{"a", "b", "c", "d", "e"});
```

# 7. joins the elements of the provided array into a single string

```java
/ / c o n t a i n i n g t h e p r o v i d e d l i s t o f e l eme n t s
/ / Apache common l ang
S t r ing j = S t r i n gUt i l s . j o i n (new S t r ing [ ] { " a " , "b" , " c " } , " , " ) ;
System . out . pr int ln ( j ) ;
/ / a , b , c
```

# 8. covnert an arraylist to an array

```java
S t r ing [ ] s t r ingAr ray = { " a " , "b" , " c " , "d" , " e " } ;
ArrayList <St r ing > a r r a yLi s t = new ArrayList <St r ing >(Arrays . a sLi s t (
s t r ingAr ray ) ) ;
S t r ing [ ] s t r ingAr r = new S t r ing [ a r r a yLi s t . s i z e ( ) ] ;
a r r a yLi s t . toArray ( s t r ingAr r ) ;
for ( S t r ing s : s t r ingAr r )
System . out . pr int ln ( s ) ;
```

# 9. CONVERT AN ARRAY TO A SET 

```java
Set <String> set = new HashSet<String>(Arrays.asList(stringArray));
System.out.println(set);
// [d , e , b , c , a ]
```


# 10 reverse an array

```java
int [ ] intAr ray = { 1 , 2 , 3 , 4 , 5 } ;
Ar rayUt i l s . r eve r s e ( intAr ray ) ;
System . out . pr int ln ( Arrays . t o S t r ing ( intAr ray ) ) ;
/ / [ 5 , 4 , 3 , 2 , 1]
```

# 11. remove element of an array

```java
int [ ] intAr ray = { 1 , 2 , 3 , 4 , 5 } ;
int [ ] removed = Ar rayUt i l s . removeElement ( intArray , 3) ; 
// c r e a t e anew a r r a y
System . out . pr int ln ( Arrays . t o S t r ing ( removed ) ) ;
```

# 12. one more - convert int to byte array

```java
	byte [] bytes = ByteBuffer.allocate(4).putInt(8).array();
	for(byte t : bytes) {
		System.out.format("0x%x", t);
	}
```
