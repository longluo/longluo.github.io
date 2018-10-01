---
layout: post
title: "5分钟学会Java反射"
comments: true
date: 2016-08-09 22:26:08
tags: [Java, 反射, 教程]
categories: Java
keywords: Java, Reflection, 反射, 教程, 自省,  
---

***By Long Luo***

最近在部门内部做了一次知识分享，关于***Java反射***，因此有了这篇文章：《5分钟学会Java反射》。这篇文章篇幅不长，用了大量示例，力求在很短的时间里让大家明白Java反射知识。

关于Java反射，我们需要弄懂以下几个问题：

1. 反射是什么？
2. 反射有什么用？
3. 怎么用反射？

下面我们来一一进行讲解：

# 一、反射是什么？

Reflection的意思是“反射、映象、倒影”，用在Java身上指的是我们可以于***运行时***加载、探知、使用编译期间完全未知的classes。换句话说，Java程序可以加载一个运行时才得知名称的class，获悉其完整构造（但不包括methods定义），并生成其对象实体、或对其fields设值、或唤起其methods。

Java反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性及方法；对于任何一个对象，都能够调用它的任意一个方法；这种动态获取信息以及动态调用对象的方法的功能称为Java的反射机制。

<!--more-->

## 1. 自省(Introspection) vs. 反射(Reflection)

反射经常和自省弄混，为了区别，我们先看看两者的详细定义：

自省(Introspection)：

>Introspection is the ability of a program to examine the type or properties of
an object at runtime.

反射(Reflection)：

>Reflection is the ability of a program to examine and modify the structure
and behavior of an object at runtime.

从上述定义，我们可以看出，**自省是反射的子集**。部分语言支持自省，但是不支持反射，比如C++。

## 2. 自省示例 vs. 反射示例

自省示例： instanceof操作符用于判断一个对象是否属于一个特定的类。

```java
if(obj instanceof Dog) {
	Dog d = (Dog)obj;
	d.bark();
}
```

反射实例: `Class.forName()`方法返回了一个具体类/接口的对象，当然参数需要指定为特定的类名。

```java
// with reflection
Class <?> c = Class.forName("classpath.and.classname");
Object dog = c.newInstance();

Method m = c.getDeclaredMethod("bark", new Class<?>[0]);
m.invoke(dog);
```

# 二、 为什么需要反射？

Java反射在***框架开发***中尤为重要。有些情况下，我们要使用的类在运行时才会确定，这个时候我们不能在编译期就使用它，因此只能通过反射的形式来使用在运行时才存在的类(该类符合某种特定的规范，例如JDBC)，这是反射用得比较多的场景。

编译时我们对于类的内部信息不可知，必须得到运行时才能获取类的具体信息。比如ORM框架，在运行时才能够获取类中的各个属性，然后通过反射的形式获取其属性名和值，存入数据库。

## 反射机制提供的功能：

1. 在运行时判断任意一个对象所属的类；
2. 在运行时构造任意一个类的对象；
3. 在运行时判断任意一个类所具有的成员变量和方法；
4. 在运行时调用任意一个对象的方法。通过反射甚至可以调用到private的方法；
5. 在运行时修改构造函数，变量和方法的访问权限。

## 解耦

假如我们有两个程序员，一个程序员在写程序的时候，需要使用第二个程序员所写的类，但第二个程序员并没完成他所写的类。那么第一个程序员的代码能否通过编译呢？这是不能通过编译的。利用Java反射的机制，就可以让第一个程序员在没有得到第二个程序员所写的类的时候，来完成自身代码的编译

在对类的调用和实例化的时候，通过在配置文件中配置相应的类名，在程序中读取类名，然后通过反射技术在程序中加载和实例化，如常见的数据库驱动程序类，为了达到不依赖特定数据库驱动类，将用到的数据库驱动类名放到配置文件中（常用的有XML文件、Properties文件和文本文件），然后在程序中加载驱动，来实现对数据库的解耦，也就是说只要修改配置文件，就可以方便地更改数据库类型。

例如, ***Spring***使用如下的`bean`配置:

