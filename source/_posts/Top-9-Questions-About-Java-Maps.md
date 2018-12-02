---
layout: post
title: "Top 9 Questions About Java Maps"
comments: true
date: 2016-08-08 11:18:22
tags: [Java, Map]
categories: Java
keywords: Java, Map, 
---

In general, Map is a data structure consisting of a set of key-value pairs, and each
key can only appears once in the map. This post summarizes Top 9 FAQ of how
to use Java Map and its implemented classes. For sake of simplicity, I will use
generics in examples. Therefore, I will just write Map instead of specific Map. But
you can always assume that both the K and V are comparable, which means K
extends Comparable and V extends Comparable.

# 1. convert a map to list

In Java, Map interface provides three collection views: key set, value set, and keyvalue set. All of them can be converted to List by using a constructor or addAll()
method. The following snippet of code shows how to construct an ArrayList from a map.

```java
// key list
List keyList = new ArrayList(map.keySet());
// value list
List valueList = new ArrayList(map.valueSet());
// key value list
List entryList = new ArrayList(map.entrySet());
```

# 2. iterate over each entry in a map

Iterating over every pair of key-value is the most basic operation to traverse a map. In Java, such pair is stored in the map entry called Map.Entry. 

# 3. SORT A MAP ON THE KEYS 

Map.entrySet() returns a key-value set, therefore the most efficient way of going through every entry of a map is 

```java
for (Entry entry:map.entrySet()) {
    // get key
    K key = entry.getKey();
    // get value
    V value = entry.getValue();
}
```

Iterator can also be used, especially before JDK 1.5

