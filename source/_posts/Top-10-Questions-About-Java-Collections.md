---
layout: post
title: "关于Java Collections应知应会"
comments: true
date: 2016-08-07 22:56:28
tags: [Java, Collection, Basic]
categories: Java
keywords: Java, Collections, 基础知识, 
---

The following are the most popular questions of Java collections asked and discussed on Stackoverflow. Before you look at those questions, it's a good idea to see the class hierarchy diagram.

# 1. When to use LinkedList over ArrayList?

ArrayList is essentially an array. Its elements can be accessed directly by index. But if the array is full, a new larger array is needed to allocate and moving all elements to the new array will take O(n) time. Also adding or removing an element needs to move existing elements in an array. This might be the most disadvantage to use ArrayList.

LinkedList is a double linked list. Therefore, to access an element in the middle, it has to search from the beginning of the list. On the other hand, adding and removing an element in LinkedList is quicklier, because it only changes the list locally.

In summary, the worst case of time complexity comparison is as follows:

                   | Arraylist | LinkedList
 ------------------------------------------
 get(index)        |    O(1)   |   O(n)
 add(E)            |    O(n)   |   O(1)
 add(E, index)     |    O(n)   |   O(n)
 remove(index)     |    O(n)   |   O(n)
 Iterator.remove() |    O(n)   |   O(1)
 Iterator.add(E)   |    O(n)   |   O(1)


Despite the running time, memory usage should be considered too especially for large lists. In LinkedList, every node needs at least two extra pointers to link the previous and next nodes; while in ArrayList, only an array of elements is needed.

More comparisons between list.

# 2. Efficient equivalent for removing elements while iterating the Collection

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

# 3. How to convert List to int[]?

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

# 4. How to convert int[] into List?

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


