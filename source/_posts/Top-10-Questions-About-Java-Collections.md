---
layout: post
title: "关于Java Collections应知应会"
comments: true
date: 2016-08-07 22:56:28
tags: [Java, Collection, Basic]
categories: Java
keywords: Java, Collections, 基础知识, 
---

The following are the most popular questions of Java collections asked and discussedon Stackoverflow. Before you look at those questions, it’s a good idea to
see the class hierarchy diagram.

<!--more-->

# 59.1 when to use linkedlist over arraylist?

ArrayList is essentially an array. Its elements can be accessed directly by index.
But if the array is full, a new larger array is needed to allocate and moving all elements to the new array will take O(n) time. Also adding or removing an element
needs to move existing elements in an array. This might be the most disadvantage
to use ArrayList.

LinkedList is a double linked list. Therefore, to access an element in the middle,
it has to search from the beginning of the list. On the other hand, adding and
removing an element in LinkedList is quicklier, because it only changes the list
locally.

In summary, the worst case of time complexity comparison is as follows:




| Ar r a y l i s t | LinkedLi s t

get ( index ) | O( 1 ) | O(n)
add (E) | O(n) | O( 1 )
add (E , index ) | O(n) | O(n)
remove ( index ) | O(n) | O(n)
I t e r a t o r . remove ( ) | O(n) | O( 1 )
I t e r a t o r . add (E) | O(n) | O( 1 )
208
59.2. EFFICIENT EQUIVALENT FOR REMOVING ELEMENTS WHILE ITERATING THE COLLECTION Despite the running time, memory usage should be considered too especially for
large lists. In LinkedList, every node needs at least two extra pointers to link
the previous and next nodes; while in ArrayList, only an array of elements is
needed.
More comparisons between list.
59.2 efficient equivalent for removing elements while iterating
the collection
The only correct way to modify a collection while iterating is using Iterator.remove()().
For example,
I t e r a t o r <Integer > i t r = l i s t . i t e r a t o r ( ) ;
while ( i t r . hasNext ( ) ) {
/ / do s ome thing
i t r . remove ( ) ;
}
One most frequent incorrect code is
for ( Int ege r i : l i s t ) {
l i s t . remove ( i ) ;
}
You will get a ConcurrentModificationException by running the above code. This
is because an iterator has been generated (in for statement) to traverse over the
list, but at the same time the list is changed by Iterator.remove(). In Java, “it is not
generally permissible for one thread to modify a collection while another thread
is iterating over it.”
59.3 how to convert list to int[]?
The easiest way might be using ArrayUtils in Apache Commons Lang library.
int [ ] ar ray = Ar rayUt i l s . toPr imi t ive ( l i s t . toArray (new Int ege r [ 0 ] ) )
;
In JDK, there is no short-cut. Note that you can not use List.toArray(), because
that will convert List to Integer[]. The correct way is following,
59.4. HOW TO CONVERT INT[] INTO LIST? 210
int [ ] ar ray = new int [ l i s t . s i z e ( ) ] ;
for ( int i =0; i < l i s t . s i z e ( ) ; i ++) {
ar ray [ i ] = l i s t . get ( i ) ;
}
59.4 how to convert int[] into list?
The easiest way might still be using ArrayUtils in Apache Commons Lang library,
like below.
Li s t l i s t = Arrays . a sLi s t ( Ar rayUt i l s . toObj e c t ( ar ray ) ) ;
In JDK, there is no short-cut either.
int [ ] ar ray = { 1 , 2 , 3 , 4 , 5 } ;
Li s t <Integer > l i s t = new ArrayList <Integer >( ) ;
for ( int i : ar ray ) {
l i s t . add ( i ) ;
}
59.5 what is the best way to filter a collection?
Again, you can use third-party package, like Guava or Apache Commons Lang to
fullfil this function. Both provide a filter() method (in Collections2 of Guava and
in CollectionUtils of Apache). The filter() method will return elements that match
a given Predicate.
In JDK, things become harder. A good news is that in Java 8, Predicate will be
added. But for now you have to use Iterator to traverse the whole collection.
I t e r a t o r <Integer > i t r = l i s t . i t e r a t o r ( ) ;
while ( i t r . hasNext ( ) ) {
int i = i t r . next ( ) ;
i f ( i > 5) { / / f i l t e r a l l i n t s b i g g e r than 5
i t r . remove ( ) ;
}
}
59.6. EASIEST WAY TO CONVERT A LIST TO A SET? 211
Of course you can mimic the way of what Guava and Apache did, by introducing
a new interface Predicate. That might also be what most advanced developers will
do.
public int e r f a c e Predi cate <T> {
boolean t e s t (T o ) ;
}
public s t a t i c <T> void f i l t e r ( Col l e c t ion <T> c o l l e c t i o n , Predi cate <
T> pr edi c a t e ) {
i f ( ( c o l l e c t i o n != null ) && ( pr edi c a t e != null ) ) {
I t e r a t o r <T> i t r = c o l l e c t i o n . i t e r a t o r ( ) ;
while ( i t r . hasNext ( ) ) {
T obj = i t r . next ( ) ;
i f ( ! pr edi c a t e . t e s t ( obj ) ) {
i t r . remove ( ) ;
}
}
}
}
Then we can use the following code to filter a collection:
f i l t e r ( l i s t , new Predi cate <Integer >( ) {
public boolean t e s t ( Int ege r i ) {
return i <= 5 ;
}
} ) ;
59.6 easiest way to convert a list to a set?
There are two ways to do so, depending on how you want equal defined. The
first piece of code puts a list into a HashSet. Duplication is then identified mostly
by hashCode(). In most cases, it will work. But if you need to specify the way of
comparison, it is better to use the second piece of code where you can define your
own comparator.
Set <Integer > s e t = new HashSet<Integer >( l i s t ) ;
Set <Integer > s e t = new TreeSet <Integer >( aComparator ) ;
s e t . addAll ( l i s t ) ;
59.7. HOW DO I REMOVE REPEATED ELEMENTS FROM ARRAYLIST? 212
59.7 how do i remove repeated elements from arraylist?
This question is quite related to the above one. If you don’t care the ordering of
the elements in the ArrayList, a clever way is to put the list into a set to remove
duplication, and then to move it back to the list. Here is the code
Ar rayLi s t  l i s t = . . . / / i n i t i a l a l i s t wi th d u p l i c a t e e l eme n t s
Set <Integer > s e t = new HashSet<Integer >( l i s t ) ;
l i s t . c l e a r ( ) ;
l i s t . addAll ( s e t ) ;
If you DO care about the ordering, there is no short-cut way. Two loops are needed
at least.
59.8 sorted collection
There are a couple of ways to maintain a sorted collection in Java. All of them
provide a collection in natural ordering or by the specified comparator. By natural
ordering, you also need to implement the Comparable interface in the elements.
 Collections.sort() can sort a List. As specified in the javadoc, this sort is
