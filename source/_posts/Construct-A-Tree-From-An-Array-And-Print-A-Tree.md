---
title: '如何根据数组创建二叉树？'
comments: true
date: 2020-12-23 21:51:08 
tags: [Leetcode, 二叉树, 测试, 数组, 字符串]
categories: Program
keywords: Leetcode, Binary Tree, 树, 测试, 编程, 字符串, String, 二叉树,
---


***By Long Luo***

之前的[如何根据数组或者字符串创建链表？](http://www.longluo.me/blog/2020/12/10/Construct-A-LinkedList-From-An-Array-Or-String/)详述了[Leetcode](https://leetcode-cn.com/problemset/all/)中[链表](https://leetcode-cn.com/tag/linked-list/)相关算法题的测试方法。在Leetcode中关于[树](https://leetcode-cn.com/tag/tree/)的算法题中，很多树的题目，测试用例都是一个数组，比如[102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)(https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)中所示：

```txt
给定二叉树: [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7
```

那么问题来了，如何根据数组构造一颗树呢？

为了加快刷题，我们需要一个工具来实现构造树和打印树结构这2个问题。

# 树

树是一种抽象数据类型（ADT）或是实现这种抽象数据类型的数据结构，用来模拟具有树状结构性质的数据集合。它是由 n(n>0)个有限节点组成一个具有层次关系的集合。

![Tree](https://pic.leetcode-cn.com/9471645b117e0fb4c569d1f8ce1e849cc494fa536e161247617484568c7a9f2b-image.png)

如上图所示，把它叫做「树」是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。

树具有以下的特点：

- 每个节点都只有有限个子节点或无子节点；
- 没有父节点的节点称为根节点；
- 每一个非根节点有且只有一个父节点；
- 除了根节点外，每个子节点可以分为多个不相交的子树；
- 树里面没有环路。

当我们完成一棵树的构建之后，虽然我们已经有树的前序、中序和后序遍历这种可以遍历树，但是如果我们如上图一样展示这棵树的结构，如何才能直观地打印出来呢？

<!--more-->

# 如何打印一棵树？

这里我们借用Leetcode中二叉树的数据结构定义：

```java
/**
 * Definition for a binary tree node.
 */
public class TreeNode {
    public int val;

    public TreeNode left;
    public TreeNode right;

    public TreeNode(int x) {
        this.val = x;
    }

    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
```

## 思路

树的展示方式有2种，水平展示和竖直展示。竖直展示比较直观，水平展示更适合用于节点元素大小长短不一致的情况，Linux下展示文件结构就是水平展示。



## 水平树



代码如下所示：

```java
    public static int getTreeDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        return 1 + Math.max(getTreeDepth(root.left), getTreeDepth(root.right));
    }

    private static String traversePreOrder(TreeNode root) {
        if (root == null) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        sb.append(root.val);

        String pointerRight = "└──";
        String pointerLeft;
        if (root.right != null) {
            pointerLeft = "├──";
        } else {
            pointerLeft = "└──";
        }

        traverseNodes(sb, "", pointerLeft, root.left, root.right != null);
        traverseNodes(sb, "", pointerRight, root.right, false);

        return sb.toString();
    }

    private static void traverseNodes(StringBuilder sb, String padding, String pointer, TreeNode node,
                                      boolean hasRightSibling) {
        if (node == null) {
            return;
        }

        sb.append("\n");
        sb.append(padding);
        sb.append(pointer);
        sb.append(node.val);

        StringBuilder paddingBuilder = new StringBuilder(padding);
        if (hasRightSibling) {
            paddingBuilder.append("│  ");
        } else {
            paddingBuilder.append("   ");
        }

        String paddingForBoth = paddingBuilder.toString();
        String pointerRight = "└──";
        String pointerLeft = (node.right != null) ? "├──" : "└──";

        traverseNodes(sb, paddingForBoth, pointerLeft, node.left, node.right != null);
        traverseNodes(sb, paddingForBoth, pointerRight, node.right, false);
    }

    public static void printTreeHorizontal(TreeNode root) {
        System.out.print(traversePreOrder(root));
    }
```

## 垂直树

代码如下所示：

```java
    public static void printTree(TreeNode root) {
        int maxLevel = getTreeDepth(root);
        printNodeInternal(Collections.singletonList(root), 1, maxLevel);
    }

    private static void printNodeInternal(List<TreeNode> nodes, int level, int maxLevel) {
        if (nodes == null || nodes.isEmpty() || isAllElementsNull(nodes)) {
            return;
        }

        int floor = maxLevel - level;
        int endgeLines = (int) Math.pow(2, (Math.max(floor - 1, 0)));
        int firstSpaces = (int) Math.pow(2, (floor)) - 1;
        int betweenSpaces = (int) Math.pow(2, (floor + 1)) - 1;

        printWhitespaces(firstSpaces);

        List<TreeNode> newNodes = new ArrayList<TreeNode>();
        for (TreeNode node : nodes) {
            if (node != null) {
                System.out.print(node.val);
                newNodes.add(node.left);
                newNodes.add(node.right);
            } else {
                newNodes.add(null);
                newNodes.add(null);
                System.out.print(" ");
            }

            printWhitespaces(betweenSpaces);
        }
        System.out.println("");

        for (int i = 1; i <= endgeLines; i++) {
            for (int j = 0; j < nodes.size(); j++) {
                printWhitespaces(firstSpaces - i);
                if (nodes.get(j) == null) {
                    printWhitespaces(endgeLines + endgeLines + i + 1);
                    continue;
                }

                if (nodes.get(j).left != null) {
                    System.out.print("/");
                } else {
                    printWhitespaces(1);
                }

                printWhitespaces(i + i - 1);
                if (nodes.get(j).right != null) {
                    System.out.print("\\");
                } else {
                    printWhitespaces(1);
                }
                printWhitespaces(endgeLines + endgeLines - i);
            }

            System.out.println("");
        }

        printNodeInternal(newNodes, level + 1, maxLevel);
    }

    private static void printWhitespaces(int count) {
        for (int i = 0; i < count; i++) {
            System.out.print(" ");
        }
    }

    private static <T> boolean isAllElementsNull(List<T> list) {
        for (Object object : list) {
            if (object != null) {
                return false;
            }
        }

        return true;
    }
```

# 从数组构建一棵二叉树

代码如下所示：

```java
    public static TreeNode constructTree(Integer[] array) {
        if (array == null || array.length == 0 || array[0] == null) {
            return null;
        }

        int index = 0;
        int length = array.length;

        TreeNode root = new TreeNode(array[0]);
        Deque<TreeNode> nodeQueue = new LinkedList<>();
        nodeQueue.offer(root);
        TreeNode currNode;
        while (index < length) {
            index++;
            if (index >= length) {
                return root;
            }
            currNode = nodeQueue.poll();
            Integer leftChild = array[index];
            if (leftChild != null) {
                currNode.left = new TreeNode(leftChild);
                nodeQueue.offer(currNode.left);
            }
            index++;
            if (index >= length) {
                return root;
            }
            Integer rightChild = array[index];
            if (rightChild != null) {
                currNode.right = new TreeNode(rightChild);
                nodeQueue.offer(currNode.right);
            }
        }

        return root;
    }
```

# 测试

下面就来测试下代码吧：

```java
    public static void main(String[] args) {
        Integer[] tstData1 = {1, null, 2, 2, 32, 31, 3, 23, 1, 23, 123, 12, 3, 12, 31, 23, 2};
        TreeNode tstNode1 = constructTree(tstData1);
        System.out.println("\nTree:");
        printTree(tstNode1);
        System.out.println("\nHorizontal Tree:");
        printTreeHorizontal(tstNode1);
        System.out.println("\nPreOrder:");
        preOrderPrint(tstNode1);

        Integer[] tstData2 = {1, 2, 3, null, 4, 5, 6, 7, null};
        TreeNode tstNode2 = constructTree(tstData2);
        System.out.println("\nTree:");
        printTree(tstNode2);
        System.out.println("\nHorizontal Tree:");
        printTreeHorizontal(tstNode2);
        System.out.println("\nPreOrder:");
        preOrderPrint(tstNode2);
        System.out.println("\nInOrder:");
        inOrderPrint(tstNode2);
        System.out.println("\nPostOrder:");
        postOrderPrint(tstNode2);
    }
```

输出如下所示：

```txt
Tree:
               1                               
                \               
                 \              
                  \             
                   \            
                    \           
                     \          
                      \         
                       \        
                       2               
                      / \       
                     /   \      
                    /     \     
                   /       \    
                   2       32       
                  / \     / \   
                 /   \   /   \  
                 31   3   23   1   
                / \ / \ / \ / \ 
                23 123 12 3 12 31 23 2                                                   
Horizontal Tree:
1
└──2
   ├──2
   │  ├──31
   │  │  ├──23
   │  │  └──123
   │  └──3
   │     ├──12
   │     └──3
   └──32
      ├──23
      │  ├──12
      │  └──31
      └──1
         ├──23
         └──2
PreOrder:
1,2,2,31,23,123,3,12,3,32,23,12,31,1,23,2,

Tree:
       1               
      / \       
     /   \      
    /     \     
   /       \    
   2       3       
    \     / \   
     \   /   \  
     4   5   6   
    /           
    7                                     
Horizontal Tree:
1
├──2
│  └──4
│     └──7
└──3
   ├──5
   └──6
PreOrder:
1,2,4,7,3,5,6,
InOrder:
2,7,4,1,5,3,6,
PostOrder:
7,4,2,5,6,3,1,

```

# 小结

通过上述，我们最终就完成了我们的任务。

