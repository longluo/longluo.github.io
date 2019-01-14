---
layout: post
title: "Android自定义View：如何实现一个模拟时钟？"
comments: true
date: 2016-08-03 22:35:45
tags: [Android, View]
categories: Android
keywords: Android, View, 自定义View, 自定义控件, 
---


***By Long Luo***

**Android中自定义控件**一直都是Android开发中的一个难点。

最近看大牛[@Tomcat的猫](http://weibo.com/eclipsexu?s=6cm7D0)写的[《Android群英传》](http://blog.csdn.net/eclipsexys)里面的第六章**Android绘图机制及处理技巧**，里面通过`Canvas`实现了一个如下所示的仪表盘：

![仪表盘](http://imagesresource.qiniudn.com/clock_still.png)

在书中详细描述了如何实现这个仪表盘，这里就不赘述了，可以参考其[具体实现代码](https://github.com/xuyisheng/AndroidHeroes/tree/master/6.%E7%BB%98%E5%9B%BE/MyApplication/app/src/main/java/com/yishengxu/myapplication)。

但是这个表盘的指针是**静止不动**的，如果我们能让这个表盘的指针展示当前时间，随着时间而转动，那么我们就可以一款模拟时钟了。

那么，问题就来了：

***如何才能让时钟的指针动起来呢？***

<!--more-->

这个问题，我们可以考虑分为2步去实现，第一步先绘制出当前的时间，第二部再让指针动起来。通过这样我们就可以实现一款**模拟时钟**。


#  一、绘制当前时间

##  1.1 获取当前时间
要绘制当前时间，我们要先获取当前时间。

```java
mTime.setToNow();
```

## 1.2 获取指针角度

当前时间可分为***时，分，秒***。

我们最终要获取的是时分秒3个指针对应的**精确角度**。

>秒针角度：最简单，直接乘以6即可获得。
>分针角度：当前分钟 * 6 + 6 * 秒 / 60F
>时针角度：(当前小时 % 12) * 30 + 30 * 当前分钟角度 / 360F;

## 1.3 绘制指针

获取到指针角度之后，接下来就是在表盘绘制指针了。这里我们要利用`canvas.rotate()`这个方法来实现绘制指针，具体实现代码如下所示：

```java
    private void drawTime(Canvas canvas) {
        // 当前时间
        mTime.setToNow();

        // 当前时间对应的角度
        float secRot = mTime.second * 6;
        float minRot = mTime.minute * 6 + 6 * mTime.second / 60F;
        float hrRot = (mTime.hour % 12) * 30 + 30 * minRot / 360F;

        Log.d(TAG, "hrRot=" + hrRot + ",minRot=" + minRot + ",secRot=" + secRot);

        // 画指针
        Paint paintHour = new Paint();
        paintHour.setStrokeWidth(20);
        Paint paintMinute = new Paint();
        paintMinute.setStrokeWidth(10);
        Paint paintSecond = new Paint();
        paintSecond.setStrokeWidth(5);

        canvas.save();

        // 时针
        canvas.rotate(hrRot, mWidth / 2, mHeight / 2);
        canvas.drawLine(mWidth / 2, mHeight / 2, mWidth / 2, mHeight / 2 - mWidth / 2 + 320,
                paintHour);
        canvas.rotate(-hrRot, mWidth / 2, mHeight / 2);

        // 分针
        canvas.rotate(minRot, mWidth / 2, mHeight / 2);
        canvas.drawLine(mWidth / 2, mHeight / 2, mWidth / 2, mHeight / 2 - mWidth / 2 + 230,
                paintMinute);
        canvas.rotate(-minRot, mWidth / 2, mHeight / 2);

        // 秒针
        canvas.rotate(secRot, mWidth / 2, mHeight / 2);
        canvas.drawLine(mWidth / 2, mHeight / 2, mWidth / 2, mHeight / 2 - mWidth / 2 + 150,
                paintSecond);
        canvas.rotate(-secRot, mWidth / 2, mHeight / 2);

        canvas.restore();
    }
```

# 二、每一秒刷新界面

完成了第一步之后，我们要做的就是实现**每隔1s去刷新界面**。这个实现很简单，通过**Handler**就可以实现。

首先在自定义View`Clock`中添加一个刷新界面的接口：

```java
public void refreshClock() {
    postInvalidate();
}
```

添加接口之后，我们再在Activity中使用Handler实现1s调用一次该接口即可：

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mClock = new Clock(this);

        mHandler = new Handler();

        mHandler.post(updateTime);

        setContentView(mClock);
    }

    private Runnable updateTime = new Runnable() {
        public void run() {
            mClock.refreshClock();
            mHandler.postDelayed(updateTime, 1000);
        }
    };
```

运行效果图如下所示：
![模拟时钟](http://imagesresource.qiniudn.com/clock_move.png)

通过以上方法，我们使用**Android自定义View**实现了一个***模拟时钟***了。

***Modified By Long Luo at 2018年10月1日10点40分 in Shenzhen, China.***

