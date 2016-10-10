---
layout: post
title: "Android ADB工具"
comments: true
date: 2016-10-01 15:18:20
tags: [Android, ADB, ]
categories: Android
keywords: Android, ADB, Tools, 工具, 效率,
---

***By Long Luo***

ADB工具是Android开发中使用很频繁也是非常重要的一个工具，用于手机与电脑的通信。

# Help




# 无线调试

### 


# 截图与录屏

```
adb shell screencap -p /sdcard/screenshot.png 
```

```
adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > ./screenshot.png 
```

# 帧率分析

```
adb shell dumpsys gfxinfo 包名
```



# dumpsys





# Logcat




# Bugreport








