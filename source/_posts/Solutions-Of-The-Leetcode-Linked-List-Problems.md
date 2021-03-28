---
title: '如何求解Leetcode中链表(LinkedList)问题？'
date: 2021-01-20 21:18:27
comments: true
tags: [Leetcode, LinkedList, Program]
categories: Data Structures and Algorithms
keywords:  Leetcode, LinkedList, Data Structures, Algorithms, 链表, Java, 编程, 算法, 
---

***By Long Luo***

# 链表(LinkedList)的数据结构



## 链表大小


# 链表的遍历


# 链表





## 61. 旋转链表



https://leetcode-cn.com/problems/rotate-list/



解题思路：





 代码：

```java
public class Problem61_rotateLinkedList {

    public static ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }

        ListNode curr = head;
        int n = 1;
        while (curr.next != null) {
            n++;
            curr = curr.next;
        }
        int step = n - k % n;
        if (step == n) {
            return head;
        }
        curr.next = head;
        while (step-- > 0) {
            curr = curr.next;
        }
        ListNode ans = curr.next;
        curr.next = null;
        return ans;
    }

    public static void main(String[] args) {
        ListNode test1 = Utils.makeListNode(new int[]{1, 2, 3, 4, 5});
        System.out.println("[4,5,1,2,3] ?=" + Utils.printLinkedList(rotateRight(test1, 2)));

        ListNode test2 = Utils.makeListNode(new int[]{0, 1, 2});
        System.out.println("[2,0,1] ?=" + Utils.printLinkedList(rotateRight(test2, 4)));

        ListNode test3 = Utils.makeListNode(new int[]{1, 2});
        System.out.println("[2,1] ?=" + Utils.printLinkedList(rotateRight(test3, 1)));

        ListNode test4 = Utils.makeListNode(new int[]{1, 2, 3});
        System.out.println("[2,3,1] ?=" + Utils.printLinkedList(rotateRight(test4, 2000000000)));

        ListNode test5 = Utils.makeListNode(new int[]{1, 2});
        System.out.println("[1,2] ?=" + Utils.printLinkedList(rotateRight(test5, 2)));
    }
}
```

