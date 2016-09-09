---
layout: post
title: "关于Java Collections应知应会"
comments: true
date: 2016-08-07 22:56:28
tags: [Java, Collection, Basic]
categories: Java
keywords: Java, Collections, 基础知识, 
---

***翻译 By Long Luo***

下面这些问题[Stackoverflow](http://www.stackoverflow.com)上关于Java collections提问和讨论最多的问题。在你阅读这些问题之前，有必要先阅读下这篇文章[3分钟速读：图解Java Collections的接口以及类层级关系](http://www.longluo.me/blog/2016/08/08/The-Interface-and-Class-Hierarchy-Diagram-of-Java-Collections/)。

# 1. 什么时候用LinkedList？什么时候用ArrayList？

***ArrayList***本质上是一个数组。它的元素可以直接通过索引值直接访问。但是如果数组已经满了，那么需要重新分配一个更大的数组并且将全部的元素移动到新的数组需要花费***O(n)***的时间。当然从现有的数组中增加或者删除一个元素都需要移动现有的元素。这个可能是使用ArrayList中最大的不便之处。

***LinkedList***是一个**双端链表**。正因为如此，如果要获取一个链表中间的元素，需要从链表的头部开始查找。另一方面，增加或者删除链表中的元素将会很快，因为只需要在本地修改即可。

下表总结了最快情况下的比较需要耗费时间：

 |      Method       | Arraylist | LinkedList |
 |:----------------- | ---------:| :--------: |
 | get(index)        |    O(1)   |   O(n)     |
 | add(E)            |    O(n)   |   O(1)     |
 | add(E, index)     |    O(n)   |   O(n)     |
 | remove(index)     |    O(n)   |   O(n)     |
 | Iterator.remove() |    O(n)   |   O(1)     |
 | Iterator.add(E)   |    O(n)   |   O(1)     |

不管运行时间，当大型列表需要额外考虑内存占用。LinkedList每个node至少需要2个额外的指针用于连接前后2个node。而在ArrayList中只需要数组存储元素值即可。


# 2. Efficient equivalent for removing elements while iterating the Collection

# 2. 

The only correct way to modify a collection while iterating is using Iterator.remove(). For example,

```java
Iterator<Integer> itr = list.iterator();
while(itr.hasNext()) {
   // do something
   itr.remove();
}
```

One most frequent incorrect code is

```java
for(Integer i: list) {
  list.remove(i);
}
```

You will get a ConcurrentModificationException by running the above code. This is because an iterator has been generated (in for statement) to traverse over the list, but at the same time the list is changed by Iterator.remove(). In Java, "it is not generally permissible for one thread to modify a collection while another thread is iterating over it."

# 3. 如何将List转换成int[]？

The easiest way might be using ArrayUtils in Apache Commons Lang library.

```java
int[] array = ArrayUtils.toPrimitive(list.toArray(new Integer[0]));
```

In JDK, there is no short-cut. Note that you can not use List.toArray(), because that will convert List to Integer[]. The correct way is following,

```java
int[] array = new int[list.size()];
for(int i=0; i < list.size(); i++) {
  array[i] = list.get(i);
}
```


# 4. 如何将int[]转换成List？

The easiest way might still be using ArrayUtils in Apache Commons Lang library, like below.

```java
List list = Arrays.asList(ArrayUtils.toObject(array));
```
In JDK, there is no short-cut either.

```java
int[] array = {1,2,3,4,5};
List<Integer> list = new ArrayList<Integer>();
for(int i: array) {
  list.add(i);
}
```

# 5. What is the best way to filter a Collection?

Again, you can use third-party package, like Guava or Apache Commons Lang to fullfil this function. Both provide a filter() method (in Collections2 of Guava and in CollectionUtils of Apache). The filter() method will return elements that match a given Predicate.

In JDK, things become harder. A good news is that in Java 8, Predicate will be added. But for now you have to use Iterator to traverse the whole collection.

```java
Iterator<Integer> itr = list.iterator();
while(itr.hasNext()) {
   int i = itr.next();
   if (i > 5) { // filter all ints bigger than 5
      itr.remove();
   }
}
```

Of course you can mimic the way of what Guava and Apache did, by introducing a new interface Predicate. That might also be what most advanced developers will do.

```java
public interface Predicate<T> {
   boolean test(T o);
}
 
public static <T> void filter(Collection<T> collection, Predicate<T> predicate) {
    if ((collection != null) && (predicate != null)) {
       Iterator<T> itr = collection.iterator();
          while(itr.hasNext()) {
            T obj = itr.next();
            if (!predicate.test(obj)) {
               itr.remove();
            }
        }
    }
}
```

Then we can use the following code to filter a collection:

```java
filter(list, new Predicate<Integer>() {
    public boolean test(Integer i) { 
       return i <= 5; 
    }
});
```

# 6. Easiest way to convert a List to a Set?

There are two ways to do so, depending on how you want equal defined. The first piece of code puts a list into a HashSet. Duplication is then identified mostly by hashCode(). In most cases, it will work. But if you need to specify the way of comparison, it is better to use the second piece of code where you can define your own comparator.

```java
Set<Integer> set = new HashSet<Integer>(list);
Set<Integer> set = new TreeSet<Integer>(aComparator);
set.addAll(list);
```

# 7. How do I remove repeated elements from ArrayList?

This question is quite related to the above one.

If you don't care the ordering of the elements in the ArrayList, a clever way is to put the list into a set to remove duplication, and then to move it back to the list. Here is the code

```java
ArrayList** list = ... // initial a list with duplicate elements
Set<Integer> set = new HashSet<Integer>(list);
list.clear();
list.addAll(set);
```

If you DO care about the ordering, order can be preserved by putting a list into a LinkedHashSet which is in the standard JDK﻿.﻿

# 8. Sorted collection

There are a couple of ways to maintain a sorted collection in Java. All of them provide a collection in natural ordering or by the specified comparator. By natural ordering, you also need to implement the Comparable interface in the elements.

`Collections.sort()` can sort a List. As specified in the javadoc, this sort is stable, and guarantee n log(n) performance.

PriorityQueue provides an ordered queue. The difference between PriorityQueue and Collections.sort() is that, PriorityQueue maintain an order queue at all time, but you can only get the head element from the queue. You can not randomly access its element like PriorityQueue.get(4).
If there is no duplication in the collection, TreeSet is another choice. Same as PriorityQueue, it maintains the ordered set at all time. You can get the lowest and highest elements from the TreeSet. But you still cannot randomly access its element.
In a short, `Collections.sort()` provides a one-time ordered list. PriorityQueue and TreeSet maintain ordered collections at all time, in the cost of no indexed access of elements.

# 9. Collections.emptyList() vs new instance

The same question applies to `emptyMap()` and `emptySet()`.

Both methods return an empty list, but `Collections.emptyList()` returns a list that is immutable. This mean you cannot add new elements to the "empty" list. At the background, each call of `Collections.emptyList()` actually won't create a new instance of an empty list. Instead, it will reuse the existing empty instance. If you are familiar Singleton in the design pattern, you should know what I mean. So this will give you better performance if called frequently.

# 10. Collections.copy

There are two ways to copy a source list to a destination list. One way is to use ArrayList constructor

```java
ArrayList<Integer> dstList = new ArrayList<Integer>(srcList);
```

The other is to use `Collections.copy()` (as below). Note the first line, we allocate a list at least as long as the source list, because in the javadoc of Collections, it says The destination list must be at least as long as the source list.

```java
ArrayList<Integer> dstList = new ArrayList<Integer>(srcList.size());
Collections.copy(dstList, srcList);
```

Both methods are shallow copy. So what is the difference between these two methods?

First, `Collections.copy()` won't reallocate the capacity of dstList even if dstList does not have enough space to contain all srcList elements. Instead, it will throw an IndexOutOfBoundsException. One may question if there is any benefit of it. One reason is that it guarantees the method runs in linear time. Also it makes suitable when you would like to reuse arrays rather than allocate new memory in the constructor of ArrayList.

`Collections.copy()` can only accept List as both source and destination, while ArrayList accepts Collection as the parameter, therefore more general.


