---
layout: post
title: "Android UI Layout总结系列之篇之5大布局"
date: 2014-01-23 20:16:36 +0800
comments: true
categories: Android
description: "Android UI Layout总结系列之篇之5大布局."
keywords: Android, UI, Layout, 布局
---

#### ***By Long Luo***

在一个Android应用中，Layout是开发中的一个很重要环节，Layout是组成UI不可缺少的一部分。


## Android UI 核心类
-------------

#### 在Android应用构建UI的方法有以下几种：

1. 单纯使用JAVA代码
2. 使用XML完全定义界面
3. 结合使用两者，在XML中定义，在JAVA中引用和修改

#### Android SDK中关于UI的核心类：

Android.view.View和android.view.ViewGroup

android中的常见UI控件均会扩展View和ViewGroup其中有一部分是专门用来控制其子View位置和大小，这些类我们称为布局管理器。
<!--more-->
#### ViewGroup

1.LayoutParams是ViewGroup内部类，包含了ViewGroup的布局参数，用来告诉它们的父类它们想怎么在父类中布局（大小和位置），所有在LayoutParams及其子类中定义的布局参数在xml中定义都是通过layout_***定义的。

LayoutParams只提供了两个参数设定：

	layout_width  元素的高度(fill_parent | match_parent | wrap_content | *dip)
	layout_height 元素的宽度(同上)		 		   


2.MarginLayoutParams也是ViewGroup一个内部类，它继承了LayoutParams类，用来扩展LayoutParams的属性，设置参数。

MarginLayoutParams添加了四个参数设定：

	layout_marginLeft       相对于本元素左边界的偏移
	layout_marginRight     	相对于本元素右边界的偏移
	layout_marginTop，    	相对于本元素上边界的偏移
	layout_marginBottom  	相对于本元素下边界的偏移

以上的两种Layout参数，所有布局中的子ViewGroup和子View都可以使用


**下面讲述5种布局：**

## 1.Linear Layout (线性布局)
----------

线性布局是Android布局中最简单的布局，也是最常用，最实用的布局。

android:orientation线形布局的对齐方式 ： vertical(垂直) 和 horizontal(水平)

LayoutParams中的特殊参数:

	layout_weight  权值
	layout_gravity 相对于父元素的重力值(默认top|left)：
	(top|bottom|left|right|center_vertical|fill_vertical |center_ horizontal 
	|fill_ horizontal | center| fill)

#### LinearLayout有两个非常相似的属性：

	android:gravity
	android:layout_gravity
 
**他们的区别在于：**

- android:gravity属性是对该view中内容的限定．比如一个button 上面的text. 你可以设置该text相对于view的靠左，靠右等位置．

- android:layout_gravity是用来设置该view相对与父view的位置．比如一个button在linearlayout里，你想把该button放在linearlayout里靠左、靠右等位置就可以通过该属性设置． 


android:gravity用于设置View中内容相对于View组件的对齐方式，而android:layout_gravity用于设置View组件相对于Container的对齐方式。
 
原理跟android:paddingLeft、android:layout_marginLeft有点类似。如果在按钮上同时设置这两个属性。

	android:paddingLeft="30px"  按钮上设置的内容离按钮左边边界30个像素
	android:layout_marginLeft="30px"  整个按钮离左边设置的内容30个像素
 
下面回到正题， 我们可以通过设置android:gravity="center"来让EditText中的文字在EditText组件中居中显示；

同时我们设置EditText的android:layout_gravity="right"来让EditText组件在LinearLayout中居右显示。看下效果：

	<LinearLayout
	   	xmlns:android="http://schemas.android.com/apk/res/android"
	    android:orientation="vertical"
	    android:layout_width="fill_parent"
	    android:layout_height="fill_parent" >
	    <EditText
	        android:layout_width="wrap_content"
	        android:gravity="center"
	        android:layout_height="wrap_content"
	        android:text="one"
	        android:layout_gravity="right"/>
	</LinearLayout>


## 2.Relative Layout (相对布局)
----------

**RelativeLayout**允许子元素指定他们相对于其它元素或父元素的位置（通过ID 指定）。因此，你可以以右对齐，或上下，或置于屏幕中央的形式来 排列两个元素。元素按顺序排列，因此如果第一个元素在屏幕的中央，那么相对于这个元素的其它元素将以屏幕中央的相对位置来排列。如果使用XML 来指定这个 layout ，在你定义它之前，被关联的元素必须定义。

这个布局是最灵活的布局，因此复杂的布局我们多用这个布局。
                                            
#### LayoutParams中特殊的参数 :

