---
layout: post
title: "关于Java Collections应知应会"
comments: true
date: 2016-08-08 18:56:28
tags: [Java, Collection, Basic]
categories: Java
keywords: Java, Collections, 基础知识, 
---



1. Collection vs Collections

First of all, "Collection" and "Collections" are two different concepts. As you will see from the hierarchy diagram below, "Collection" is a root interface in the Collection hierarchy but "Collections" is a class which provide static methods to manipulate on some Collection types.



2. Class hierarchy of Collection

The following diagram demonstrates class hierarchy of Collection.



3. Class hierarchy of Map

Here is class hierarchy of Map.



4. Summary of classes

collection-summary

5. Code Example

The following is a simple example to illustrate some collection types:

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
Output:

ArrayList Elements
	[Program, Creek, Java, Java]
LinkedList Elements
	[Program, Creek, Java, Java]
Set Elements
	[tutorial, Creek, Program, Java]
Map Elements
	{Windows=XP, Website=programcreek.com, Language=Java}
