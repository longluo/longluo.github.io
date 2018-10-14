---
layout: post
title: "When and how a Java Class is loaded and  HOW A JAVA CLAS S I S LOADED AND INITIALIZED"
comments: true
date: 2016-07-31 19:19:47
tags: [Java, Class, ]
categories: Java
keywords: Java, Class, 加载, 初始化, 
---

In Java, you first write a .java file which is then compiled to .class file during
compile time. Java is capable of loading classes at run time. The confusion is
what is the difference between “load” and “initialize”. When and how is a Java
class loaded and initialized? It can be clearly illustrated by using a simple example
below.

# 3.1 what does it mean by saying “load a class”?

C/C++ is compiled to native machine code first and then it requires a linking step
after compilation. What the linking does is combining source files from different
places and form an executable program. Java does not do that. The linking-like
step for Java is done when they are loaded into JVM.

Different JVMs load classes in different ways, but the basic rule is only loading
classes when they are needed. If there are some other classes that are required by
the loaded class, they will also be loaded. The loading process is recursive.


In Java, loading policies is handled by a ClassLoader. The following example
shows how and when a class is loaded for a simple program.

TestLoader.java
package compiler ;

public c l a s s TestLoader {
public s t a t i c void main ( S t r ing [ ] args ) {
System . out . pr int ln ( " t e s t " ) ;
}
}
A.java
package compiler ;
public c l a s s A {
public void method ( ) {
System . out . pr int ln ( " ins ide of A" ) ;
}
}

Here is the directory hierarchy in eclipse:

By running the following command, we can get information about each class
loaded. The “-verbose:class” option displays information about each class loaded.
java 􀀀verbose : c l a s s 􀀀c l a s spa th /home/ron/workspace/Ul t imateTes t/
bin/ compiler . TestLoader
Part of output:
[ Loaded sun . misc . JavaSecur i tyProtect ionDomainAcces s from /usr/
l o c a l/java/jdk1 . 6 . 0 _34/ j r e / l i b / r t . j a r ]
[ Loaded java . s e cur i t y . ProtectionDomain$2 from /usr/l o c a l /java/jdk1
. 6 . 0 _34/ j r e / l i b / r t . j a r ]
[ Loaded java . s e cur i t y . ProtectionDomain$Key from /usr/ l o c a l /java/
jdk1 . 6 . 0 _34/ j r e / l i b / r t . j a r ]
[ Loaded java . s e cur i t y . Pr inc ipa l from /usr/l o c a l /java/jdk1 . 6 . 0 _34/
j r e / l i b / r t . j a r ]
[ Loaded compiler . TestLoader from f i l e :/home/xiwang/workspace/
Ul t imateTes t/bin /]
t e s t
[ Loaded java . lang . Shutdown from /usr/l o c a l /java/jdk1 . 6 . 0 _34/ j r e /
l i b / r t . j a r ]
[ Loaded java . lang . Shutdown$Lock from /usr/l o c a l /java/jdk1 . 6 . 0 _34/
j r e / l i b / r t . j a r ]
Now If we change TestLoader.java to:

package compiler ;
public c l a s s TestLoader {
public s t a t i c void main ( S t r ing [ ] args ) {
System . out . pr int ln ( " t e s t " ) ;
A a = new A( ) ;
a .method ( ) ;
}
}
And run the same command again, the output would be:
[ Loaded sun . misc . JavaSecur i tyProtect ionDomainAcces s from /usr/
l o c a l/java/jdk1 . 6 . 0 _34/ j r e / l i b / r t . j a r ]
[ Loaded java . s e cur i t y . ProtectionDomain$2 from /usr/l o c a l /java/jdk1
. 6 . 0 _34/ j r e / l i b / r t . j a r ]
[ Loaded java . s e cur i t y . ProtectionDomain$Key from /usr/ l o c a l /java/
jdk1 . 6 . 0 _34/ j r e / l i b / r t . j a r ]
[ Loaded java . s e cur i t y . Pr inc ipa l from /usr/l o c a l /java/jdk1 . 6 . 0 _34/
j r e / l i b / r t . j a r ]
[ Loaded compiler . TestLoader from f i l e :/home/xiwang/workspace/
Ul t imateTes t/bin /]
t e s t
[ Loaded compiler .A from f i l e :/home/xiwang/workspace/Ul t imateTes t/
bin /]
ins ide of A
[ Loaded java . lang . Shutdown from /usr/l o c a l /java/jdk1 . 6 . 0 _34/ j r e /
l i b / r t . j a r ]
[ Loaded java . lang . Shutdown$Lock from /usr/l o c a l /java/jdk1 . 6 . 0 _34/
j r e / l i b / r t . j a r ]
We can see the difference highlighted in red. A.class is loaded only when it is
used. In summary, a class is loaded:
  when the new bytecode is executed. For example, SomeClass f = new Some-
Class();
  when the bytecodes make a static reference to a class. For example, System.
out.

3.3 when and how is a java class initialized?

A class is initialized when a symbol in the class is first used. When a class is
loaded it is not initialized.

JVM will initialize superclass and fields in textual order, initialize static, final fields
first, and give every field a default value before initialization.
Java Class Instance Initialization is an example that shows the order of execution
for field, static field and constructor.
