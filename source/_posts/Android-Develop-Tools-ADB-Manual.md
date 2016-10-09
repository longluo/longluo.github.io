---
layout: post
title: "Android ADB "
comments: true
date: 2016-10-01 15:18:20
tags: [Android, ADB, ]
categories: Android
keywords:
---



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








