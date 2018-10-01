---
layout: post
title: "深入剖析printf函数(上)：如何不借助第三方库在屏幕上输出“Hello World”?"
comments: true
date: 2013-01-11 22:30:00  
tags: [Printf, Kernel]
categories: Program
keywords: printf, 技术, Linux, Kernel, 第三方库, 
---

***By Long Luo***


# 前言

---"你为什么要去登珠穆朗玛？"  

当美国《纽约时报》记者问英国登山家乔治·马洛里。

---“Because it is there(因为山在那里)。”

# 一、 内核的诱惑

**会当凌绝顶，一览众山小。**

***内核，是一个操作系统的核心。它负责管理系统的进程、内存、设备驱动程序、文件和网络系统，决定着系统的性能和稳定性***。

几十年来，内核以它那深深的魅力吸引着无数的码农为之倾倒，一代又一代的码农们从青青葱葱走向硕果累累，从风华正茂走向耄耋之年，也走出了现在多姿多彩的世界。

内核就像一位风姿卓约的美女，多少码农欲一亲芳泽而不得。Linux内核是庞大复杂的，超过 600 万行的代码，就如同珠穆朗玛峰一样那样让人望而生畏。初学者一踏入，绝大多数会不自觉地迷失在这座庞大的迷宫里。

<!--more-->

# 二、用printf撕开一个小小的口子...

作为一名内核小白，我也期望着那天能登上Linux内核这座高峰，一览其风采，但高原反应可不是闹着玩的。
既然等不了珠穆朗玛峰，那就先试试攀登莲花山吧...

每一位初学者都学习过下面这个例子，

---没看过？
---拖出去，XX了

```cpp
/************************************************************************************
** File: - Z:\code\c\LLprintf\print0.1\LLapp.c
**  
** Copyright (C), Long.Luo, All Rights Reserved!
** 
** Description: 
**      LLapp.c 
** 
** Version: 0.1
** Date created: 21:30:00,10/01/2013
** Author: Long.Luo
** 
** --------------------------- Revision History: --------------------------------
** 	<author>	<data>			<desc>
** 
************************************************************************************/

#include <stdio.h>

int main(void)
{
	printf("Hello, World!\n");

	return 0;
}
```

我们通过调用`printf`就可以实现在屏幕上输出一段字符？
---为什么呢？
---假如我们不用`printf`，怎么做呢？

***`printf`里面蕴含着什么样的秘密呢？***

......

我们看看`LLapp.c`文件经过**预处理**之后发生了什么？

