---
layout: post
title: "Android ADB工具"
comments: true
date: 2016-10-01 15:18:20
tags: [Android, ADB, Tools]
categories: Android
keywords: Android, ADB, Tools, 工具, 效率,
---


***By Long Luo***

ADB工具是Android开发中使用很频繁也是非常重要的一个工具，用于手机与电脑的通信。

# Help

```
E:\Tools>adb shell pm help
Error: unknown command 'help'
usage: pm list packages [-f] [-d] [-e] [-s] [-3] [-i] [-u] [--user USER_ID] [FILTER]
       pm list permission-groups
       pm list permissions [-g] [-f] [-d] [-u] [GROUP]
       pm list instrumentation [-f] [TARGET-PACKAGE]
       pm list features
       pm list libraries
       pm list users
       pm path PACKAGE
       pm dump PACKAGE
       pm install [-lrtsfd] [-i PACKAGE] [--user USER_ID] [PATH]
       pm install-create [-lrtsfdp] [-i PACKAGE] [-S BYTES]
               [--install-location 0/1/2]
               [--force-uuid internal|UUID]
       pm install-write [-S BYTES] SESSION_ID SPLIT_NAME [PATH]
       pm install-commit SESSION_ID
       pm install-abandon SESSION_ID
       pm uninstall [-k] [--user USER_ID] PACKAGE
       pm set-installer PACKAGE INSTALLER
       pm move-package PACKAGE [internal|UUID]
       pm move-primary-storage [internal|UUID]
       pm clear [--user USER_ID] PACKAGE
       pm enable [--user USER_ID] PACKAGE_OR_COMPONENT
       pm disable [--user USER_ID] PACKAGE_OR_COMPONENT
       pm disable-user [--user USER_ID] PACKAGE_OR_COMPONENT
       pm disable-until-used [--user USER_ID] PACKAGE_OR_COMPONENT
       pm hide [--user USER_ID] PACKAGE_OR_COMPONENT
       pm unhide [--user USER_ID] PACKAGE_OR_COMPONENT
       pm grant [--user USER_ID] PACKAGE PERMISSION
       pm revoke [--user USER_ID] PACKAGE PERMISSION
       pm reset-permissions
       pm set-app-link [--user USER_ID] PACKAGE {always|ask|never|undefined}
       pm get-app-link [--user USER_ID] PACKAGE
       pm set-install-location [0/auto] [1/internal] [2/external]
       pm get-install-location
       pm set-permission-enforced PERMISSION [true|false]
       pm trim-caches DESIRED_FREE_SPACE [internal|UUID]
       pm create-user [--profileOf USER_ID] [--managed] USER_NAME
       pm remove-user USER_ID
       pm get-max-users

pm list packages: prints all packages, optionally only
  those whose package name contains the text in FILTER.  Options:
    -f: see their associated file.
    -d: filter to only show disbled packages.
    -e: filter to only show enabled packages.
    -s: filter to only show system packages.
    -3: filter to only show third party packages.
    -i: see the installer for the packages.
    -u: also include uninstalled packages.

pm list permission-groups: prints all known permission groups.

pm list permissions: prints all known permissions, optionally only
  those in GROUP.  Options:
    -g: organize by group.
    -f: print all information.
    -s: short summary.
    -d: only list dangerous permissions.
    -u: list only the permissions users will see.

pm list instrumentation: use to list all test packages; optionally
  supply <TARGET-PACKAGE> to list the test packages for a particular
  application.  Options:
    -f: list the .apk file for the test package.

pm list features: prints all features of the system.

pm list users: prints all users on the system.

pm path: print the path to the .apk of the given PACKAGE.

pm dump: print system state associated with the given PACKAGE.

pm install: install a single legacy package
pm install-create: create an install session
    -l: forward lock application
    -r: replace existing application
    -t: allow test packages
    -i: specify the installer package name
    -s: install application on sdcard
    -f: install application on internal flash
    -d: allow version code downgrade
    -p: partial application install
    -g: grant all runtime permissions
    -S: size in bytes of entire session

pm install-write: write a package into existing session; path may
  be '-' to read from stdin
    -S: size in bytes of package, required for stdin

pm install-commit: perform install of fully staged session
pm install-abandon: abandon session

pm set-installer: set installer package name

pm uninstall: removes a package from the system. Options:
    -k: keep the data and cache directories around after package removal.

pm clear: deletes all data associated with a package.

pm enable, disable, disable-user, disable-until-used: these commands
  change the enabled state of a given package or component (written
  as "package/class").

pm grant, revoke: these commands either grant or revoke permissions
    to apps. The permissions must be declared as used in the app's
    manifest, be runtime permissions (protection level dangerous),
    and the app targeting SDK greater than Lollipop MR1.

pm reset-permissions: revert all runtime permissions to their default state.

pm get-install-location: returns the current install location.
    0 [auto]: Let system decide the best location
    1 [internal]: Install on internal device storage
    2 [external]: Install on external media

pm set-install-location: changes the default install location.
  NOTE: this is only intended for debugging; using this can cause
  applications to break and other undersireable behavior.
    0 [auto]: Let system decide the best location
    1 [internal]: Install on internal device storage
    2 [external]: Install on external media

pm trim-caches: trim cache files to reach the given free space.

pm create-user: create a new user with the given USER_NAME,
  printing the new user identifier of the user.

pm remove-user: remove the user with the given USER_IDENTIFIER,
  deleting all data associated with that user
```

