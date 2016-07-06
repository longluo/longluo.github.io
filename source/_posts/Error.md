---
layout: post
title: Error
comments: true
date: 2016-06-21 16:08:15
tags:
categories:
keywords:
---

24  1224 E AndroidRuntime: java.lang.RuntimeException: Unable to start activity ComponentInfo{com.yulong.wear.watchface/com.yulong.wear.watchface.config.Multi
ity}: java.lang.IllegalStateException: Could not find wearable shared library classes. Please add <uses-library android:name="com.google.android.wearable" and
/> to the application manifest
24  1224 E AndroidRuntime:        at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2416)
24  1224 E AndroidRuntime:        at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2476)
24  1224 E AndroidRuntime:        at android.app.ActivityThread.access$900(ActivityThread.java:150)
24  1224 E AndroidRuntime:        at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1344)
24  1224 E AndroidRuntime:        at android.os.Handler.dispatchMessage(Handler.java:102)
24  1224 E AndroidRuntime:        at android.os.Looper.loop(Looper.java:148)
24  1224 E AndroidRuntime:        at android.app.ActivityThread.main(ActivityThread.java:5417)
24  1224 E AndroidRuntime:        at java.lang.reflect.Method.invoke(Native Method)
24  1224 E AndroidRuntime:        at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:726)
24  1224 E AndroidRuntime:        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:616)
24  1224 E AndroidRuntime: Caused by: java.lang.IllegalStateException: Could not find wearable shared library classes. Please add <uses-library android:name="
rable" android:required="false" /> to the application manifest
24  1224 E AndroidRuntime:        at android.support.wearable.activity.WearableActivity.initAmbientSupport(WearableActivity.java:166)
24  1224 E AndroidRuntime:        at android.support.wearable.activity.WearableActivity.onCreate(WearableActivity.java:66)
24  1224 E AndroidRuntime:        at com.yulong.wear.watchface.config.MultiTZWatchFaceConfigActivity.onCreate(MultiTZWatchFaceConfigActivity.java:53)
24  1224 E AndroidRuntime:        at android.app.Activity.performCreate(Activity.java:6285)
24  1224 E AndroidRuntime:        at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1108)
24  1224 E AndroidRuntime:        at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2369)
24  1224 E AndroidRuntime:        ... 9 more
56   972 E BoostFramework: BoostFramework() : Exception_1 = java.lang.ClassNotFoundException: Didn't find class "com.qualcomm.qti.Performance" on path: DexPat
Directories=[/vendor/lib, /system/lib]]
56   972 E BoostFramework: BoostFramework() : Exception_1 = java.lang.ClassNotFoundException: Didn't find class "com.qualcomm.qti.Performance" on path: DexPat
Directories=[/vendor/lib, /system/lib]]





