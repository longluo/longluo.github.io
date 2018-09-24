---
layout: post
title: "一些Windows操作系统知识"
comments: true
date: 2013-06-25 16:20:46
tags: [工具, 效率, Windows]
categories: Tools
keywords: Windows, 知识, 工具, 效率,
---

Windows系统文件夹中的应用程序及路径：

1. windows图片和传真查看器不是以程序的方式存在，而是动态链接库的形式存在于explorer.exe程序中。shimgvw.dll做为一个线程插入到EXPLORER.EXE主程序中。路径为:C:\windows\system32\shimgvw.dll。动态链接库（DLL）的好处之一就是减少系统资源占用，不必为它再创建一个单独程序，而是插入其他程序以运行一些功能。如丢失其解决办法：开始--运行--输入regsvr32 shimgvw.dll 确定；  
2. All Users目录：此子目录下是电脑的所有用户及这些用户个人设定的开始菜单及桌面等信息；  
3. Application data目录：此目录存放了电脑用户安装应用程序时的一些数据信息；      
4. Cursors目录：Windows下用来表示系统各种状态的光标文件都放置在此目录下；       
5. Downloaded Program Files目录：如果你经常上网下载东西，此目录成为你下载软件的默认目录；  
6. Favorites目录：你上网时，添加到收藏夹里的网页都在这里；  
7. Fonts目录：Windows系统的字体文件以及以后你要增加的字体文件都存放在这个目录里；     
8. Help目录：Windows系统的帮助功能所涉及的全部文件；   
9. Media目录：此目录存放着系统的声音文件；   
10. Offline Web Pages目录：离线浏览的文件都放在此目录下； 
11. Tasks目录：对于给Windows系统添加的任务都存放在这里；  
12. Temp目录：主要存放执行解压缩与安装程序等对系统操作时临时文件；
13. Temporary Internet Files目录：存放浏览网页时产生的临时文件；  
14. system.ini.boot.ini.win.ini文件路径为:C:\WINDOWS\pss   
15. C:\WINDOWS\ime文件夹是日语韩语等输入法，键盘布局等       （IMJP8-1日语  IMKR6-1韩语  CHTIME简体中文输入法)   
16. C:\WINDOWS\Driver Cache\i386里的文件是XP的驱动备份,不能删除。 
17. C:\WINDOWS\inf INF是Device INFormation File的英文缩写，是Microsoft公司为硬件设备制造商发布其驱动程序推出的一种文件格式，INF文件中包含硬件设备的信息或脚本以控制硬件操作。在INF文件中指明了硬件驱动该如何安装到系统中，源文件在哪里、安装到哪一个文件夹中、怎样在注册表中加入自身相关信息等等。 安装监视器、调制解调器和打印机等设备所需的驱动程序，都是通过INF文件，正是INF的功劳才使得Windows可以找到这些硬件设备的驱动并正确安装。当我们通过“开始→控制面板→添加删除程序→Windows安装程序”来添加系统组件的时候，INF文件将会自动调用。而在其他场合下，则需要在INF文件上点击鼠标右键，然后选择“安装”，你才能顺利安装应用程序。因此c：\windows\inf下的文件千万不要删。 
18. C:\WINDOWS\java\Packages 是系统内JAVA类程序运行时用到的环境，一般不要删除，如删除后Java类的程序就不能运行了。      
19. 桌面壁纸图片文件路径为: C:\WINDOWS\Web\Wallpaper  
20. C:\WINDOWS\Microsoft.NET\Frameworknet文件夹 Framework这是.net框架，有的软件开发是基于这个框架的，没有这个框架，那个软件就不能运行。所以需不需要这个东西，关键要看你有没有基于这个环境的软件了。   
21. C:\WINDOWS\Resources\Themes文件夹  桌面显示--属性文件(WINDOWS主题文件) 路径。  
22. C:\WINDOWS\SHELLNEW文件夹---微软办公软件应用程序。  
23. C:\WINDOWS\system文件夹---是一个重要的系统文件夹，存放一些系统需要的动态链接库和驱动程序。   
24. C:\\WINDOWS\\system32...     windows是操作系统系统的文件，操作系统的中枢。system32 文件夹中包含了大量的用于 Windows 的文件. 这里主要用于存储 DLL 文件, 控制面板小程序(.CPL), 设备驱动 (.drv), 帮助文件 (.hlp 和 .cnt), MS-DOS 工具 (.com), 语言支持文件 (.nls), 屏幕保护 (.scr), 安装信息文件 (.inf), 以及其它用于支持, 配置, 或操作的文件.    
24. C:\WINDOWS\Web文件夹--系统文件夹。保存了活动桌面的web 配置内容，以及网络打印机的配置文件，别删！ 
25. C:\WINDOWS\WinSxS WinSxS是Windows目录下一个重要的目录，里面的文件是不可删除的。WinSxS下有很多重要的组件，版本也很繁杂，为了保证Windows的正常运行，请确保这些文件一个都不能少。这些文件支撑着mscorwks.dll，没有它mscorwks也无法加载。强行删除后可能只有以安全模式能勉强进入Windows，Windows也就废了。    
26. C:\WINDOWS\Microsoft.NET\Framework文件夹  mscorwks.dll是系统正常运转、各种办公软件、游戏运行所不可或缺的重要文件！在木马病毒或是误操作的情况下，您的系统是否经常提示一些让您手足无措的信息，比如：《系统文件mscorwks.dll损坏或者找不到指定的系统mscorwks.dll》文件提示。
Dll文件是什么：动态链接库（Dynamic Link Library或者Dynamic-link library，缩写为mscorwks.dll，又称为动态连结库，是微软公司在微软视窗操作系统中实现共享函数库概念的一种实作方式。这类文件中封装了系统正常运行所不可或缺的大量代码。简而言之 - 如果系统中的mscorwks.dll文件损坏、找不到,您的电脑将不能够正常的使用。
27. C:\WINDOWS\explorer--资源管理器应用程序
28. C:\WINDOWS\MicCal----麦克风校正应用程序
29. C:\WINDOWS\Notepad---记事本应用程序
30. C:\WINDOWS\regedit---注册表编辑器应用程序
31. C:\WINDOWS\Realtek---正常的声卡驱动服务
32. C:\WINDOWS\winhlp32--“打开”应用程序
33. \WINDOWS\system32\Diskpart--命令行模式的磁盘管理工具.  
34. Accstat.exe 回收站可执行程序；  
35. Calc.exe 系统自带的计算器；  
36. Cdplayer.exe系统自带的CD播放器；  
37. Cleanmgr.exe 磁盘清理工具；  
38. Command.com 命令解释程序，实现进入MS-DOS状态；  
39. Control.exe 控制面板可执行程序；  
40. Cvtaplog.exe 磁盘碎片整理的辅助程序；  
41. Defrag.exe 磁盘碎片整理程序；  
42. Emm386.exe 扩展内存管理程序；  
43. Explorer.exe 该程序启动“资源管理器”；  
44. Fontview.exe 字体查看程序；  
45. Freecell.exe 空当接龙游戏，Mshearts.exe网上红心大战游戏，   Sol.exe纸牌游戏，Winmine.exe扫雷游戏；  
46. Notepad.exe Windows系统的记事本；  
47. Pbrush.exe Windows系统的画图程序；  
48. Ping.exe 用于检查测试本机的网线是否与主机建立联系；  
49. regedit.exe 注册表编辑器；  
50. Scandskw.exe 用于可修复磁盘表面和磁盘上的数据错误的扫描程序  51.Scanregw.exe 该程序可检查注册表的错误，若正确，提示备份；  
52. Sndrec32.exe Windows系统自带的录音机，声音文件格式为*.wav；  
53. Sndvol32.exe 音量调节程序；  
54. Winfile.exe 文件管理器，该程序可查找、查看文件和文件夹，显示文    件信息及其相应的操作;  
55. write.exe 写字板。  

当大家了解了Windows的目录中的内容后，操作起来可以省事不少。比如，我们要打开“记事本”，通常情况下我们需要依次打开“开始／程序／附件／记事本”，而如果我们知道了Notepad.exe文件就是打开“记事本”的可执行程序的话，那么我们只需要在“开始／运行”当中输入“Notepad.exe”，就可以打开“记事本”了。