```xml
<bean id="someID" class="com.programcreek.Foo">
<property name="someField" value="someValue"/>
</bean>
```
当`Spring`在处理`<bean>`时，会使用`Class.forName(String)`，同时参数为`"com.xxx.Foo"`用于实例化这个Class。同时，使用反射设置`<property>`去用于设置特定的值。

这种机制同样也用于`Servlet`的web应用：

```xml
<servlet>
<servlet name>someServlet </s e rvl e t􀀀name>
<servlet class>com.programcreek.WhyReflectionServlet</servlet class>
<servlet>
```

# 三、 反射API

## Java反射相关类

Java反射所需要的类并不多，主要有java.lang.Class类java.lang.reflect包中的Field、Constructor、Method、Array类，简单说明如下所示：

1. Class类：Class类的实例表示正在运行的 Java 应用程序中的类和接口。
2. Field类：提供有关类或接口的属性的信息，以及对它的动态访问权限。反射的字段可能是一个类属性或实例属性，简单的理解可以把它看成一个封装反射类的属性的类。
3. Constructor类：提供关于类的单个构造方法的信息以及对它的访问权限。这个类和Field类不同，Field类封装了反射类的属性，而Constructor类则封装了反射类的构造方法。
4. Method类：提供关于类或接口上单独某个方法的信息。所反映的方法可能是类方法或实例方法（包括抽象方法）。这个类不难理解，它是用来封装反射类方法的一个类。
5. Array类：提供了动态创建数组和访问数组的静态方法。该类中的所有方法都是静态方法。

## Class<T>

类是程序的一部分，每个类都有一个Class对象。换言之，每当编写并且编译了一个新类，就会产生一个Class对象。

Class没有公共构造方法。Class对象是在加载类时由Java虚拟机以及通过调用类加载器中的defineClass方法自动构造的，因此不能显式地声明一个Class对象

Class是Reflection的起源。要想操纵；类的属性和方法，都必须从获取Class Object开始。

### Class的方法

- getName()：获得类的完整名字。
- getFields()：获得类的public类型的属性。
- getDeclaredFields()：获得类的所有属性。
- getMethods()：获得类的public类型的方法。
- getDeclaredMethods()：获得类的所有方法。
- getMethod(String name, Class[] parameterTypes)：获得类的特定方法，name参数指定方法的名字，--parameterTypes参数指定方法的参数类型。
- getConstrutors()：获得类的public类型的构造方法。
- getConstrutor(Class[] parameterTypes)：获得类的特定构造方法，parameterTypes参数指定构造方法的参数类型。
- newInstance()：通过类的不带参数的构造方法创建这个类的一个对象。

## Constructor

获得类的构造方法

- Constructor getConstructor(Class[] params) -- 获得使用特殊的参数类型的公共构造函数
- Constructor[] getConstructors() -- 获得类的所有公共构造函数 
- Constructor getDeclaredConstructor(Class[] params) -- 获得使用特定参数类型的构造函数(与接入级别无关) 
- Constructor[] getDeclaredConstructors() -- 获得类的所有构造函数(与接入级别无关) 

## Field

获取类定义变量

- Field getField(String name) -- 获得命名的公共字段 
- Field[] getFields() -- 获得类的所有公共字段 
- Field getDeclaredField(String name) -- 获得类声明的命名的字段 
- Field[] getDeclaredFields() -- 获得类声明的所有字段 

## Method

获取类定义方法

- Method getMethod(String name, Class[] params) -- 使用特定的参数类型，获得命名的公共方法 
- Method[] getMethods() -- 获得类的所有公共方法 
- Method getDeclaredMethod(String name, Class[] params) -- 使用特写的参数类型，获得类声明的命名的方法 
- Method[] getDeclaredMethods() -- 获得类声明的所有方法 


# 四、反射怎么用？

上一章我们讲解了Java反射API，那么这一章我们将用一些代码实例来展示如何使用这些反射API。

## Example 1: 从对象中获取类名

```java
package com.longluo.java.interview.reflection;

public class ReflectionHelloWorld {

	public static void main(String[] args) {
		Foo f = new Foo();
		System.out.println(f.getClass().getName());
	}
}

class Foo {
	public void print() {
		System.out.println("abc");
	}
}
```

