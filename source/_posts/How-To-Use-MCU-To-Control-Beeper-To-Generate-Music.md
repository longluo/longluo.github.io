---
layout: post
title: "如何利用单片机控制蜂鸣器播放音乐？---以《梁祝》的实现为例"
comments: true
date: 2012-10-23 22:37:57  
tags: [单片机, Music, 乐理]
categories: Music
keywords: 单片机, Music, 技术, 乐理, 
---

***By Long Luo***

这篇文章是2012年在我的[CSDN Blog](http://blog.csdn.net/tcpipstack)上写的，[TI EK-LM3S8962开发板使用蜂鸣器播放音乐《梁祝》的实现](http://blog.csdn.net/tcpipstack/article/details/8104111)。

--------

TI的EK-LM3S8962开发板有着比较丰富的外设，由于个人从小对音乐感兴趣，因此利用其中的蜂鸣器外设来实现音乐播放的功能，下面对此进行逐一解析：

先上张开发板的Layout图：

![EK-LM3S8962](http://img.my.csdn.net/uploads/201210/23/1351003559_1210.JPG) 

要实现音乐播放，首先要明白数字音乐是如何播放出来的？

首先需要了解一个事实，那就是我们所听到的音乐只是一系列不同频率的声音按照一定的节奏播放出来。

<!--more-->

但是乐音是有特定的频率的，因此我们首先要定义不同的乐音音节：

```cpp
#ifndef  __MUSIC_H__
#define  __MUSIC_H__


//  定义低音音名（数值单位：Hz）
#define  L1     262     //  c
#define  L2     294     //  d
#define  L3     330     //  e
#define  L4     349     //  f
#define  L5     392     //  g
#define  L6     440     //  a1
#define  L7     494     //  b1

//  定义中音音名
#define  M1     523     //  c1
#define  M2     587     //  d1
#define  M3     659     //  e1
#define  M4     698     //  f1
#define  M5     784     //  g1
#define  M6     880     //  a2
#define  M7     988     //  b2

//  定义高音音名
#define  H1     1047    //  c2
#define  H2     1175    //  d2
#define  H3     1319    //  e2
#define  H4     1397    //  f2
#define  H5     1568    //  g2
#define  H6     1760    //  a3
#define  H7     1976    //  b3

//  定义时值单位，决定演奏速度（数值单位：ms）
#define  T      3600

//  定义音符结构
typedef struct
{
    short mName;    //  音名：取值L1～L7、M1～M7、H1～H7分别表示低音、中音、高音的
                    //        1234567，取值0表示休止符
    short mTime;    //  时值：取值T、T/2、T/4、T/8、T/16、T/32分别表示全音符、
                    //        二分音符、四分音符、八分音符…，取值0表示演奏结束
}
tNote;

// 
typedef struct _tMusic
{
	struct tNote;
	char	cName[20];
}
tMusic;

//
extern void playNote(const tNote * pNote);
extern void displayNoteName(const tMusic * pMusic);


#endif/*__MUSIC_H__*/
```

然后呢，我们需要歌谱，歌谱是一系列音节按照一定的节奏和时长播放出来：

```cpp
/************************************************************************************
** File: - E:\ARM\lm3s8962projects\uCOS_II\uCOS2.52_Keil_Led_Buz\User\score.h
**  
** Copyright (C), tcpipstack, All Rights Reserved!
** 
** Description: 
**      some music scores 
** 
** Version: 1.0
** Date created: 12:06:54,01/10/2012
** Author: tcpipstack
** 
** --------------------------- Revision History: --------------------------------
** 	<author>	<data>			<desc>
** 
************************************************************************************/
#ifndef __SCORE_H_
#define __SCORE_H_

#include "music.h"
    
// 定义乐曲：《化蝶》（梁祝）
const tNote ButterflyLove[] =
{
	{L3, T/4},
    {L5, T/8+T/16},
    {L6, T/16},
    {M1, T/8+T/16},
    {M2, T/16},
    {L6, T/16},
    {M1, T/16},
    {L5, T/8},

    {M5, T/8+T/16},
    {H1, T/16},
    {M6, T/16},
    {M5, T/16},
    {M3, T/16},
    {M5, T/16},
    {M2, T/2},

    {M2, T/8},
    {M2, T/16},
    {M3, T/16},
    {L7, T/8},
    {L6, T/8},
    {L5, T/8+T/16},
    {L6, T/16},
    {M1, T/8},
    {M2, T/8},

    {L3, T/8},
    {M1, T/8},
    {L6, T/16},
    {L5, T/16},
    {L6, T/16},
    {M1, T/16},
    {L5, T/2},

    {M3, T/8+T/16},
    {M5, T/16},
    {L7, T/8},
    {M2, T/8},
    {L6, T/16},
    {M1, T/16},
    {L5, T/8},
    {L5, T/4},

    {L3, T/16},
    {L5, T/16},
    {L3, T/8},
    {L5, T/16},
    {L6, T/16},
    {L7, T/16},
    {M2, T/16},
    {L6, T/4+T/8},
    {L5, T/16},
    {L6, T/16},

    {M1, T/8+T/16},
    {M2, T/16},
    {M5, T/8},
    {M3, T/8},
    {M2, T/8},
    {M3, T/16},
    {M2, T/16},
    {M1, T/8},
    {L6, T/16},
    {L5, T/16},

    {L3, T/4},
    {M1, T/4},
    {L6, T/16},
    {M1, T/16},
    {L6, T/16},
    {L5, T/16},
    {L3, T/16},
    {L5, T/16},
    {L6, T/16},
    {M1, T/16},

    {L5, T/2},
    {0, T/4},
    {0, T/4}, 

    { 0, 0}      //  结束
};


// Little Star
const tNote LittleStar[] =
{
	{M1, T/4},
	{M1, T/4},
	{M5, T/4},
	{M5, T/4},

	{M6, T/4},
	{M6, T/4},
	{M5, T/2},

	{M4, T/4},
	{M4, T/4},
	{M3, T/4},
	{M3, T/4},	

	{M2, T/4},
	{M2, T/4},
	{M1, T/2},

	{0, 0},
};

// Long Long ago
const tNote LongLongAgo[] =
{
	{M1, T/4},
	{M1, T/8},
	{M2, T/8},
	{M3, T/4},
	{M3, T/8},
	{M4, T/8},
	{M5, T/4},

	{M6, T/8},
	{M5, T/8},
	{M3, T/2+T/4},

	{M5, T/4},
	{M4, T/8},
	{M3, T/8},
	{M2, T/2+T/4},	

	{M4, T/4},
	{M3, T/8},
	{M2, T/8},
	{M1, T/2+T/4},

	{0, 0},
};


// Long Long ago
const tNote LongLongAgo[] =
{
	{M1, T/4},
	{M1, T/8},
	{M2, T/8},
	{M3, T/4},
	{M3, T/8},
	{M4, T/8},
	{M5, T/4},

	{M6, T/8},
	{M5, T/8},
	{M3, T/2+T/4},

	{M5, T/4},
	{M4, T/8},
	{M3, T/8},
	{M2, T/2+T/4},	

	{M4, T/4},
	{M3, T/8},
	{M2, T/8},
	{M1, T/2+T/4},

	{0, 0},
};

    
#endif   /* __SCORE_H_ */
```

定义了音节和歌谱之后，按照如下方法调用：

```cpp
/************************************************************************************
** Function: playNote()
** Routine Description: - 
**     演奏乐曲，在PWM发声的同时点亮LED灯，反之熄灭
** Input parameters: - 
**    The Note Pointer. 
** Output parameters: NONE
** Returned Value: NONE
** Remarks:
** 
** Date created: 12:21:20,01/10/2012
** Author: tcpipstack
************************************************************************************/
void playNote(const tNote *pNote)
{
    while (1)
    {
		if (pNote->mTime == 0)
		{
			break;
		}

		setPWMFreq(pNote->mName);
		setPWMState(TRUE);
		ledOn(TARGET_LED_EN);
		SysCtlDelay(pNote->mTime * (SysCtlClockGet() / 2000));

		setPWMState(FALSE);
		ledOff(TARGET_LED_EN);
		SysCtlDelay(10 * (SysCtlClockGet() / 2000));
		
		pNote++;
    }

	SysCtlDelay(2000 * (SysCtlClockGet() / 2000));
}


/************************************************************************************
** Function: displayNoteName()
** Routine Description: - 
**     display the note name on the screen 
** Input parameters: - 
**    NONE 
** Output parameters: NONE
** Returned Value: NONE
** Remarks:
** 
** Date created: 12:32:45,01/10/2012
** Author: tcpipstack
************************************************************************************/
void displayNoteName(const tMusic *pMusic)
{	
	RIT128x96x4StringDraw(pMusic->cName, 0, 10*2+6, 11);
}
```

最后我们在uC/OS-II里面作为一个music任务，这样播放过程中不会被其他任务所抢占而中断:

```cpp
/************************************************************************************
** Function: taskMusic()
** Routine Description: - 
**     the Music Task  
** Input parameters: - 
**    NONE 
** Output parameters: NONE
** Returned Value: NONE
** Remarks:
** 
** Date created: 11:58:59,01/10/2012
** Author: Long.Luo
************************************************************************************/
static void taskMusic(void *parg)
{
    (void)parg;
    
    while (1) 
    {
		RIT128x96x4Clear();
    	RIT128x96x4StringDraw("Task Music", 30, 20, 15);       
		playNote(ButterflyLove);
    	OSTimeDly(2 * OS_TICKS_PER_SEC);  
	}
}
```

以上。