#### <1>. 属性值为true或false
	android:layout_centerHrizontal            水平居中
	android:layout_centerVertical             垂直居中
	android:layout_centerInparent             相对于父元素完全居中
	android:layout_alignParentBottom          贴紧父元素的下边缘
	android:layout_alignParentLeft            贴紧父元素的左边缘
	android:layout_alignParentRight           贴紧父元素的右边缘
	android:layout_alignParentTop             贴紧父元素的上边缘
	android:layout_alignWithParentIfMissing   若找不到兄弟元素以父元素做参照物

#### <2>. 属性值必须为id的引用名"@id/id-name"
	android:layout_below               在某元素的下方
	android:layout_above               在某元素的上方
	android:layout_toLeftOf            在某元素的左边
	android:layout_toRightOf           在某元素的右边
	android:layout_alignBaseLine 	   该控件的baseline和给定ID的控件的Baseline对齐
	android:layout_alignTop            本元素的上边缘和某元素的的上边缘对齐
	android:layout_alignLeft           本元素的左边缘和某元素的的左边缘对齐
	android:layout_alignBottom         本元素的下边缘和某元素的的下边缘对齐
	android:layout_alignRight          本元素的右边缘和某元素的的右边缘对齐
 
#### <3>. 属性值为具体的像素值，如30dip，40px
	android:layout_marginBottom        离某元素底边缘的距离
	android:layout_marginLeft          离某元素左边缘的距离
	android:layout_marginRight         离某元素右边缘的距离
	android:layout_marginTop           离某元素上边缘的距离

 
## 3.TableLayout (表格布局) 

----------
                                              
TableLayout 将子元素的位置分配到行或列中。一个TableLayout 由许多的TableRow 组成，每个TableRow 都会定义一个 row（事实上，你可以定义其它的子对象）。

TableLayout 容器不会显示row 、cloumns 或cell 的边框线。每个row拥有0个或多个的cell；每个cell 拥有一个View对象。

表格由列和行组成许多的单元格。表格允许单元格为空。单元格不能跨列，这与HTML 中的不一样。

特殊的参数：

	android:stretchColumns	伸展的列的索引
	android:shrinkColumns	收缩的列的索引
	android:collapseColumns	倒塌的列的索引(即销毁)
                                                             
                                                             
表示两行两列的一个表格。
android:gravity="center"书面解释是权重比。其实就是让它居中显示。

它还可以动态添加里面的每行每列。如下代码所示:

	TableLayout tableLayout = (TableLayout) findViewById(R.id.table01);
	TableRow tableRow = new TableRow(this);
	TextView temp = new TextView(this);
	temp.setText("text的值");
	tableRow.addView(temp);

android:stretchColumns="1,2,3,4" 它的意思就是自动拉伸1,2,3,4列。
       
                                           
## 4.AbsoluteLayout (绝对布局)
----------

AbsoluteLayout可以让子元素指定准确的x/y坐标值，并显示在屏幕上。(0, 0)为左上角，当向下或向右移动时，坐标值将变大。

AbsoluteLayout没有页边框，允许元素之间互相重叠（尽管不推荐）。我们通常不推荐使用 

AbsoluteLayout，除非你有正当理由要使用它，因为它使界面代码太过刚性，以至于在不同的设备上可能不能很好地工作。

LayoutParams中特殊的参数 :

	layout_x   x方向的坐标
	layout_y   y方向的坐标


## 5.FrameLayout ( 帧布局 ) 
----------

FrameLayout是最简单的一个布局对象。它被定制为你屏幕上的一个空白备用区域，之后你可以在其中填充一个单一对象。比如，一张你要发布的图片。所有的子元素将会固定在屏幕的左上角；你不能为FrameLayout中的一个子元素指定一个位置。后一个子元素将会直接在前 一个子元素之上进行覆盖填充，把它们部份或全部挡住（除非后一个子元素是透明的）。

里面可以放多个控件，不过控件的位置都是相对位置

LayoutParams中特殊的参数 :

layout_gravity  相对于父元素的重力值(用法同LinearLayout)


**注意事项：**

1. 各布局不要乱用各自的属性。比如把属于AbsoluteLayout布局的android:layout_x和android:layout_y用到LinearLayout布局或RelativeLayout布局，或者把RelativeLayout布局的 below，rightof等属性应用到其他布局中。这样做虽然不会报错，但是根本达不到我们需要的效果。

2. 关于android:layout_width="fill_parent"和android:layout_height="wrap_content" ，这是对每个布局宽和高的设置。wrap_content可表示随着其中控件的不同而改变这个布局的宽度或高度，类似于自动设置宽和高，fill_parent使布局填充整个屏幕，另外还有一种match_parent，它本质上和 fill_parent 一样，并从API Level8开始替代fill_parent。


#### ***Created By Long Luo at 2014/1/21 14:20:57*** 
#### ***Completed By Long Luo at 2014/1/23 18:13:04 @Shenzhen, China.***

### [ My Blog ](http://www.imlongluo.com/blog "Blog")