![printf预处理](http://img.my.csdn.net/uploads/201301/11/1357914874_7219.png)

可见经过预处理之后引入了很多其他函数，正是经过这一系列调用实现了我们想要的功能。

我们再来看看`printf`的定义：

```cpp
int printf(const char *fmt, ...)
{
	int i;
	char buf[256];
　　
	va_list arg = (va_list)((char*)(&fmt) + 4); 
	i = vsprintf(buf, fmt, arg);
	write(buf, i);
　　
	return i;
}
```

事实上，`printf`是作为C语言的标准输入输出库里面的一个函数提供给我们的，已经被我们习以为常了。

这些C语言函数库是随Linux核心提供给我们的，这些库对系统调用进行了一些包装和扩展。

而实际上，很多已经被我们习以为常的C语言标准函数，在Linux平台上的实现都是靠**系统调用**完成的，所以如果想对系统底层的原理作深入的了解，必须先掌握各种系统调用。

# 三、Linux系统调用

Linux内核中设置了一组用于实现各种系统功能的子程序，称为**系统调用**。用户可以通过系统调用命令在自己的应用程序中调用它们。

从某种角度来看，系统调用和普通的函数调用非常相似。区别仅仅在于，**系统调用由操作系统核心提供，运行于核心态；而普通的函数调用由函数库或用户自己提供，运行于用户态**。二者在使用方式上也有相似之处，在下面将会提到。

# 四、如何使用Linux系统调用？

好了，了解到这些之后，来看下我们***不使用C语言标准库***完成的`app.c` 1.0版：

```cpp
/************************************************************************************
** File: - Z:\code\c\LLprintf\print1.0\app.c
**  
** Copyright (C), Long.Luo, All Rights Reserved!
** 
** Description: 
**      app.c
** 
** Version: 1.0
** Date created: 21:48:18,10/01/2013
** Author: Long.Luo
** 
** --------------------------- Revision History: --------------------------------
** 	<author>	<data>			<desc>
** 
************************************************************************************/

void LLprint(char *msg, int len);

int main(void)
{
	LLprint("Hello, LLprint!\n", 16);
	
	return 0;
}
```

从代码可以看出，这一次我们没有包含任何头文件，只是调用了一个`void LLprint(char *msg, int len)` 函数来实现在屏幕上输出的工作，那么`void LLprint(char *msg, int len)`的实现呢？

当然，按照我们的要求：

---我们必须实现一个纯正的`printf`，不借助任何第三方库，完全调用Linux的系统调用，甚至直接自己写....

---***NO!*** 

完全实现`printf`的功能，目前来说还是一个Mission Impossible，但是我们可以完全可以降低难度，只是在屏幕上输出一段我们自己想要的字符，这完全是可以办到的。

# 五、用汇编语言实现"Hello World"

我们可以用**纯汇编语言**来实现它， Look：

```x86asm
;************************************************************************************
;   File: - Z:\code\c\LLprintf\print1.0\LLprint.asm
;   
;   Copyright (C), Long.Luo, All Rights Reserved!
; 
;   Description: 
;       LLprint.asm
;  
;   Version: 1.0
;   Date created: 21:45:04,10/01/2013
;   Author: Long.Luo
; 
; --------------------------- Revision History: --------------------------------
; 	<author>	<data>			<desc>
; 
;************************************************************************************

extern main

[section .data]	; Data start here

[section .text]	; Code start here

global _start	; import ENTRY: _start, for the LD.
global LLprint	; import the function for app.c.

_start:
		call main			;  main
		add	esp, 8			; 

		mov ebx, 0      	; 参数一：退出代码
		mov eax, 1       	; 系统调用号(sys_exit) 
		int 0x80         	; 调用内核功能	

; ====================================================================================
;                          void LLprint(char* msg, int len);
; ====================================================================================
LLprint:
		mov edx, [esp + 8]  ; 参数三：字符串长度
		mov ecx, [esp + 4]  ; 参数二：要显示的字符串
		mov ebx, 1       	; 参数一：文件描述符(stdout) 
		mov eax, 4       	; 系统调用号(sys_write) 
		int 0x80         	; 调用内核功能
		ret              	; 退出程序
		
```

代码中的注释已经写的挺详细的了，简单来说:

程序启动之后，首先会进入`main`函数执行，然后调用`LLprint`函数，在`LLprint`函数里面会调用`sys_write`的系统调用来实现在屏幕上输出字符的功能，最后返回，在`main`函数里面调用`sys_exit`来退出。

有了上面的`app.c`和`LLprint.asm` 2个主要文件就算是大功告成了，不过，万事俱备只欠东风，我们还需要将分别将它们编译链接起来，最终生成一个可执行文件才行。

不过呢，由于编译的命令比较长，我们写代码经常需要修改查错，每次都输入命令，未免太长了，不符合低碳环保的要求。

要记住，**懒人才是推动这个世界进步的力量！**

***一个勤奋的程序员不是一个好的程序员。***

我们的前辈们，正是看到了这个弊端，所以发明了`Makefile`来代替这种重复劳动，实现自动化编译链接工作。

最终完成的`Makefile`如下所示：

```makefile
#************************************************************************************
# File: - Z:\code\c\LLprintf\print1.0\Makefile
#  
# Copyright (C), Long.Luo, All Rights Reserved!
# 
# Description: 
#      Makefile
# 
# Version: 1.0
# Date created: 21:49:10,10/01/2013
# Author: Long.Luo
# 
# --------------------------- Revision History: --------------------------------
# 	<author>	<data>			<desc>
# 
#************************************************************************************

# Programs, flags, etc.
ASM		= nasm
CC		= gcc
LD		= ld
ASMFLAGS	= -f elf
CFLAGS		= -c
#CFLAGS		= -m32 -c
LDFLAGS		= -s
#LDFLAGS		=-m elf_i386 -s

# This Program
BIN		= AppPrint
OBJS	= LLprint.o app.o 

# All Phony Targets
.PHONY : everything final image clean realclean disasm all buildimg

# Default starting position
everything : $(BIN)

all : realclean everything

final : all clean

clean :
	rm -f $(OBJS)

realclean :
	rm -f $(OBJS) $(BIN)
	
$(BIN) : $(OBJS)
	$(LD) $(LDFLAGS) -o $(BIN) $(OBJS)
		
LLprint.o : LLprint.asm
	$(ASM) $(ASMFLAGS) -o $@ $<

app.o: app.c
	$(CC) $(CFLAGS) -o $@ $<
```

这样我们每次都只需要在命令行输入make all就会自动化编译连接了。

# 六、胜利的果实

来看看我们最终的成果：

![Printf Output](http://img.my.csdn.net/uploads/201301/11/1357914883_4293.png)


***Bingo!***

# 更多疑问

我们只是完成了使用汇编语言来实现在屏幕上输出我们想要的字符，

But，`printf`那么复杂的功能到底是如何实现的呢？

***欲知后事如何，且听下回分解......***

-----------

***注：***
[“深入剖析printf函数”](http://blog.csdn.net/tcpipstack/article/category/6270060)写于2013年，在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上的，这是上篇: [深入剖析printf函数(上)：如何不借助第三方库在屏幕上输出"Hello World"?](http://blog.csdn.net/tcpipstack/article/details/8490811)

***Modified By Long Luo at 2018年10月2日03点42分 in Shenzhen, China.***

