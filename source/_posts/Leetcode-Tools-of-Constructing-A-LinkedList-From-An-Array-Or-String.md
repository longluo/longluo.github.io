---
title: '如何根据数组或者字符串创建链表？'
comments: true
date: 2020-12-23 21:51:08
tags: [Leetcode, 链表, 测试, 数组]
categories: Program
keywords: Leetcode, 链表, 测试, 数组, 编程, 字符串, String, LinkedList, Array,
---



***By Long Luo***


在[Leetcode](https://leetcode-cn.com/problemset/all/)做[链表](https://leetcode-cn.com/tag/linked-list/)相关的题时，给出的测试用例总是数组或者字符串形式，比如[61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/)这道题，Testcase如下所示：

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg)

>输入：head = [1,2,3,4,5], k = 2
>输出：[4,5,1,2,3]

# 问题

如果在本地测试代码时，每次测试代码的时候，都需要自己创建测试用例，或者调用leetcode给的例子，都需要手动去创建一个链表的话，但这样效率太低！针对这种情况，写了几个工具函数用来处理链表的代码，可供大家参考。

<!--more-->

# 测试代码

个人测试链表测试代码如下：

```java
public static void main(String[] args) {
    ListNode test1 = LinkedListUtils.constructListNode(new int[]{1, 2, 3, 4, 5});
    System.out.println("[4,5,1,2,3] ?=" + LinkedListUtils.printLinkedList(rotateRight(test1, 2)));

    ListNode test2 = LinkedListUtils.constructListNode(new int[]{0, 1, 2});
    System.out.println("[2,0,1] ?=" + LinkedListUtils.printLinkedList(rotateRight(test2, 4)));
}
```

# 打印链表

Leetcode上链表最后输出形式：

> 输出：[4,5,1,2,3]

打印方法很简单，代码如下所示：

```java
    public static String printLinkedList(ListNode head) {
        if (head == null) {
            return "[]";
        } else if (head.next == null) {
            return "[" + head.val + "]";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        while (head.next != null) {
            sb.append(head.val);
            if (head != null) {
                sb.append(",");
            }
            head = head.next;
        }
        sb.append(head.val).append("]");

        return sb.toString();
    }
```

# 如何创建一个链表?



## 通过int数组创建链表

由一个给定的数组来创建一个链表，这个很简单，只需要遍历输入的数组，然后根据各个元素创建链表的节点的对象，然后把各个对象链接起来即可。

```java
    public static ListNode constructListNode(int[] numbers) {
        if (numbers == null || numbers.length == 0) {
            return null;
        }

        ListNode dummyNode = new ListNode(-1);
        ListNode preNode = dummyNode;
        for (int i = 0; i < numbers.length; i++) {
            ListNode currNode = new ListNode(numbers[i]);
            preNode.next = currNode;
            preNode = preNode.next;
        }

        return dummyNode.next;
    }
```

注意：这里使用了链表操作常用的技巧，**使用一个dummyNode作为链表的起始节点**。这样做的好处是使后面所有节点的操作完全相同，否则链表中的第一个节点的操作要特殊处理，这样可以减少冗余代码，提高效率（不同多次判断是否为头节点），并且即使为空链表，也不需要特殊考虑。

## 通过字符串创建链表

上一小节，我们实现了通过int数组得到了链表的方法，但Leetcode中还有通过字符串来构建链表，而字符串又有多种形式。总结有以下几种方式：

```txt
"1->2->3->4->5->NULL"
"1->2->3->4->5->null "
" 1->2->3->4->5"
"[1, 2, 3, 4 ,5]"
"[1, 2, 3, 4 ,5, NULL]"
"[1, 2, 3, 4 ,5, null]"

注意：
   1. 字符串前后中间可以有空格
   2. NULL为大写或小写均可
```

有了上一节构造链表的方法，我们可以先将字符串处理成整型数组，然后调用`constructListNode(int[] numbers)`来构造链表。

处理思路如下：

1. 去除字符串中全部空格；
2. 如果前后有中括号`[]`，先去除括号，再按照逗号`,`调用`split`进行分割数组；
3. 如果中间有箭头`->`，调用`split`进行分割数组；
4. 遇到最后的`NULL`或者`null`，设置为空。

代码如下所示：

```java
    public static ListNode constructListNode(String str) {
        if (str == null || str.length() == 0) {
            return null;
        }

        String listStr = str.replaceAll(" ", "");
        String[] numbersStrArray;
        if (listStr.charAt(0) == '[' && listStr.charAt(listStr.length() - 1) == ']') {
            listStr = listStr.substring(1, listStr.length() - 1);
            numbersStrArray = listStr.split(",");
        } else if (listStr.contains("->")) {
            numbersStrArray = listStr.split("->");
        } else {
            numbersStrArray = new String[1];
            numbersStrArray[0] = listStr;
        }

        int numLength = 0;
        if (numbersStrArray.length > 1) {
            if (numbersStrArray[numbersStrArray.length - 1].equalsIgnoreCase("null")) {
                numLength = numbersStrArray.length - 1;
            } else {
                numLength = numbersStrArray.length;
            }
        } else {
            numLength = 1;
        }

        int[] numbers = new int[numLength];
        for (int i = 0; i < numLength; i++) {
            numbers[i] = Integer.parseInt(numbersStrArray[i]);
        }

        return constructListNode(numbers);
    }
```

测试代码如下：

```java
    public static void main(String[] args) {
        System.out.println(printLinkedList(constructListNode("1->2->3->4->5->NULL ")));
        System.out.println(printLinkedList(constructListNode(" 1->2->3->4->5")));
        System.out.println(printLinkedList(constructListNode(" 1->2->3->4 ->5 -> null ")));
        System.out.println(printLinkedList(constructListNode("[1, 2, 3, 4 ,5]")));
        System.out.println(printLinkedList(constructListNode("[1, 2, 3, 4 , 5, null]")));
        System.out.println(printLinkedList(constructListNode("[1,  2, 3, 4 , 5, NULL]")));
    }
```

# 小结

上述代码集成在LinkedListUtils类中，包含：

1. `printLinkedList(ListNode head)`，打印一个链表的方法；
2. 两个创建链表的方法： `constructListNode(int[] numbers)`，由整型数组创建；`constructListNode(String str)`，由字符串创建。