输出:

```
com.longluo.java.interview.reflection.Foo
```

## Example 2: 调用未知对象的方法

想象我们不知道一个对象的类型，但是通过反射，我们可以使用这个对象并且找到这个对象是否有个方法名叫`print`并且调用它，如下所示：

```java
package com.longluo.java.interview.reflection;

import java.lang.reflect.Method;

public class ReflectionHelloWorld {

	/*
	 * public static void main(String[] args) { Foo f = new Foo();
	 * System.out.println(f.getClass().getName()); }
	 */

	public static void main(String[] args) {
		Foo f = new Foo();
		Method method;
		try {
			method = f.getClass().getMethod("print", new Class<?>[0]);
			method.invoke(f);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}

class Foo {
	public void print() {
		System.out.println("abc");
	}
}

```

输出：

```
abc
```

## Example 3: 从Class实例创建对象

```java
package com.longluo.java.interview.reflection;

import java.lang.reflect.Method;

public class ReflectionHelloWorld {

	public static void main(String[] args) {
		// create instance of "Class"

		Class<?> c = null;

		try {
			c = Class.forName("com.longluo.java.interview.reflection.Foo");

		} catch (Exception e) {
			e.printStackTrace();
		}

		// create instance of "Foo"
		Foo f = null;
		try {
			f = (Foo) c.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
		f.print();
	}

}

class Foo {
	public void print() {
		System.out.println("abc");
	}
}
```

## Example 4: 获取构造器并创建实例

```java
package com.longluo.java.interview.reflection;

import java.lang.reflect.Constructor;

public class ReflectionHelloWorld4 {

	public static void main(String[] args) {
		// create instance of "Class"

		Class<?> c = null;

		try {
			c = Class.forName("com.longluo.java.interview.reflection.Foo4");
		} catch (Exception e) {
			e.printStackTrace();
		}

		// create instance of "Foo"
		Foo4 f1 = null;
		Foo4 f2 = null;

		// get all constructors
		Constructor<?> cons[] = c.getConstructors();

		try {

			f1 = (Foo4) cons[0].newInstance();
			f2 = (Foo4) cons[1].newInstance("abc");

		} catch (Exception e) {
			e.printStackTrace();

		}

		f1.print();
		f2.print();
	}

}

class Foo4 {
	String s;

	public Foo4() {

	}

	public Foo4(String s) {
		this.s = s;
	}

	public void print() {
		System.out.println(s);
	}
}
```

输出:

```
null
abc
```

另外，你可以使用Class实例并获取实现的接口，父类，声明的方法等。

## Example 5: 通过反射修改数组大小

```java
package com.longluo.java.interview.reflection;

import java.lang.reflect.Array;

public class ReflectionHelloWorld5 {
	public static void main(String[] args) {
		int[] intArray = { 1, 2, 3, 4, 5 };
		int[] newIntArray = (int[]) changeArraySize(intArray, 10);

		print(newIntArray);

		String[] atr = { "a", "b", "c", "d", "e" };
		String[] str1 = (String[]) changeArraySize(atr, 10);
		print(str1);
	}

	// change array size
	public static Object changeArraySize(Object obj, int len) {
		Class<?> arr = obj.getClass().getComponentType();

		Object newArray = Array.newInstance(arr, len);

		// do array copy
		int co = Array.getLength(obj);

		System.arraycopy(obj, 0, newArray, 0, co);

		return newArray;
	}

	// print
	public static void print(Object obj) {
		Class<?> c = obj.getClass();

		if (!c.isArray()) {
			return;
		}

		System.out.println("\nArray length:" + Array.getLength(obj));

		for (int i = 0; i < Array.getLength(obj); i++) {
			System.out.print(Array.get(obj, i) + " ");
		}
	}
}

```

输出:

```
Array length:10
1 2 3 4 5 0 0 0 0 0 
Array length:10
a b c d e null null null null null 
```

# 五、 总结

本文只是对Java反射很小的内容进行了讲解，大家有兴趣了解更多信息可以从网络查找资料。