01 14001 E AndroidRuntime: FATAL EXCEPTION: main
01 14001 E AndroidRuntime: Process: com.yulong.wear.watchface, PID: 14001
01 14001 E AndroidRuntime: java.lang.RuntimeException: Unable to instantiate service com.yulong.wear.watchface.ArtTopArcticWatchFace: java.lang.ClassNotFoundE
class "com.yulong.wear.watchface.ArtTopArcticWatchFace" on path: DexPathList[[zip file "/system/framework/com.google.android.wearable.jar", zip file "/data/ap
hface-1/base.apk"],nativeLibraryDirectories=[/data/app/com.yulong.wear.watchface-1/lib/arm, /vendor/lib, /system/lib]]
01 14001 E AndroidRuntime:        at android.app.ActivityThread.handleCreateService(ActivityThread.java:2862)
01 14001 E AndroidRuntime:        at android.app.ActivityThread.access$1900(ActivityThread.java:150)
01 14001 E AndroidRuntime:        at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1427)
01 14001 E AndroidRuntime:        at android.os.Handler.dispatchMessage(Handler.java:102)
01 14001 E AndroidRuntime:        at android.os.Looper.loop(Looper.java:148)
01 14001 E AndroidRuntime:        at android.app.ActivityThread.main(ActivityThread.java:5417)
01 14001 E AndroidRuntime:        at java.lang.reflect.Method.invoke(Native Method)
01 14001 E AndroidRuntime:        at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:726)
01 14001 E AndroidRuntime:        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:616)
01 14001 E AndroidRuntime: Caused by: java.lang.ClassNotFoundException: Didn't find class "com.yulong.wear.watchface.ArtTopArcticWatchFace" on path: DexPathLi
framework/com.google.android.wearable.jar", zip file "/data/app/com.yulong.wear.watchface-1/base.apk"],nativeLibraryDirectories=[/data/app/com.yulong.wear.wat
dor/lib, /system/lib]]
01 14001 E AndroidRuntime:        at dalvik.system.BaseDexClassLoader.findClass(BaseDexClassLoader.java:56)
01 14001 E AndroidRuntime:        at java.lang.ClassLoader.loadClass(ClassLoader.java:511)
01 14001 E AndroidRuntime:        at java.lang.ClassLoader.loadClass(ClassLoader.java:469)
01 14001 E AndroidRuntime:        at android.app.ActivityThread.handleCreateService(ActivityThread.java:2859)
01 14001 E AndroidRuntime:        ... 8 more
01 14001 E AndroidRuntime:        Suppressed: java.lang.NoClassDefFoundError: com.yulong.wear.watchface.ArtTopArcticWatchFace
01 14001 E AndroidRuntime:                at dalvik.system.DexFile.defineClassNative(Native Method)
01 14001 E AndroidRuntime:                at dalvik.system.DexFile.defineClass(DexFile.java:226)
01 14001 E AndroidRuntime:                at dalvik.system.DexFile.loadClassBinaryName(DexFile.java:219)
01 14001 E AndroidRuntime:                at dalvik.system.DexPathList.findClass(DexPathList.java:338)
01 14001 E AndroidRuntime:                at dalvik.system.BaseDexClassLoader.findClass(BaseDexClassLoader.java:54)
01 14001 E AndroidRuntime:                ... 11 more
01 14001 E AndroidRuntime:        Suppressed: java.lang.ClassNotFoundException: com.yulong.wear.watchface.ArtTopArcticWatchFace
01 14001 E AndroidRuntime:                at java.lang.Class.classForName(Native Method)
01 14001 E AndroidRuntime:                at java.lang.BootClassLoader.findClass(ClassLoader.java:781)
01 14001 E AndroidRuntime:                at java.lang.BootClassLoader.loadClass(ClassLoader.java:841)
01 14001 E AndroidRuntime:                at java.lang.ClassLoader.loadClass(ClassLoader.java:504)
01 14001 E AndroidRuntime:                ... 10 more
01 14001 E AndroidRuntime:        Caused by: java.lang.NoClassDefFoundError: Class not found using the boot class loader; no stack trace available
64   979 E BoostFramework: BoostFramework() : Exception_1 = java.lang.ClassNotFoundException: Didn't find class "com.qualcomm.qti.Performance" on path: DexPat
Directories=[/vendor/lib, /system/lib]]
64   979 E BoostFramework: BoostFramework() : Exception_1 = java.lang.ClassNotFoundException: Didn't find class "com.qualcomm.qti.Performance" on path: DexPat
Directories=[/vendor/lib, /system/lib]]
74  1720 E bt_l2cap: L2CAP - rcvd ACL for unknown handle:3804 ls:0 cid:10092 opcode:21 cur count:0
38 14019 E audio_hw_primary: voice_extn_compress_voip_is_active: COMPRESS_VOIP_ENABLED is not defined
38 14019 E ACDB-LOADER: Error: ACDB AudProc vol returned = -19
38 14019 E ACDB-LOADER: ACDB get afe topology for acdb id = 4, err = -8
38 14019 E ACDB-LOADER: Error: get ACDB afe topology result = -8
38 14019 E ACDB-LOADER: Error: ACDB AFE returned = -19
64   964 E InputMethodManagerService: Ignoring updateSystemUiLocked due to an invalid token. uid:1000 token:null
18   318 E qdutils : int qdutils::getHDMINode(): Failed to open fb node 1
18   318 E qdutils : int qdutils::getHDMINode(): Failed to open fb node 2
18   318 E qdutils : int qdutils::getHDMINode(): Failed to open fb node 3
18   318 E qdutils : int qdutils::getHDMINode(): Failed to find HDMI node



