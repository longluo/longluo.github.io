---
layout: post
title: "Top 10 Methods For Java Arrays"
comments: true
date: 2016-08-06 22:26:58
tags: [Java, Array]
categories: Java
keywords: Java, Array, 
---

The following are top 10 methods for Java Array. They are the most voted questions
from stackoverflow.

55.1 declare an array
S t r ing [ ] aArray = new S t r ing [ 5 ] ;
S t r ing [ ] bArray = { " a " , "b" , " c " , "d" , " e " } ;
S t r ing [ ] cArray = new S t r ing [ ] { " a " , "b " , " c " , "d" , " e " } ;

<!--more-->

55.2 print an array in java
int [ ] intAr ray = { 1 , 2 , 3 , 4 , 5 } ;
S t r ing intAr r aySt r ing = Arrays . t o S t r ing ( intAr ray ) ;
/ / p r i n t d i r e c t l y wi l l p r i n t r e f e r e n c e v a lu e
System . out . pr int ln ( intAr ray ) ;
/ / [ I@7150bd4d
System . out . pr int ln ( intAr r aySt r ing ) ;
/ / [ 1 , 2 , 3 , 4 , 5]

55.3 create an arraylist from an array
S t r ing [ ] s t r ingAr ray = { " a " , "b" , " c " , "d" , " e " } ;
ArrayList <St r ing > a r r a yLi s t = new ArrayList <St r ing >(Arrays . a sLi s t (
s t r ingAr ray ) ) ;
192

55.4. CHECK IF AN ARRAY CONTAINS A CERTAIN VALUE 193
System . out . pr int ln ( a r r a yLi s t ) ;
/ / [ a , b , c , d , e ]
55.4 check if an array contains a certain value
S t r ing [ ] s t r ingAr ray = { " a " , "b" , " c " , "d" , " e " } ;
boolean b = Arrays . a sLi s t ( s t r ingAr ray ) . contains ( " a " ) ;
System . out . pr int ln ( b ) ;
/ / t r u e

55.5 concatenate two arrays
int [ ] intAr ray = { 1 , 2 , 3 , 4 , 5 } ;
int [ ] intAr ray2 = { 6 , 7 , 8 , 9 , 10 } ;
/ / Apache Commons Lang l i b r a r y
int [ ] combinedIntArray = Ar rayUt i l s . addAll ( intArray , intAr ray2 ) ;

55.6 declare an array inline
method (new S t r ing [ ] { " a " , "b " , " c " , "d" , " e " } ) ;

55.7 joins the elements of the provided array into a single string
/ / c o n t a i n i n g t h e p r o v i d e d l i s t o f e l eme n t s
/ / Apache common l ang
S t r ing j = S t r i n gUt i l s . j o i n (new S t r ing [ ] { " a " , "b" , " c " } , " , " ) ;
System . out . pr int ln ( j ) ;
/ / a , b , c

55.8 covnert an arraylist to an array
S t r ing [ ] s t r ingAr ray = { " a " , "b" , " c " , "d" , " e " } ;
ArrayList <St r ing > a r r a yLi s t = new ArrayList <St r ing >(Arrays . a sLi s t (
s t r ingAr ray ) ) ;
S t r ing [ ] s t r ingAr r = new S t r ing [ a r r a yLi s t . s i z e ( ) ] ;
a r r a yLi s t . toArray ( s t r ingAr r ) ;
for ( S t r ing s : s t r ingAr r )
System . out . pr int ln ( s ) ;
55.9. CONVERT AN ARRAY TO A SET 194

55.9 convert an array to a set
Set <St r ing > s e t = new HashSet<St r ing >(Arrays . a sLi s t ( s t r ingAr ray ) ) ;
System . out . pr int ln ( s e t ) ;
/ / [ d , e , b , c , a ]

55.10 reverse an array
int [ ] intAr ray = { 1 , 2 , 3 , 4 , 5 } ;
Ar rayUt i l s . r eve r s e ( intAr ray ) ;
System . out . pr int ln ( Arrays . t o S t r ing ( intAr ray ) ) ;
/ / [ 5 , 4 , 3 , 2 , 1]

55.11 . remove element of an array
int [ ] intAr ray = { 1 , 2 , 3 , 4 , 5 } ;
int [ ] removed = Ar rayUt i l s . removeElement ( intArray , 3) ; / / c r e a t e a
new a r r a y
System . out . pr int ln ( Arrays . t o S t r ing ( removed ) ) ;

55.12 one more - convert int to byte array

byte [ ] bytes = ByteBuf fer . a l l o c a t e ( 4 ) . put Int ( 8 ) . ar ray ( ) ;
for ( byte t : bytes ) {
System . out . format ( " 0x%x " , t ) ;
}





