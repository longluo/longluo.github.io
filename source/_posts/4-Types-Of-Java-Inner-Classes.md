---
layout: post
title: "4 Types Of Java Inner Classes"
comments: true
date: 2016-08-09 11:42:14
tags: [Java, Class]
categories: Java
keywords:
---

There are 4 different types of inner classes you can use in Java. The following
gives their name and examples.
17.1 static nested classes
c l a s s Outer {
s t a t i c c l a s s Inner {
void go ( ) {
System . out . pr int ln ( " Inner c l a s s r e f e r enc e
i s : " + thi s ) ;
}
}
}
public c l a s s Tes t {
public s t a t i c void main ( S t r ing [ ] args ) {
Outer . Inner n = new Outer . Inner ( ) ;
n . go ( ) ;
}
}
Inner c l a s s r e f e r enc e i s : Outer$Inner@19e7ce87
17.2 member inner class
Member class is instance-specific. It has access to all methods, fields, and the
Outer’s this reference.
61
17.3. METHOD-LOCAL INNER CLASSES 62
public c l a s s Outer {
pr ivate int x = 1 0 0 ;
public void makeInner ( ) {
Inner in = new Inner ( ) ;
in . seeOuter ( ) ;
}
c l a s s Inner {
public void seeOuter ( ) {
System . out . pr int ln ( "Outer x i s " + x ) ;
System . out . pr int ln ( " Inner c l a s s r e f e r enc e i s " + thi s )
;
System . out . pr int ln ( "Outer c l a s s r e f e r enc e i s " + Outer
. thi s ) ;
}
}
public s t a t i c void main ( S t r ing [ ] args ) {
Outer o = new Outer ( ) ;
Inner i = o .new Inner ( ) ;
i . seeOuter ( ) ;
}
}
Outer x i s 100
Inner c l a s s r e f e r enc e i s Outer$Inner@4dfd9726
Outer c l a s s r e f e r enc e i s Outer@43ce67ca
17.3 method-local inner classes
public c l a s s Outer {
pr ivate S t r ing x = " outer " ;
public void doStuf f ( ) {
c l a s s MyInner {
public void seeOuter ( ) {
System . out . pr int ln ( " x i s " + x ) ;
}
}
17.4. ANONYMOUS INNER CLASSES 63
MyInner i = new MyInner ( ) ;
i . seeOuter ( ) ;
}
public s t a t i c void main ( S t r ing [ ] args ) {
Outer o = new Outer ( ) ;
o . doStuf f ( ) ;
}
}
x i s outer
public c l a s s Outer {
pr ivate s t a t i c S t r ing x = " s t a t i c outer " ;
public s t a t i c void doStuf f ( ) {
c l a s s MyInner {
public void seeOuter ( ) {
System . out . pr int ln ( " x i s " + x ) ;
}
}
MyInner i = new MyInner ( ) ;
i . seeOuter ( ) ;
}
public s t a t i c void main ( S t r ing [ ] args ) {
Outer . doStuf f ( ) ;
}
}
x i s s t a t i c outer
17.4 anonymous inner classes
This is frequently used when you add an action listener to a widget in a GUI
application.
button . addAct ionLi s tener (new Ac t ionLi s t ene r ( ) {
public void actionPerformed ( ActionEvent e ) {
comp . s e tTe xt ( " Button has been c l i cked " ) ;
}
} ) ;





