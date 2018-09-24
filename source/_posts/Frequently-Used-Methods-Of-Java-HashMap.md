---
layout: post
title: "《SimpleJava》Problems 37th: Frequently Used Methods Of Java HashMap"
comments: true
date: 2016-08-11 15:23:27
tags: [Java, HashMap, FAQ]
categories: Java
keywords: Java, HashMap, FAQ, Map, 
---

HashMap is very useful when a counter is required.

```java
	HashMap<String, Integer> countMap = new HashMap<String , Integer>();
	
	// ... a lot of a’s like the following
	if (countMap.keySet().contains(a)) {
		countMap.put(a, countMap.get(a) + 1);
	} else {
		countMap.put(a, 1);
	}
```

# loop through hashmap

```java
	Iterator it = mp.entrySet().iterator();
	while (it.hasNext()) {
		Map.Entry pairs = (Map.Entry) it.next();
		System.out.println(pairs.getKey() + " = " + pairs.getValue());
	}
	
	Map<Integer, Integer> map = new HashMap<Integer, Integer>();
	for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
		System.out.println("Key = " + entry.getKey() + " , Value = " + entry.getValue());
	}
```


# 2 print hashmap

```java
	public static void printMap(Map mp) {
		Iterator it = mp.entrySet().iterator();
		
		while (it.hasNext()) {
			Map.Entry pairs = (Map.Entry) it.next();
			
			System.out.println(pairs.getKey() + " = " + pairs.getValue());
			it.remove(); // avoids a Concurrent Modification Exception
		}
	}
```

# 3 sort hashmap by value

The following code example take advantage of a constructor of TreeMap here.

```java
	class ValueComparator implements Comparator<String> {
		Map<String, Integer> base;
		
		public ValueComparator(Map<String, Integer> base) {
			this.base = base;
		}
		
		public int compare(String a, String b) {
			if (base.get(a) >= base.get(b)) {
				return -1;
			} else {
				return 1 ;
			} // returning 0 would merge keys
		}
	}
```
	
```java
	HashMap<String, Integer> countMap = new HashMap<String, Integer>();
	
	// add a lot of entries
	countMap.put("a", 10);
	countMap.put("b", 20);
	
	ValueComparator vc = new ValueComparator(countMap);
	
	TreeMap<String, Integer> sortedMap = new TreeMap<String, Integer>(vc);
	sortedMap.putAll(countMap);
	printMap(sortedMap);
```
	

There are different ways of sorting HashMap, this way has been voted the most in stackoverflow