stable, and guarantee n log(n) performance.
 PriorityQueue provides an ordered queue. The difference between PriorityQueue
and Collections.sort() is that, PriorityQueue maintain an order
queue at all time, but you can only get the head element from the queue.
You can not randomly access its element like PriorityQueue.get(4).
 If there is no duplication in the collection, TreeSet is another choice. Same
as PriorityQueue, it maintains the ordered set at all time. You can get the
lowest and highest elements from the TreeSet. But you still cannot randomly
access its element.
In a short, Collections.sort() provides a one-time ordered list. PriorityQueue and
TreeSet maintain ordered collections at all time, in the cost of no indexed access
of elements.
59.9. COLLECTIONS.EMPTYLIST() VS NEW INSTANCE 213
59.9 collections.emptylist() vs new instance
The same question applies to emptyMap() and emptySet().
Both methods return an empty list, but Collections.emptyList() returns a list that
is immutable. This mean you cannot add new elements to the “empty” list. At
the background, each call of Collections.emptyList() actually won’t create a new
instance of an empty list. Instead, it will reuse the existing empty instance. If you
are familiar Singleton in the design pattern, you should know what I mean. So
this will give you better performance if called frequently.
59.10 collections.copy
There are two ways to copy a source list to a destination list. One way is to use
ArrayList constructor
ArrayList <Integer > ds tLi s t = new ArrayList <Integer >( s r c L i s t ) ;
The other is to use Collections.copy() (as below). Note the first line, we allocate a
list at least as long as the source list, because in the javadoc of Collections, it says
The destination list must be at least as long as the source list.
ArrayList <Integer > ds tLi s t = new ArrayList <Integer >( s r c L i s t . s i z e ( )
) ;
Co l l e c t i ons . copy ( ds tLi s t , s r c L i s t ) ;
Both methods are shallow copy. So what is the difference between these two
methods?
 First, Collections.copy() won’t reallocate the capacity of dstList even if dstList
does not have enough space to contain all srcList elements. Instead, it will
throw an IndexOutOfBoundsException. One may question if there is any
benefit of it. One reason is that it guarantees the method runs in linear time.
Also it makes suitable when you would like to reuse arrays rather than allocate
new memory in the constructor of ArrayList.
 Collections.copy() can only accept List as both source and destination, while
ArrayList accepts Collection as the parameter, therefore more general.





