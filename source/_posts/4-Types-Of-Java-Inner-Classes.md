---
layout: post
title: "《SimpleJava》翻译之17: 4种Java内部类"
comments: true
date: 2016-08-09 11:42:14
tags: [Java, Program]
categories: Program
keywords: Java, Class, 类, 内部类, 
---


***翻译 By Long Luo***

There are 4 different types of inner classes you can use in Java. The following gives their name and examples.

Java中有4种不同类型的Java内部类，下面我们将一一用实例

# 1. static nested classes

```java
class Outer {
	static class Inner {
		void go() {
			System.out.println(" Inner class reference is: " + this);
		}
	}
}

public class Test {
	public static void main(String[] args) {
		Outer.Inner n = new Outer.Inner();
		n.go();
	}
}
```
Output: 

```
Inner class reference is: com.longluo.java.interview.innerclass.Outer$Inner@15db9742
```

# 2. member inner class

Member class is instance-specific. It has access to all methods, fields, and the
Outer’s this reference.

```java
public class MemberInnerClass {
	private int x = 100;

	public void makeInner() {
		Inner in = new Inner();
		in.seeOuter();
	}

	class Inner {
		public void seeOuter() {
			System.out.println("MemberInnerClass x is " + x);
			System.out.println("Inner class reference is " + this);
			System.out.println("Outer class reference is "
					+ MemberInnerClass.this);
		}
	}

	public static void main(String[] args) {
		MemberInnerClass o = new MemberInnerClass();
		Inner i = o.new Inner();
		i.seeOuter();
	}
}
```

输出为：

```
MemberInnerClass x is 100
Inner class reference is com.longluo.java.interview.innerclass.MemberInnerClass$Inner@15db9742
Outer class reference is com.longluo.java.interview.innerclass.MemberInnerClass@6d06d69c
```


# 3. method-local inner classes

```java
public class Outer {
	private String x = "outer";

	public void doStuff() {
		class MyInner {
			public void seeOuter() {
				System.out.println(" x is " + x);
			}
		}
		MyInner i = new MyInner();
		i.seeOuter();
	}

	public static void main(String[] args) {
		Outer o = new Outer();
		o.doStuff();
	}
}
```

```
x is outer
```

```java
public class MethodOuter {

	private static String x = "static outer";

	public static void doStuff() {
		class MyInner {
			public void seeOuter() {
				System.out.println(" x is " + x);
			}
		}
		MyInner i = new MyInner();
		i.seeOuter();
	}

	public static void main(String[] args) {
		MethodOuter.doStuff();
	}
}
```


```
x is static outer
```

# 4.anonymous inner classes

This is frequently used when you add an action listener to a widget in a GUI
application.

```java
	button.addActionListener(new ActionListener() {
		@Override
		public void actionPerformed(ActionEvent e) {
			comp.setText("Button has been clicked");
		}
	});
```

