---
layout: post
title: 'What Is Inner Interface In Java?'
comments: true
date: 2016-08-10 11:45:12
tags: [Java, Interface]
categories: Java
keywords: Java, Interface, Inner Interface, 
---


# 1. what is inner interface in java?
Inner interface is also called nested interface, which means declare an interface
inside of another interface. For example, the Entry interface is declared in the
Map interface.

```java
public interface Map {
    interface Entry {
        int getKey();
    }
}

void clear();
```

# 2. why use inner interface?
There are several compelling reasons for using inner interface:
1. It is a way of logically grouping interfaces that are only used in one place.
2. It increases encapsulation.
3. Nested interfaces can lead to more readable and maintainable code.

One example of inner interface used in java standard library is `java.util.Map` and
`Java.util.Map.Entry`. Here `java.util.Map` is used also as a namespace. Entry does
not belong to the global scope, which means there are many other entities that are
64

# 3. HOW INNER INTERFACE WORKS? 65
Entries and are not necessary Map’s entries. This indicates that Entry represents
entries related to the Map.
18.3 how inner interface works?
To figure out how inner interface works, we can compare it with nested classes.
Nested classes can be considered as a regular method declared in outer class.
Since a method can be declared as static or non-static, similarly nested classes can
be static and non-static. Static class is like a static method, it can only access outer
class members through objects. Non-static class can access any member of the
outer class.
18.4. A SIMPLE EXAMPLE OF INNER INTERFACE? 66
Because an interface can not be instantiated, the inner interface only makes sense
if it is static. Therefore, by default inter interface is static, no matter you manually
add static or not.
18.4 a simple example of inner interface?
Map.java
public int e r f a c e Map {
18.4. A SIMPLE EXAMPLE OF INNER INTERFACE? 67
int e r f a c e Entry {
int getKey ( ) ;
}
void c l e a r ( ) ;
}
MapImpl.java
public c l a s s MapImpl implements Map {
c l a s s ImplEntry implements Map. Entry {
public int getKey ( ) {
return 0 ;
}
}
@Override
public void c l e a r ( ) {
/ / c l e a r
}
}






