```java
Iterator itr = map.entrySet().iterator();
while(itr.hasNext ( ) ) {
Entry ent ry = i t r . next ( ) ;
/ / g e t k ey
K key = ent ry . getKey ( ) ;
/ / g e t v a l u e
V value = ent ry . getValue ( ) ;
}
60.3 sort a map on the keys
Sorting a map on the keys is another frequent operation. One way is to put
Map.Entry into a list, and sort it using a comparator that sorts the value.
Li s t l i s t = new Ar rayLi s t (map. ent rySe t ( ) ) ;
Co l l e c t i ons . s o r t ( l i s t , new Comparator ( ) {
@Override
public int compare ( Entry e1 , Entry e2 ) {
return e1 . getKey ( ) . compareTo ( e2 . getKey ( ) ) ;
}
} ) ;
The other way is to use SortedMap, which further provides a total ordering on its
keys. Therefore all keys must either implement Comparable or be accepted by the
comparator.
60.4. SORT A MAP ON THE VALUES 216
One implementing class of SortedMap is TreeMap. Its constructor can accept a
comparator. The following code shows how to transform a general map to a
sorted map.
SortedMap sortedMap = new TreeMap (new Comparator ( ) {
@Override
public int compare (K k1 , K k2 ) {
return k1 . compareTo ( k2 ) ;
}
} ) ;
sortedMap . putAll (map) ;
60.4 sort a map on the values
Putting the map into a list and sorting it works on this case too, but we need
to compare Entry.getValue() this time. The code below is almost same as before.
Li s t l i s t = new Ar rayLi s t (map. ent rySe t ( ) ) ;
Co l l e c t i ons . s o r t ( l i s t , new Comparator ( ) {
@Override
public int compare ( Entry e1 , Entry e2 ) {
return e1 . getValue ( ) . compareTo ( e2 . getValue ( ) ) ;
}
} ) ;
We can still use a sorted map for this question, but only if the values are unique too.
Under such condition, you can reverse the key=value pair to value=key. This solution
has very strong limitation therefore is not really recommended by me.
60.5 initialize a static/immutable map
When you expect a map to remain constant, it’s a good practice to copy it into
an immutable map. Such defensive programming techniques will help you create
not only safe for use but also safe for thread maps.
60.6. DIFFERENCE BETWEEN HASHMAP, TREEMAP, AND HASHTABLE 217
To initialize a static/immutable map, we can use a static initializer (like below).
The problem of this code is that, although map is declared as static final, we can
still operate it after initialization, like Test.map.put(3,"three");. Therefore it is not
really immutable. To create an immutable map using a static initializer, we need
an extra anonymous class and copy it into a unmodifiable map at the last step of
initialization. Please see the second piece of code. Then, an UnsupportedOperationException
will be thrown if you run Test.map.put(3,"three");.
public c l a s s Tes t {
pr ivate s t a t i c f ina l Map map;
s t a t i c {
map = new HashMap ( ) ;
map. put ( 1 , " one " ) ;
map. put ( 2 , " two " ) ;
}
}
public c l a s s Tes t {
pr ivate s t a t i c f ina l Map map;
s t a t i c {
Map aMap = new HashMap ( ) ;
aMap. put ( 1 , " one " ) ;
aMap. put ( 2 , " two " ) ;
map = Co l l e c t i ons . unmodifiableMap (aMap) ;
}
}
Guava libraries also support different ways of intilizaing a static and immutable
collection. To learn more about the benefits of Guava’s immutable collection utilities,
see Immutable Collections Explained in Guava User Guide.
60.6 difference between hashmap, treemap, and hashtable
There are three main implementations of Map interface in Java: HashMap, TreeMap,
and Hashtable. The most important differences include:
 The order of iteration. HashMap and HashTable make no guarantees as to
the order of the map; in particular, they do not guarantee that the order
60.7. A MAP WITH REVERSE VIEW/LOOKUP 218
will remain constant over time. But TreeMap will iterate the whole entries
according the “natural ordering” of the keys or by a comparator.
 key-value permission. HashMap allows null key and null values. HashTable
does not allow null key or null values. If TreeMap uses natural ordering or
its comparator does not allow null keys, an exception will be thrown.
 Synchronized. Only HashTable is synchronized, others are not. Therefore,
“if a thread-safe implementation is not needed, it is recommended to use
HashMap in place of HashTable.”
A more complete comparison is
| HashMap | HashTable | TreeMap
i t e r a t i o n order | no | no | yes
null key value | yes yes | yes yes | no yes
synchronized | no | yes | no
time performance | O( 1 ) | O( 1 ) | O( log n)
implementation | buckets | buckets | red black t r e e
Read more about HashMap vs. TreeMap vs. Hashtable vs. LinkedHashMap.
60.7 a map with reverse view/lookup
Sometimes, we need a set of key-key pairs, which means the map’s values are
unique as well as keys (one-to-one map). This constraint enables to create an
“inverse lookup/view” of a map. So we can lookup a key by its value. Such
data structure is called bidirectional map, which unfortunetely is not supported
by JDK.
60.8 both apache common collections and guava provide implementation
of bidirectional map, called bidimap and bimap,
respectively. both enforce the restriction that there is a
1:1 relation between keys and values. 7. shallow copy of a
map
Most implementation of a map in java, if not all, provides a constructor of copy
of another map. But the copy procedure is not synchronized. That means when
60.9. FOR THIS REASON, I WILL NOT EVEN TELL YOU HOW TO USE CLONE() METHOD TO COPY one thread copies a map, another one may modify it structurally. To [prevent
accidental unsynchronized copy, one should use Collections.synchronizedMap()
in advance.
Map copiedMap = Co l l e c t i ons . synchronizedMap (map) ;
Another interesting way of shallow copy is by using clone() method. However it is
NOT even recommended by the designer of Java collection framework, Josh Bloch.
In a conversation about “Copy constructor versus cloning“, he said
I often provide a public clone method on concrete classes because people expect it.
â˘A ˛e It’s a shame that Cloneable is broken, but it happens. â˘A˛e Cloneable is a weak
spot, and I think people should be aware of its limitations.
60.9 for this reason, i will not even tell you how to use clone()
method to copy a map. 8. create an empty map
If the map is immutable, use
map = Co l l e c t i ons . emptyMap ( ) ;
Otherwise, use whichever implementation. For example
map = new HashMap ( ) ;
THE




