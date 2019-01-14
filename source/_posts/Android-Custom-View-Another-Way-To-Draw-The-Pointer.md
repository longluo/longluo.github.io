---
layout: post
title: "Android自定义View：另一种实现手表指针转动的方法"
comments: true
date: 2016-08-19 17:01:19
tags: [Android, View]
categories: Android
keywords: Android, View, 自定义View, 自定义控件, 表盘, 
---


***By Long Luo***

在上一篇[Android自定义View：如何实现一个模拟时钟？](http://www.longluo.me/blog/2016/08/03/Android-Custom-View-Create-An-Analog-Clock/)中我们实现了一款模拟时钟。在上一篇中，我们使用了Canvas中的`canvas.rotate()`方法让坐标系旋转从而绘制出指针。

但是，其实我们也可以使用另外一种方法去实现指针绘制，这种更直观，更容易理解。

# 一. 绘制指针

要绘制指针，需要知道指针的起点和终点，而起点就是圆心，终点就需要根据指针的`sin`及`cos`值及圆心进行对应的计算。

## 1.1 弧度

要计算指针对应的`sin`及`cos`值，区别于上一篇的***角度***，这一篇我们使用***弧度***。具体弧度是什么以及角度弧度换算关系可自行Google。

下面我们给出对应指针弧度如何计算的，如下所示：

```java
        float secRot = mCalendar.get(Calendar.SECOND) / 30f * (float) Math.PI;
        float minRot = mCalendar.get(Calendar.MINUTE) / 30f * (float) Math.PI;
        float hrRot = (((mCalendar.get(Calendar.HOUR_OF_DAY) + (mCalendar.get(Calendar.MINUTE) / 60f))) / 6f) * (float) Math.PI;
```

<!--more-->

## 1.2 绘制

知道对应指针的弧度之后，我们就很容易计算出对应的指针坐标了，那么绘制也变得简单了，如下所示：

```java
        float secLength = centerX - 60;
        float minLength = centerX - 80;
        float hrLength = centerX - 100;

        float hrX = (float) Math.sin(hrRot) * hrLength;
        float hrY = (float) -Math.cos(hrRot) * hrLength;
        canvas.drawLine(centerX, centerY, centerX + hrX, centerY + hrY, paintHour);

        float minX = (float) Math.sin(minRot) * minLength;
        float minY = (float) -Math.cos(minRot) * minLength;
        canvas.drawLine(centerX, centerY, centerX + minX, centerY + minY, paintMinute);

        float secX = (float) Math.sin(secRot) * secLength;
        float secY = (float) -Math.cos(secRot) * secLength;
        canvas.drawLine(centerX, centerY, centerX + secX, centerY + secY, paintSecond);
```

## 1.3 小插曲

开发完成之后，发现了一个Bug，指针一直不动，打印Log发现对应的弧度一直不变，那么很明显就是时间没有刷新，在计算弧度前，设置为当前时间即可。

```java
        mCalendar.setTimeInMillis(System.currentTimeMillis());
```

# 二. 界面刷新

界面刷新也可以不使用Activity中使用**Handler**去实现，而直接在自定义View中`void onDraw(Canvas canvas)`方法中调用`postInvalidateDelayed()`实现界面自动刷新，更简洁，更优雅。

```java
        //刷新
        postInvalidateDelayed(1000);
```

通过上述方法，我们就成功的让时钟转起来了。

下一次，你就把TA用在你的一些项目中去吧！


***By Long Luo 2016-08-24 10:39 at Shenzhen.***
***Modified By Long Luo at 2018年10月1日10点38分 in Shenzhen, China.***