<!--more-->

获取安装包

```
E:\Tools>adb shell pm list packages -s
package:com.qualcomm.qti.auth.sampleextauthservice
package:com.android.providers.telephony
package:com.miui.powerkeeper
package:com.unionpay.tsmservice.mi
package:com.android.providers.calendar
package:com.android.providers.media
package:com.milink.service
package:com.qti.service.colorservice
package:com.securespaces.android.trustagent
package:com.qualcomm.qti.modemtestmode
package:com.xiaomi.account
package:com.qualcomm.shutdownlistner
package:com.android.wallpapercropper
package:com.quicinc.cne.CNEService
package:com.qcom.matcli
package:com.miui.milivetalk
package:org.simalliance.openmobileapi.service
package:com.android.updater
package:com.android.documentsui
package:com.android.galaxy4
package:com.android.externalstorage
package:com.qualcomm.uimremoteclient
package:com.xiaomi.gamecenter.sdk.service
package:com.android.htmlviewer
package:com.miui.securityadd
package:com.miui.gallery
package:com.android.quicksearchbox
package:com.android.mms.service
package:com.android.providers.downloads
package:com.qualcomm.qti.auth.sampleauthenticatorservice
package:com.xiaomi.payment
package:com.miui.securitycenter
package:com.android.NFCtestSvc
package:com.xiaomi.android.dm.service
package:com.qualcomm.qti.telephonyservice
package:com.android.browser
package:com.miui.systemAdSolution
package:com.android.providers.applications
package:com.miui.tsmclient
package:com.qualcomm.qti.auth.fidocryptoservice
package:com.android.soundrecorder
package:com.android.defcontainer
package:com.miui.guardprovider
package:com.android.providers.downloads.ui
package:com.android.pacprocessor
package:com.miui.backup
package:com.android.certinstaller
package:com.android.carrierconfig
package:org.codeaurora.bluetooth
package:com.qti.qualcomm.datastatusnotification
package:android
package:com.android.contacts
package:com.qualcomm.wfd.service
package:com.miui.securitycore
package:com.qualcomm.qti.GBAHttpAuthentication.auth
package:com.android.mms
package:com.android.nfc
package:com.android.stk
package:com.android.backupconfirm
package:com.xiaomi.nvitemjni
package:com.miui.player
package:com.android.provision
package:org.codeaurora.ims
package:com.android.statementservice
package:com.miui.system
package:com.android.wallpaper.holospiral
package:com.android.calendar
package:com.android.phasebeam
package:com.miui.translation.kingsoft
package:com.miui.virtualsim
package:com.miui.compass
package:com.qualcomm.qti.auth.secureextauthservice
package:com.miui.cit
package:com.miui.rom
package:com.qti.primarycardcontroller
package:com.qualcomm.qcrilmsgtunnel
package:com.android.providers.settings
package:com.android.sharedstoragebackup
package:com.android.printspooler
package:com.android.dreams.basic
package:com.android.incallui
package:com.android.frameworks.telresources
package:com.miui.bugreport
package:com.android.inputdevices
package:com.qualcomm.qti.auth.securesampleauthservice
package:com.qti.dpmserviceapp
package:com.android.fileexplorer
package:com.qti.xdivert
package:com.miui.stepsprovider
package:com.xiaomi.metok
package:com.android.musicfx
package:com.miui.cloudbackup
package:com.android.cellbroadcastreceiver
package:com.google.android.webview
package:com.android.onetimeinitializer
package:com.mipay.wallet
package:com.android.server.telecom
package:com.android.keychain
package:com.android.keyguard
package:com.android.camera
package:com.xiaomi.pass
package:com.xiaomi.upnp
package:com.xiaomi.xmsf
package:com.google.android.packageinstaller
package:com.android.calllogbackup
package:com.fingerprints.serviceext
package:com.svox.pico
package:com.dsi.ant.server
package:com.xiaomi.finddevice
package:com.android.proxyhandler
package:com.miui.mipub
package:com.miui.notes
package:com.miui.video
package:com.xiaomi.market
package:com.xiaomi.midrop
package:com.xiaomi.miplay
package:com.miui.translationservice
package:com.miui.cloudservice
package:com.android.managedprovisioning
package:com.android.dreams.phototable
package:com.sohu.inputmethod.sogou.xiaomi
package:com.miui.touchassistant
package:com.xiaomi.vip
package:com.xiaomi.providers.appindex
package:com.android.noisefield
package:com.securespaces.android.ssm.service
package:com.android.smspush
package:com.miui.calculator
package:com.cleanmaster.sdk
package:com.android.wallpaper.livepicker
package:com.android.apps.tag
package:com.qualcomm.qti.seemp.service
package:com.miui.miwallpaper
package:com.xiaomi.gamecenter
package:com.miui.cleanmaster
package:com.miui.analytics
package:com.android.settings
package:com.qualcomm.qti.ims
package:com.miui.weather2
package:com.quicinc.wbcserviceapp
package:com.miui.sysbase
package:com.qualcomm.location
package:com.xiaomi.scanner
package:com.miui.networkassistant
package:com.qualcomm.qti.tetherservice
package:com.miui.yellowpage
package:com.miui.antispam
package:com.android.wallpaper
package:com.qualcomm.qti.services.secureui
package:com.android.vpndialogs
package:com.android.email
package:com.miui.voiceassist
package:com.android.phone
package:com.android.shell
package:com.android.providers.userdictionary
package:com.miui.providers.weather
package:com.android.location.fused
package:com.android.deskclock
package:com.android.systemui
package:com.android.bluetoothmidiservice
package:com.amap.android.location
package:com.qualcomm.qti.networksetting
package:com.android.thememanager
package:com.qualcomm.fastdormancy
package:com.qualcomm.qti.auth.fidosuiservice
package:com.qualcomm.qti.biometrics.voiceprint.service
package:com.lbe.security.miui
package:com.miui.whetstone
package:com.android.bluetooth
package:com.qualcomm.timeservice
package:com.qualcomm.embms
package:com.android.providers.contacts
package:com.android.captiveportallogin
package:com.miui.core
package:com.miui.home
package:com.miui.voip
```

