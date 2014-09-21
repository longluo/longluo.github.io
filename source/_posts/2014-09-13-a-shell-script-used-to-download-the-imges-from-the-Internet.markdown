---
layout: post
title: "一个用于批量下载网络图片的Shell脚本"
date: 2014-09-13 22:26:00 +0800
comments: true
categories: Tools
description: "最近为了做好一个天气预报的项目，需要从Yahoo下载一些天气图标，由于图标比较多，有80多张。迅雷不支持https的下载，每次在浏览器下载太慢，于是写了一个批量下载图片资源的Shell脚本，完美的解决了这个问题。"
keywords: Shell, 网络资源
---

### ***By Long Luo***

最近为了做好一个[天气预报](http://imlongluo.com/weather)的项目，需要从Yahoo下载一些天气图标，但是由于图标比较多，有80多张。图标是存储在[Yahoo Image](http://yimg.com)网站上的。

迅雷不支持https的下载，虽然可以在浏览器下载，但是在浏览器下载太慢，于是写了一个批量下载图片资源的Shell脚本，完美的解决了这个问题。

Yahoo天气图标的地址规则如下：`https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/` + 图标名称

比如：![Thunder](https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/0d.png "雷电天气")

<!--more-->

我使用了2种方法，解决了下载的难题，虽然好久没有写Shell脚本了，但是意识和底子还在，写即几十行代码还是比较轻松的。

### *方法1：*



	#!/bin/bash
	# 
	#  Decription: 
	#		A Shell script used to download the imges from Internet.
	#  Author:
	#       Long Luo
	#  Date:
	#       2014-09-11 00:16:59
	#

	BASE_URL="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"

	# declare STIRNG variable
	STRING="Beginning Image download..."

	#print var on screen 
	echo $STRING

	sleep 1
	echo "...."

	BIG_PNG="ds.png"
	PNG=".png"

	echo "url="${BASE_URL}
	echo "big png="${BIG_PNG}

	for ((i=0; i<49;i++)); do
		echo IMG_URL=${BASE_URL}${i}${BIG_PNG}
		echo "final url="${IMG_URL}

		curl ${BASE_URL}${i}${BIG_PNG} -o small/${i}${PNG}
		sleep 1

	done

### *方法2：*
方法2将图片URL地址都写在一个数组里，然后从数组中读取，并重命名，相对来说，不如第一种方法简单：


	# Method 2

	URL_ARRAY=(
	'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/0d.png'
	'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/1d.png'
	)

	NAME_ARRAY=(
	'file1.jpg'
	'file2.jpg'
	)

	ELEMENTS=${#URL_ARRAY[@]}

	for (( i=0;i<ELEMENTS;i++)); do
		echo ${URL_ARRAY[${i}]}
		echo "saved as ${NAME_ARRAY[${i}]}"
	 	curl ${URL_ARRAY[${i}]} -o images/${NAME_ARRAY[${i}]}
		sleep 1
		
	done

### 以上，希望有需要的同学可以采用:-）

#### *Created by Long Luo at 2014-09-13 22:44:52 @Shenzhen, China.*
#### *Completed By Long Luo at 2014-09-13 23:01:05 @Shenzhen, China.*

