---
layout: post
title: "《SimpleJava》之43: Java反射教程"
comments: true
date: 2016-08-09 22:26:08
tags: [Java, 反射, 教程]
categories: Java
keywords: Java, Reflection, 反射, 
---


What is reflection, why is it useful, and how to use it?

# 1. what is reflection?

“Reflection is commonly used by programs which require the ability to examine or
modify the runtime behavior of applications running in the Java virtual machine.”
This concept is often mixed with introspection. The following are their definitions
from Wiki:

1. Introspection is the ability of a program to examine the type or properties of
an object at runtime.
2. Reflection is the ability of a program to examine and modify the structure
and behavior of an object at runtime.

From their definitions, introspection is a subset of reflection. Some languages
support introspection, but do not support reflection, e.g., C++.

# 2. WHY DO WE NEED REFLECTION? 

Introspection Example: The instanceof operator determines whether an object belongs to a particular class.

i f ( obj ins tanceof Dog) {
Dog d = (Dog) obj ;
d . bark ( ) ;
}

Reflection Example: The `Class.forName()` method returns the Class object associated
with the class/interface with the given name(a string and full qualified name).
The forName method causes the class with the name to be initialized.

/ / wi th r e f l e c t i o n
Class <?> c = Clas s . forName ( " c l a s spa th . and . classname " ) ;
Object dog = c . newInstance ( ) ;
Method m = c . getDeclaredMethod ( " bark " , new Class <? >[0] ) ;
m. invoke ( dog ) ;

In Java, reflection is more about introspection, because you can not change structure
of an object. There are some APIs to change accessibilities of methods and
fields, but not structures.

Reflection enables us to:

1. Examine an object’s class at runtime
2. Construct an object for a class at runtime
3. Examine a class’s field and method at runtime
4. Invoke any method of an object at runtime
5. Change accessibility flag of Constructor, Method and Field etc.

Reflection is the common approach of famework.

For example, JUnit use reflection to look through methods tagged with the @Test
annotation, and then call those methods when running the unit test. (Here is a set
of examples of how to use JUnit.)

For web frameworks, product developers define their own implementation of interfaces
and classes and put is in the configuration files. Using reflection, it can
quickly dynamically initialize the classes required.

For example, Spring uses bean configuration such as:

<bean id=" someID" c l a s s="com. programcreek . Foo ">
<property name=" someField " value=" someValue " />
</bean>

When the Spring context processes this <bean >element, it will use Class.forName(String)
with the argument “com.programcreek.Foo” to instantiate that Class. It will then
again use reflection to get the appropriate setter for the <property >element and
set its value to the specified value.

The same mechanism is also used for Servlet web applications:

<s e rvl e t >
<s e rvl e t􀀀name>someServlet </s e rvl e t􀀀name>
<s e rvl e t􀀀c las s >com. programcreek . WhyRef lect ionServlet </s e rvl e t􀀀
c las s >
<s e rvl e t >

# 3. how to use reflection?

How to use reflection API can be shown by using a small set of typical code examples.

## Example 1: Get class name from object

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

Output:

```
com.longluo.java.interview.reflection.Foo
```
	

## Example 2: Invoke method on unknown object

For the code example below, image the types of an object is unknown. By using
reflection, the code can use the object and find out if the object has a method called
“print” and then call it.

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


abc

## Example 3: Create object from Class instance

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



## Example 4: Get constructor and create instance

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

Output:

```
null
abc
```

In addition, you can use Class instance to get implemented interfaces, super class,
declared field, etc.

## Example 5: Change array size though reflection

```java



```


Output:

```

```


# 4. summary

The above code examples shows a very small set of functions provided by Java
reflection. Reading those examples may only give you a taste of Java reflection,
you may want to Read more information on Oracle website.

