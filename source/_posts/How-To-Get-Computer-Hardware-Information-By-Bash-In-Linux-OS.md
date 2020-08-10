---
layout: post
title: "获取电脑配置：一个20行的脚本代码就够了，So Easy！"
comments: true
date: 2012-10-22 20:16:33 
tags: [Linux, Shell, 硬件]
categories: Linux
keywords: Linux, Shell, 脚本, 硬件信息, 
---

***By Long Luo***

>这篇文章是2012年在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上写的，[Linux下获取电脑硬件配置信息的bash脚本代码](http://blog.csdn.net/tcpipstack/article/details/8100270)。

---------

最近由于要获取几台Linux服务器的硬件配置信息，就写了一个获取硬件配置信息的脚本代码，可以获取CPU、内存、硬盘等硬件信息。

使用这个脚本文件，就可以一次性输出代码如下所示：

<!--more-->

```Bash
#!/bin/bash
#
#	Description:
#		Used to get the hardware config information.
#
#	History:
#		tcpipstack, 2012/09/04, created.
#


#-----------------------------------------------------------------------------------------------------------------
fn_get_cpu_info()
{
	echo -e "\n	CPU Num is: "`grep -c 'model name' /proc/cpuinfo`
	echo "`cat /proc/cpuinfo | grep processor | wc -l`"
	#echo `cat /proc/cpuinfo | grep 'model name' | sed 's'`
}

fn_get_disk_info()
{
	echo -e "\n	Disk Information: "
	for x in `df -h | grep /dev | awk '{print $5 "-" $6 "-" $2 "-" $4}' | sed 's/%//g'`
	do
		disk_status=(${x//"-"/" "})
		echo "Disk Directory ${disk_status[1]}	DiskTotal=${disk_status[2]}	DiskUsed=${disk_status[3]}"
	done	
}

fn_get_mem_info()
{
	MemTotal=`free -m | grep Mem | awk '{print  $2}'`
	echo -e "\n	Memory is: ${MemTotal} MB "
}

#-----------------------------------------------------------------------------------------------------------------
echo -e "\n -----------This Computer's Hardware Config Information is: -----------\n"
fn_get_disk_info
fn_get_cpu_info
fn_get_mem_info
echo -e "\n -----------End -----------\n"
```

在一台Win7电脑上运行此脚本，输出硬件配置信息如下所示：

```
 -----------This Computer's Hardware Config Information is: -----------


        Disk Information: 

        CPU Num is: 4

        Memory is:  8096 MB

 -----------End -----------
```

以上。


