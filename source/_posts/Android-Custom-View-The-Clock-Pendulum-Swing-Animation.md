---
layout: post
title: "Android自定义View: 如何实现类钟摆的动画效果?"
comments: true
date: 2016-08-26 22:40:34
tags: [Android, View, Animation]
categories: Android
keywords: Android, 自定义View, 动画, 摆动动画, 钟摆, Animation, View, 
---


***By Long Luo***

继第一篇[Android自定义View：如何实现一个模拟时钟？](http://www.longluo.me/blog/2016/08/03/Android-Custom-View-Create-An-Analog-Clock/)，我们使用Android自定义View实现了一款模拟表盘，第二篇[Android自定义View：另一种实现手表指针转动的方法](http://www.longluo.me/blog/2016/08/19/Android-Custom-View-Another-Way-To-Draw-The-Pointer/)我们又通过另外一种方法实现了手表指针的另外一种转动实现。

在日程生活中，我们常见的挂钟实际都是有个钟摆的，那么，如果我们想在我们所作的模拟时钟实现这种**钟摆动画**呢？那么具体应该如何实现呢？

# 一、钟摆

遇到问题，我们需要先分析**钟摆动画**的具体动画效果，然后再做下一步工作。

>单摆是能够产生往复摆动的一种装置，将无重细杆或不可伸长的细柔绳一端悬于重力场内一定点，另一端固结一个重小球，就构成单摆

那么钟摆就是在一定角度内来回摆动，具体更多细节可以自行Google。

<!--more-->

# 二、Android Animation分析

在这一节里，我们会简单谈谈Android动画。

## 2.1 动画分类

Android动画目前可分为以下3种：

### 2.1.1 补间动画(Tween Animation)

所谓的**补间动画**，其实就是**定义了我们动画的起始点和终止点的状态**，而动画的过程我们是不关心的，只需要达到我们想要的效果就行。

1. 渐变动画支持四种类型：平移（Translate）、旋转（Rotate）、缩放（Scale）、不透明度（Alpha）
2. 只是显示的位置变动，View的实际位置未改变，表现为View移动到其他地方，点击事件仍在原处才能响应
3. 组合使用步骤较复杂。
4. View Animation也是指此动画

对于补间动画来说，无论是用纯java代码构建Animation对象，还是通过xml文件定义Animation，其实最终的结果都是

```java
Animation a = new AlphaAnimation();
Animation b = new ScaleAnimation();
Animation c = new RotateAnimation();
Animation d = new TranslateAnimation();
```

### 2.1.2 帧动画(Frame Animation)

所谓的**帧动画**就是可以设置我们的动画的每一帧的效果，其实视频或者Gif的效果都是由许多张图片在很短的时间内播放，从而产生动画效果。

1. 用于生成连续的Gif效果图。
2. DrawableAnimation也是指此动画。

### 2.1.3 属性动画(Property Animation)

属性动画是Android动画里面最复杂也是最能做出复杂的动画效果的一种类型。

1. 支持对所有View能更新的属性的动画（需要属性的setXxx()和getXxx()）。
2. 更改的是View实际的属性，所以不会影响其在动画执行后所在位置的正常使用。
3. Android3.0（API 11）及以后出现的功能，3.0之前的版本可使用github第三方开源库nineoldandroids.jar进行支持。

属性动画的相关的API：

* ValueAnimator：值动画执行类，常配合AnimatorUpdateListener使用。
* ObjectAnimator：对象动画执行类。
* PropertyValuesHolder: 属性存储器，为两个执行类提供更新多个属性的功能。
* AnimatorListener：动画执行监听，在动画开始、重复、结束、取消时进行回调。
* Keyframe：为PropertyValuesHolder提供多个关键帧的操作值。
* AnimatorSet：一组动画的执行集合类：设置执行的先后顺序，时间等。
* TimeInterpolator：时间插值，用于控制动画执行过程。
* AnimatorUpdateListener：动画更新监听。
* TypeEvaluator：类型估值，用于设置复杂的动画操作属性的值。

ValueAnimator和ObjectAnimator是属性动画里面经常使用的对象类，ObjectAnimator是 ValueAnimator的子类。

当然Android属性动画是很复杂，达到熟练运用还需要深入研究，大家想了解可以去网上寻找相关知识学习。

## 2.2 自定义动画

在本文中，我们主要是要实现一个自定义动画：摆动动画。那么，我们有必要了解如何实现自定义动画。

***---如何实现自定义动画？***

实现自定义动画，要继承

`Animation(android.view.animation.Animation)`，然后Override其中的2个方法：

`Animation.applyTransformation(float, Transformation)`，和`initialize()`两个方法。

从方法名和内容可以知道`Animation.applyTransformation(float, Transformation)`就是最核心的动画实现方法。

我们在进一步看看这个方法在父类是怎么定义的，在父类Animation类中找到该方法的定义

```java
    /**
     * Helper for getTransformation. Subclasses should implement this to apply
     * their transforms given an interpolation value.  Implementations of this
     * method should always replace the specified Transformation or document
     * they are doing otherwise.
     * 
     * @param interpolatedTime The value of the normalized time (0.0 to 1.0)
     *        after it has been run through the interpolation function.
     * @param t The Transformation object to fill in with the current
     *        transforms.
     */
    protected void applyTransformation(float interpolatedTime, Transformation t) {
    }
```

通过注释我们明白了（也可以结合调试理解）：

>在绘制动画的过程中会反复的调用applyTransformation函数，每次调用参数interpolatedTime值都会变化，该参数从0渐变为1，当该参数为1时表明动画结束。通过参数Transformation来获取变换的矩阵（matrix），通过改变矩阵就可以实现各种复杂的效果。

`Animation.initialize()`方法具体就是初始化动画时的一些对象的尺寸以及其父对象的尺寸。

```java
    /**
     * Initialize this animation with the dimensions of the object being
     * animated as well as the objects parents. (This is to support animation
     * sizes being specified relative to these dimensions.)
     *
     * <p>Objects that interpret Animations should call this method when
     * the sizes of the object being animated and its parent are known, and
     * before calling {@link #getTransformation}.
     *
     *
     * @param width Width of the object being animated
     * @param height Height of the object being animated
     * @param parentWidth Width of the animated object's parent
     * @param parentHeight Height of the animated object's parent
     */
    public void initialize(int width, int height, int parentWidth, int parentHeight) {
        reset();
        mInitialized = true;
    }
```

# 三、SwingAnimation

实现钟摆动画，那么我们就需要分析其具体实现，再做下一步工作。

***Talk is cheap, show me the code.***

```java
    @Override
    protected void applyTransformation(float interpolatedTime, Transformation t) {
        float degrees;

        float leftPos = (float) (1.0 / 4.0);
        float rightPos = (float) (3.0 / 4.0);

        if (interpolatedTime <= leftPos) {
            degrees = mMiddleDegrees + ((mLeftDegrees - mMiddleDegrees) * interpolatedTime * 4);
        } else if (interpolatedTime > leftPos && interpolatedTime < rightPos) {
            degrees = mLeftDegrees + ((mRightDegrees - mLeftDegrees) * (interpolatedTime - leftPos) * 2);
        } else {
            degrees = mRightDegrees + ((mMiddleDegrees - mRightDegrees) * (interpolatedTime - rightPos) * 4);
        }

        float scale = getScaleFactor();
        if (mPivotX == 0.0f && mPivotY == 0.0f) {
            t.getMatrix().setRotate(degrees);
        } else {
            t.getMatrix().setRotate(degrees, mPivotX * scale, mPivotY * scale);
        }
    }
```

初始化就比较简单了，如下所示：

```java
    @Override
    public void initialize(int width, int height, int parentWidth, int parentHeight) {
        super.initialize(width, height, parentWidth, parentHeight);
        mPivotX = resolveSize(mPivotXType, mPivotXValue, width, parentWidth);
        mPivotY = resolveSize(mPivotYType, mPivotYValue, height, parentHeight);
    }
```

具体使用呢：

```java
        //参数取值说明：中间度数、摆到左侧的度数、摆到右侧的度数、圆心X坐标类型、圆心X坐标相对比例、圆心Y坐标类型、圆心Y坐标相对比例
        //坐标类型有三种：ABSOLUTE 绝对坐标，RELATIVE_TO_SELF 相对自身的坐标，RELATIVE_TO_PARENT 相对上级视图的坐标
        //X坐标相对比例，为0时表示左边顶点，为1表示右边顶点，为0.5表示水平中心点
        //Y坐标相对比例，为0时表示上边顶点，为1表示下边顶点，为0.5表示垂直中心点

        mSwingAnimation = new SwingAnimation(
                0f, 20f, -20f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f);
        mSwingAnimation.setDuration(3000);     //动画持续时间
        mSwingAnimation.setInterpolator(new AccelerateDecelerateInterpolator());
        mSwingAnimation.setRepeatCount(Animation.INFINITE);  //动画重播次数
        mSwingAnimation.setFillAfter(false);  //是否保持动画结束画面
        mSwingAnimation.setStartOffset(2000);   //动画播放延迟
```

# 四、总结

通过如上方法，我们就实现了一个钟摆动画。

以上。


***Modified By Long Luo at 2018年10月1日11点29分 in Shenzhen, China.***

