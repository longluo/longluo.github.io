---
layout: post
title: "Android自定义View: 如何实现类钟摆的动画效果?"
comments: true
date: 2016-08-26 22:40:34
tags: [Android, 自定义View, 动画]
categories: Android
keywords: Android, 自定义View, 动画, 摆动动画, 钟摆, 
---




<!--more-->


从该类代码来看，它无非就是重写了applyTransformation，和initialize两个方法而已，而从方法名和内容可以知道applyTransformation就是最核心的动画实现方法。我们在进一步看看这个方法在父类是怎么定义的，在父类Animation类中找到该方法的定义


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

在动画执行期间，这个方法会被不断回调
参数interpolatedTime：从方法被第一次回调时的0.0，随着动画的执行不断增长，当动画结束时这个值是1.0


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
        System.out.println("degrees=" + degrees);

        float scale = getScaleFactor();
        if (mPivotX == 0.0f && mPivotY == 0.0f) {
            t.getMatrix().setRotate(degrees);
        } else {
            t.getMatrix().setRotate(degrees, mPivotX * scale, mPivotY * scale);
        }
    }
```