查找其安装位置:

```
E:\Tools>adb shell pm list packages -f | grep "tencent"
package:/data/app/com.tencent.androidqqmail-1/base.apk=com.tencent.androidqqmail
package:/data/app/com.tencent.mm-1/base.apk=com.tencent.mm
package:/data/app/com.tencent.qqlive-1/base.apk=com.tencent.qqlive
package:/data/app/com.tencent.weread-1/base.apk=com.tencent.weread
package:/data/app/com.tencent.mobileqq-1/base.apk=com.tencent.mobileqq
```

# 无线调试

[https://developer.android.com/studio/command-line/adb.html](https://developer.android.com/studio/command-line/adb.html)

## 获取设备IP



## 通过TCP端口连接

```
adb connect 
```

## 断开连接

```
adb disconnect 
```

# 截图与录屏

```
adb shell screencap -p /sdcard/screenshot.png 
```

```
adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > screenshot.png 
```

# 帧率分析


```
adb shell dumpsys gfxinfo 包名
```

```
E:\Tools>adb shell dumpsys gfxinfo com.tencent.mobileqq > fps.txt
Applications Graphics Acceleration Info:
Uptime: 27522172 Realtime: 73274303

** Graphics info for pid 18222 [com.tencent.mobileqq] **

Stats since: 9858093255087ns
Total frames rendered: 2546
Janky frames: 203 (7.97%)
90th percentile: 14ms
95th percentile: 20ms
99th percentile: 53ms
Number Missed Vsync: 42
Number High input latency: 0
Number Slow UI thread: 82
Number Slow bitmap uploads: 13
Number Slow issue draw commands: 108

Caches:
Current memory usage / total memory usage (bytes):
  TextureCache          1636784 / 75497472
  LayerCache                  0 / 50331648 (numLayers = 0)
  Layers total          0 (numLayers = 0)
  RenderBufferCache           0 /  8388608
  GradientCache               0 /  1048576
  PathCache                   0 / 33554432
  TessellationCache           0 /  1048576
  TextDropShadowCache         0 /  6291456
  PatchCache               8448 /   131072
  FontRenderer 0 A8     1048576 /  1048576
  FontRenderer 0 RGBA         0 /        0
  FontRenderer 0 total  1048576 /  1048576
Other:
  FboCache                    0 /        0
Total memory usage:
  2693808 bytes, 2.57 MB

Profile data in ms:

	com.tencent.mobileqq/com.tencent.mobileqq.activity.SplashActivity/android.view.ViewRootImpl@51687fd (visibility=0)
Stats since: 9858093255087ns
Total frames rendered: 2546
Janky frames: 203 (7.97%)
90th percentile: 14ms
95th percentile: 20ms
99th percentile: 53ms
Number Missed Vsync: 42
Number High input latency: 0
Number Slow UI thread: 82
Number Slow bitmap uploads: 13
Number Slow issue draw commands: 108

View hierarchy:

  com.tencent.mobileqq/com.tencent.mobileqq.activity.SplashActivity/android.view.ViewRootImpl@51687fd
  224 views, 212.96 kB of display lists


Total ViewRootImpl: 1
Total Views:        224
Total DisplayList:  212.96 kB
```

# dumpsys

- Activity
- cpuinfo
- meminfo
- package
- window
- statusbar
- battery/batteryinfo
- alarm


# Logcat

## help

```
E:\Tools>adb logcat --help
Usage: logcat [options] [filterspecs]
options include:
  -s              Set default filter to silent.
                  Like specifying filterspec '*:S'
  -f <filename>   Log to file. Default is stdout
  -r <kbytes>     Rotate log every kbytes. Requires -f
  -n <count>      Sets max number of rotated logs to <count>, default 4
  -v <format>     Sets the log print format, where <format> is:

                      brief color long printable process raw tag thread
                      threadtime time usec

  -D              print dividers between each log buffer
  -c              clear (flush) the entire log and exit
  -d              dump the log and then exit (don't block)
  -t <count>      print only the most recent <count> lines (implies -d)
  -t '<time>'     print most recent lines since specified time (implies -d)
  -T <count>      print only the most recent <count> lines (does not imply -d)
  -T '<time>'     print most recent lines since specified time (not imply -d)
                  count is pure numerical, time is 'MM-DD hh:mm:ss.mmm'
  -g              get the size of the log's ring buffer and exit
  -L              dump logs from prior to last reboot
  -b <buffer>     Request alternate ring buffer, 'main', 'system', 'radio',
                  'events', 'crash' or 'all'. Multiple -b parameters are
                  allowed and results are interleaved. The default is
                  -b main -b system -b crash.
  -B              output the log in binary.
  -S              output statistics.
  -G <size>       set size of log ring buffer, may suffix with K or M.
  -p              print prune white and ~black list. Service is specified as
                  UID, UID/PID or /PID. Weighed for quicker pruning if prefix
                  with ~, otherwise weighed for longevity if unadorned. All
                  other pruning activity is oldest first. Special case ~!
                  represents an automatic quicker pruning for the noisiest
                  UID as determined by the current statistics.
  -P '<list> ...' set prune white and ~black list, using same format as
                  printed above. Must be quoted.

filterspecs are a series of 
  <tag>[:priority]

where <tag> is a log component tag (or * for all) and priority is:
  V    Verbose (default for <tag>)
  D    Debug (default for '*')
  I    Info
  W    Warn
  E    Error
  F    Fatal
  S    Silent (suppress all output)

'*' by itself means '*:D' and <tag> by itself means <tag>:V.
If no '*' filterspec or -s on command line, all filter defaults to '*:V'.
eg: '*:S <tag>' prints only <tag>, '<tag>:S' suppresses all <tag> log messages.

If not specified on the command line, filterspec is set from ANDROID_LOG_TAGS.

If not specified with -v on command line, format is set from ANDROID_PRINTF_LOG
or defaults to "threadtime"
```

## 第三方Logcat

[https://github.com/JakeWharton/pidcat](https://github.com/JakeWharton/pidcat)


# Bugreport






