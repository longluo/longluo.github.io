---
layout: post
title: "Google多线程面试题: 4个线程向4个文件里写入数据, 每个线程只能写一个值"
date: 2015-04-09 21:04:10 +0800
comments: true
categories: Data Structures and Algorithms
tags: [Algorithm, 多线程, 面试]
keywords: 算法, 多线程, 互斥, 线程通信, 面试, interview, Algorithm, Google面试题,
---


***By Long Luo***

最近在学习`Java多线程`时，遇到了一个下面的笔试题，题目如下： 

	编写一个程序，程序会启动4个线程，向4个文件A，B，C，D里写入数据，每个线程只能写一个值。 
		线程A：只写A
    	线程B：只写B 
    	线程C：只写C 
    	线程D：只写D 
   
	4个文件A，B，C，D。 
	
	程序运行起来，4个文件的写入结果如下： 
		A：ABCDABCD... 
    	B：BCDABCDA... 
    	C：CDABCDAB... 
    	D：DABCDABC... 

网上搜索了下，好像还是一个***Google笔试题***，这个问题涉及到的知识点有：`多线程`, `并发`, `锁`, `线程间通信`。

# 个人分析过程：

	1. 创建4个线程；
	2. 每个线程在输出时都需要加锁；
	3. 操作文件的代码要加锁；
	4. 一个线程完成之后，通知下一个要执行的线程；
	
<!--more-->

根据以上分析，可以写出如下代码：

```java
    package com.imlongluo.Practise;
    
    import java.io.BufferedWriter;
    import java.io.File;
    import java.io.FileOutputStream;
    import java.io.OutputStreamWriter;
    import java.util.concurrent.locks.Condition;
    import java.util.concurrent.locks.Lock;
    import java.util.concurrent.locks.ReentrantLock;
    
    public class Practise {
    
        public static void main(String[] args) {
    
            final Task task = new Task();
            
            /** 创建4个线程，同时启动 */
            /**
             * Thread A
             */
            new Thread(new Runnable() {
    
                @Override
                public void run() {
                    for (int i = 0; i < 10; i++) {
                        task.outputA();
                    }
                }
            }, " Thread A").start();
    
            /**
             * Thread B
             */
            new Thread(new Runnable() {
    
                @Override
                public void run() {
                    for (int i = 0; i < 10; i++) {
                        task.outputB();
                    }
                }
            }, "Thread B").start();
    
            /**
             * Thread C
             */
            new Thread(new Runnable() {
    
                @Override
                public void run() {
                    for (int i = 0; i < 10; i++) {
                        task.outputC();
                    }
                }
            }, "Thread C").start();
    
            /**
             * Thread D
             */
            new Thread(new Runnable() {
    
                @Override
                public void run() {
                    for (int i = 0; i < 10; i++) {
                        task.outputD();
                    }
                }
            }, "Thread D").start();
        }
    
        /**
        任务类
        */
        public static class Task {
            /**
            创建一个Lock锁对象
            */
            private Lock lock = new ReentrantLock();
    
            private BufferedWriter bw1 = null;
            private BufferedWriter bw2 = null;
            private BufferedWriter bw3 = null;
            private BufferedWriter bw4 = null;
    
            private int ctl = 0;
    
            /**
             * Condition: 线程条件  
             */
            private Condition cond1 = lock.newCondition();
            private Condition cond2 = lock.newCondition();
            private Condition cond3 = lock.newCondition();
            private Condition cond4 = lock.newCondition();
    
            private boolean[] outputThisRound = { false, true, true, true };
    
            public Task() {
                try {
                    bw1 = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(
                            "/Users/luolong/Code/Android/workspace/MultiThreads/A.txt"))));
                    bw2 = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(
                            "/Users/luolong/Code/Android/workspace/MultiThreads/B.txt"))));
                    bw3 = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(
                            "/Users/luolong/Code/Android/workspace/MultiThreads/C.txt"))));
                    bw4 = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(
                            "/Users/luolong/Code/Android/workspace/MultiThreads/D.txt"))));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
    
            public void outputA() {
    
                lock.lock();
    
                try {
                    while (outputThisRound[0]) {
                        System.out.println("outputA begin to await!");
                        cond1.await(); //阻塞A线程 
                    }
    
                    if (ctl % 4 == 0) {
                        bw1.write("A");
                        bw1.flush();
                    } else if (ctl % 4 == 1) {
                        bw4.write("A");
                        bw4.flush();
                    } else if (ctl % 4 == 2) {
                        bw3.write("A");
                        bw3.flush();
                    } else if (ctl % 4 == 3) {
                        bw2.write("A");
                        bw2.flush();
                    }
    
                    outputThisRound[0] = true;
                    outputThisRound[1] = false;
    
                    System.out.println("outputA signal outputB!");
                    cond2.signal(); //唤醒B线程
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    lock.unlock();
                }
    
            }
    
            public void outputB() {
    
                lock.lock();
    
                try {
                    while (outputThisRound[1]) {
                        System.out.println("outputB begin to await!");
                        cond2.await();
                    }
    
                    if (ctl % 4 == 0) {
                        bw2.write("B");
                        bw2.flush();
                    } else if (ctl % 4 == 1) {
                        bw1.write("B");
                        bw1.flush();
                    } else if (ctl % 4 == 2) {
                        bw4.write("B");
                        bw4.flush();
                    } else if (ctl % 4 == 3) {
                        bw3.write("B");
                        bw3.flush();
                    }
    
                    outputThisRound[1] = true;
                    outputThisRound[2] = false;
                    System.out.println("outputB signal outputC!");
                    cond3.signal();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    lock.unlock();
                }
            }
    
            public void outputC() {
                lock.lock();
                try {
                    while (outputThisRound[2]) {
                        System.out.println("outputC begin to await!");
                        cond3.await();
                    }
    
                    if (ctl % 4 == 0) {
                        bw3.write("C");
                        bw3.flush();
                    } else if (ctl % 4 == 1) {
                        bw2.write("C");
                        bw2.flush();
                    } else if (ctl % 4 == 2) {
                        bw1.write("C");
                        bw1.flush();
                    } else if (ctl % 4 == 3) {
                        bw4.write("C");
                        bw4.flush();
                    }
    
                    outputThisRound[2] = true;
                    outputThisRound[3] = false;
                    System.out.println("outputC signal outputD!");
                    cond4.signal();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    lock.unlock();
                }
            }
    
            public void outputD() {
                lock.lock();
    
                try {
                    while (outputThisRound[3]) {
                        System.out.println("outputD begin to await!");
                        cond4.await();
                    }
    
                    if (ctl % 4 == 0) {
                        bw4.write("D");
                        bw4.flush();
                    } else if (ctl % 4 == 1) {
                        bw3.write("D");
                        bw3.flush();
                    } else if (ctl % 4 == 2) {
                        bw2.write("D");
                        bw2.flush();
                    } else if (ctl % 4 == 3) {
                        bw1.write("D");
                        bw1.flush();
                    }
    
                    outputThisRound[3] = true;
                    outputThisRound[0] = false;
                    ctl++;
                    System.out.println("outputD signal outputA!");
                    cond1.signal();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    lock.unlock();
                }
            }
        }
    }
```

以上。

如果大家还有其他更好的方法，欢迎一起讨论:-)

***Created by Long Luo at 2015-04-09 22:14:02 @Shenzhen, China.***
***Completed By Long Luo at 2015-04-09 23:46:29 @Shenzhen, China.***

