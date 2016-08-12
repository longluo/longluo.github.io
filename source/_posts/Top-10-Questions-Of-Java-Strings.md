---
layout: post
title: "Top 10 Questions Of Java Strings"
comments: true
date: 2016-08-05 09:49:42
tags: [Java, String]
categories: Java
keywords: Java, String, 
---

The following are top 10 frequently asked questions about Java Strings.

# 56.1 how to compare strings? use “==” or use equals()?

In brief, “==” tests if references are equal and equals() tests if values are equal.
Unless you want to check if two strings are the same object, you should always
use equals(). It would be better if you know the concept of string interning.

<!--more-->

# 56.2 why is char[] preferred over string for security sensitive information?

Strings are immutable, which means once they are created, they will stay unchanged
until Garbage Collector kicks in. With an array, you can explicitly change
its elements. In this way, security sensitive information(e.g. password) will not be
present anywhere in the system.

# 56.3 can we use string for switch statement?
Yes to version 7. From JDK 7, we can use string as switch condition. Before version
6, we can not use string as switch condition.
/ / j a v a 7 only !
195

# 56.4. HOW TO CONVERT STRING TO INT? 196
switch ( s t r . toLowerCase ( ) ) {
case " a " :
value = 1 ;
break ;
case "b" :
value = 2 ;
break ;
}

# 56.4 how to convert string to int?
int n = Int ege r . pa r s e Int ( " 10 " ) ;
Simple, but so frequently used and sometimes ignored.
# 56.5 how to split a string with white space characters?
We can simple do split using regular expression. “” stands for white space characters
such as ” “, “’’, “°’’, “”.
S t r ing [ ] s t rAr ray = aSt r ing . s p l i t ( "\\s+" ) ;
#56.6 what substring() method really does?
In JDK 6, the substring() method gives a window to an array of chars which
represents the existing String, but do not create a new one. To create a new
string represented by a new char array, you can do add an empty string like the
following:
s t r . subs t r ing (m, n) + " "
This will create a new char array that represents the new string. The above approach
sometimes can make your code faster, because Garbage Collector can collect
the unused large string and keep only the sub string.
In Oracle JDK 7, substring() creates a new char array, not uses the existing one.
Check out the diagram for showing substring() difference between JDK 6 and JDK
7.
56.7. STRING VS STRINGBUILDER VS STRINGBUFFER 197
# 56.7 string vs stringbuilder vs stringbuffer
String vs StringBuilder: StringBuilder is mutable, which means you can modify
it after its creation. StringBuilder vs StringBuffer: StringBuffer is synchronized,
which means it is thread-safe but slower than StringBuilder.
#56.8 how to repeat a string?
In Python, we can just multiply a number to repeat a string. In Java, we can use
the repeat() method of StringUtils from Apache Commons Lang package.
S t r ing s t r = " abcd " ;
S t r ing repeated = S t r i n gUt i l s . repeat ( s t r , 3 ) ;
/ / a b c d a b c d a b c d
#56.9 how to convert string to date?
S t r ing s t r = " Sep 17 , 2013 " ;
Date date = new SimpleDateFormat ( "MMMM d , yy " , Locale .ENGLISH) .
parse ( s t r ) ;
System . out . pr int ln ( date ) ;
/ / Tue Sep 17 0 0 : 0 0 : 0 0 EDT 2013
#56.10 . how to count # of occurrences of a character in a string?
Use StringUtils from apache commons lang.
int n = S t r i n gUt i l s . countMatches ( " 11112222 " , " 1 " ) ;
System . out . pr int ln (n) ;

#56.11 one more do you know how to detect if a string contains
only uppercase letter?


