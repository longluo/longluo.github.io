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

<!--more-->

# 2. 当遍历容器时，高效等价于移除元素的操作？

最正确的方式就是在遍历容器时用`Iterator.remove()`去修改一个容器，如下代码所示：

```java
Iterator<Integer> itr = list.iterator();
while(itr.hasNext()) {
   // do something
   itr.remove();
}
```

另外一个非常高频的使用但是***不正确***的代码是这样的：

```java
for(Integer i: list) {
  list.remove(i);
}
```

运行上面的代码时你会得到一个`ConcurrentModificationException`。原因是因为一个迭代器自生成之后(在for循环中)，用于横贯这个列表。与此同时，这个列表同时也被`Iterator.remove()`修改了。在Java语言中，当一个线程在修改一个容器时而另外一个线程在遍历它是不允许的。

# 3. 如何将List转换成int[]？

最快捷的方式可能是用Apache Commons Lang库中的***ArrayUtils***。

```java
int[] array = ArrayUtils.toPrimitive(list.toArray(new Integer[0]));
```

在JDK中，没有快捷方式。请注意你不能使用`List.toArray()`，因为那会将列表转换成`Integer[]`。正确的方式应该是这样的：

```java
int[] array = new int[list.size()];
for(int i=0; i < list.size(); i++) {
  array[i] = list.get(i);
}
```

# 4. 如何将int[]转换成List？

最快捷的方式可能是用Apache Commons Lang库中的***ArrayUtils***，如下所示：

```java
List list = Arrays.asList(ArrayUtils.toObject(array));
```

JDK中，同样没有快捷方式：

```java
int[] array = {1,2,3,4,5};
List<Integer> list = new ArrayList<Integer>();
for(int i: array) {
  list.add(i);
}
```

# 5. 过滤一个容器最佳方式是什么？

你可以使用第三方包，比如Guava或者Apache Commons Lang来填充这个功能，他们都提供了一个`filter()`方法(in Collections2 of Guava and in CollectionUtils of Apache)。`filter()`方法会返回一个预先判断的元素。

JDK中，实现就会困难多了。一个好消息是Java 8中，会加入断言。但是现在，你必须使用迭代器用于遍历整个容器。

```java
Iterator<Integer> itr = list.iterator();
while(itr.hasNext()) {
   int i = itr.next();
   if (i > 5) { // filter all ints bigger than 5
      itr.remove();
   }
}
```

当然你也可以模仿Guava或者Apache的实现方式去实现，通过引入一个新的Predicate接口。大部分高级开发者会这样做。

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

你可以使用下面的代码去过滤一个容器：

```java
filter(list, new Predicate<Integer>() {
    public boolean test(Integer i) { 
       return i <= 5; 
    }
});
```

# 6. 什么是将一个列表转换成Set最轻松方式？

有2种方法都可以做到，取决于你如何定义相等。第一种方法是将一个列表放入HashSet中，然后通过`hashCode()`去识别进行复制。在大部分情况下，可以正常运行。但是如果你需要指定一种比较方式的话，当你可以定义你自己的比较器的话你需要使用第二种方法。

```java
Set<Integer> set = new HashSet<Integer>(list);
Set<Integer> set = new TreeSet<Integer>(aComparator);
set.addAll(list);
```

# 7. 如何将ArrayList中重复的元素移除？

这个问题和上一个问题非常有关系。

如果你不关心***ArrayList***中元素的顺序，聪明的方式是将列表放入set中，用于移除重复的元素，然后重新移回list中。代码如下所示：

```java
ArrayList** list = ... // initial a list with duplicate elements
Set<Integer> set = new HashSet<Integer>(list);
list.clear();
list.addAll(set);
```

如果你不关心顺序，在标准JDK中，你可以将列表放入LinkedHashSet中，那样元素顺序不变。﻿

# 8. 容器排序

Java语言中，对容器排序有好几种方法。所有的方法都是基于容器的姿容顺序或者特定的比较器。自然顺序下，你也需要去实现元素的比较接口。

`Collections.sort()`可以遍历列表。javadoc中说明了这种排序是稳定的，同时性能是`nlog(n)`。

*PriorityQueue*提供了一个排好序的队列。*PriorityQueue*和`Collections.sort()`的不同点在于，*PriorityQueue*一直都维持着一个排好序的队列，但是你只能从队列中获取到头结点。你不可以随机获取其内部元素，比如使用`PriorityQueue.get(4)`。

如果在容器中不存在重复，*TreeSet*是另外一个选择。和*PriorityQueue*一样，在生命周期内都维持着排好序的set。你可以从*TreeSet*中获取到最低和最高的元素，但是你仍然不能随机访问其元素。

简单来说， `Collections.sort()`只是一个临时的排好序列表。*PriorityQueue*和*TreeSet*始终是排好序的，但是代价就是不能通过索引访问其元素。


# 9. Collections.emptyList() vs new instance

这个问题同样适用于比较`emptyMap()`和`emptySet()`。

2个方法都会返回一个空的列表，但是 `Collections.emptyList()`返回了一个不变的列表。这意味着你不可以忘`空`的列表中增加新的元素。在此背景下，每次`Collections.emptyList()`调用实际上并不会创造一个空表的实例。同时，它会服用已存在的空的实例。如果你对设计模式的Singleton熟悉的话，你会明白我说的意思。如果你频繁调用的话，会有更好的性能。

# 10. Collections.copy

有2种方法可以实现复制源列表到目的列表。一种方法是使用ArrayList的构造器：

```java
ArrayList<Integer> dstList = new ArrayList<Integer>(srcList);
```

另外一种方法是使用`Collections.copy()`。注意第一行，我们首先分配了一个列表，这个列表最少长度就是目的列表长度。按照javadoc稳定，目的列表最少也是源列表长度。

```java
ArrayList<Integer> dstList = new ArrayList<Integer>(srcList.size());
Collections.copy(dstList, srcList);
```

2种方法都市浅拷贝，那么这2种方法的不同点在哪里？

首先，`Collections.copy()`不会重新分配目的列表的容量，即使目的列表没有足够的空间去容纳全部的源列表。当然，会抛出IndexOutOfBoundsException异常。你可能会问这样做的好处是什么？原因之一就是可以保证方法可以在线性的时间内跑完，同时当你想复用数组而不是重新在ArrayList中分配出一个新列表来的更加合适。

`Collections.copy()`只能用于列表，但是ArrayList的参数可以是容器类，所以应用更广泛。

以上！

