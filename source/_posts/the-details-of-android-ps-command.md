---
layout: post
title: "深入理解Android中查看进程(ps)命令"
comments: true
date: 2016-06-04 01:18:18
tags: [Android, ps, 进程]
categories: Android
keywords: Android, ps, 进程, Linux, 命令
---

***By Long Luo***

>注:
    这篇文章是2013年发表在个人[CSDN Blog](http://blog.csdn.net/tcpipstack/)上[解析ANDROID ps命令执行后各项参数的含义](http://blog.csdn.net/tcpipstack/article/details/8541980)，今天将其移到个人独立博客站上。

如何查看**Android**进程信息呢？

可以打开`adb shell`，然后我们就有2种方法：

# 1. 直接输入ps命令

输入之后，我们就可以看到如下的信息：

```bash
# ps
ps
USER     PID   PPID  VSIZE  RSS     WCHAN    PC         NAME
root      1     0     276    188   c0099f1c 000086e8 S /init
root      2     0     0      0     c004df64 00000000 S kthreadd
root      3     2     0      0     c003fa28 00000000 S ksoftirqd/0
root      4     2     0      0     c004abc0 00000000 S events/0
root      5     2     0      0     c004abc0 00000000 S khelper
root      6     2     0      0     c004abc0 00000000 S suspend
root      7     2     0      0     c004abc0 00000000 S kblockd/0
root      8     2     0      0     c004abc0 00000000 S cqueue
root      9     2     0      0     c01780d0 00000000 S kseriod
root      10    2     0      0     c004abc0 00000000 S kmmcd
root      11    2     0      0     c006efa8 00000000 S pdflush
root      12    2     0      0     c006efa8 00000000 S pdflush
root      13    2     0      0     c0073480 00000000 S kswapd0
root      14    2     0      0     c004abc0 00000000 S aio/0
root      22    2     0      0     c0175900 00000000 S mtdblockdc
```

那么我们禁不住要问：

	USER     PID   PPID  VSIZE  RSS     WCHAN    PC         NAME
	
## 那么这些项各代表着什么意思呢？

1. USER：  进程的当前用户；
2. PID ： 毫无疑问, process ID的缩写，也就进程号；
3. PPID  ：process parent ID，父进程ID
4. VSIZE  ： virtual size，进程虚拟地址空间大小；
5. RSS    ： 进程正在使用的物理内存的大小；
6. WCHAN  ：进程如果处于休眠状态的话，在内核中的地址；
7. PC  ： program counter，
8. NAME: process name，进程的名称

## 和`Linux ps`命令对比:

Android的内核还是Linux的，我们可以和Linux下ps aux命令的各项参数进行对比，可见：

```bash
root@long-desktop:~# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.2   2804  1684 ?        Ss   21:11   0:01 /sbin/init
root         2  0.0  0.0      0     0 ?        S    21:11   0:00 [kthreadd]
root      2286  0.0  0.4   8888  3172 ?        Ss   21:52   0:00 sshd: root@pts/0    
root      2352  0.0  0.2   4684  2048 pts/0    Ss+  21:52   0:00 -bash
root      2454  0.4  0.4   8888  3164 ?        Rs   22:06   0:00 sshd: root@pts/1    
root      2518  0.1  0.2   4684  2004 pts/1    Ss   22:06   0:00 -bash
root      2551  0.0  0.1   2736  1088 pts/1    R+   22:06   0:00 ps aux
```

<!--more-->

## 在Linux下ps命令各项含义如下所示：

- %CPU 进程的cpu占用率
- %MEM 进程的内存占用率
- VSZ 进程所使用的虚存的大小
- RSS 进程使用的驻留集大小或者是实际内存的大小
- TTY 与进程关联的终端（tty）
- STAT 检查的状态：进程状态使用字符表示的，如R（running正在运行或准备运行）、S（sleeping睡眠）、I（idle空闲）、Z (僵死)、D（不可中断的睡眠，通常是I/O）、P（等待交换页）、W（换出,表示当前页面不在内存）、N（低优先级任务）T(terminate终 止)、W has no resident pages
- START （进程启动时间和日期）
- TIME ;（进程使用的总cpu时间）
- COMMAND （正在执行的命令行命令）
- NI (nice)优先级
- PRI 进程优先级编号
- PPID 父进程的进程ID（parent process id）
- SID 会话ID（session id）
- WCHAN 进程正在睡眠的内核函数名称；该函数的名称是从/root/system.map文件中获得的。
- FLAGS 与进程相关的数字标识

## android ps命令实现的源码

android下ps命令的源码的位置：`android/system/core/toolbox/ps.c`，其实现如下：

```cpp
int ps_main(int argc, char **argv)
{
    DIR *d;
    struct dirent *de;
    char *namefilter = 0;
    int pidfilter = 0;
    int threads = 0;
    
    d = opendir("/proc");
    if(d == 0) return -1;

    while(argc > 1){
        if(!strcmp(argv[1],"-t")) {
            threads = 1;
        } else if(!strcmp(argv[1],"-x")) {
            display_flags |= SHOW_TIME;
        } else if(!strcmp(argv[1],"-p")) {
            display_flags |= SHOW_PRIO;
        }  else if(isdigit(argv[1][0])){
            pidfilter = atoi(argv[1]);
        } else {
            namefilter = argv[1];
        }
        argc--;
        argv++;
    }

    printf("USER     PID   PPID  VSIZE RSS   %sWCHAN    PC         NAME\n", 
           (display_flags&SHOW_PRIO)?"PRIO  NICE  RTPRI SCHED ":"");
    while((de = readdir(d)) != 0){
        if(isdigit(de->d_name[0])){
            int pid = atoi(de->d_name);
            if(!pidfilter || (pidfilter == pid)) {
                ps_line(pid, 0, namefilter);
                if(threads) ps_threads(pid, namefilter);
            }
        }
    }
    closedir(d);
    return 0;
}
```

我们可以得到每一行数据是如何获得的：

```cpp
static int ps_line(int pid, int tid, char *namefilter)
{
    char statline[1024];
    char cmdline[1024];
    char user[32];
    struct stat stats;
    int fd, r;
    char *ptr, *name, *state;
    int ppid, tty;
    unsigned wchan, rss, vss, eip;
    unsigned utime, stime;
    int prio, nice, rtprio, sched;
    struct passwd *pw;
    
    sprintf(statline, "/proc/%d", pid);
    stat(statline, &stats);

    if(tid) {
        sprintf(statline, "/proc/%d/task/%d/stat", pid, tid);
        cmdline[0] = 0;
    } else {
        sprintf(statline, "/proc/%d/stat", pid);
        sprintf(cmdline, "/proc/%d/cmdline", pid);    
        fd = open(cmdline, O_RDONLY);
        if(fd == 0) {
            r = 0;
        } else {
            r = read(fd, cmdline, 1023);
            close(fd);
            if(r < 0) r = 0;
        }
        cmdline[r] = 0;
    }
    
    fd = open(statline, O_RDONLY);
    if(fd == 0) return -1;
    r = read(fd, statline, 1023);
    close(fd);
    if(r < 0) return -1;
    statline[r] = 0;

    ptr = statline;
    nexttok(&ptr); // skip pid
    ptr++;          // skip "("

    name = ptr;
    ptr = strrchr(ptr, ')'); // Skip to *last* occurence of ')',
    *ptr++ = '\0';           // and null-terminate name.

    ptr++;          // skip " "
    state = nexttok(&ptr);
    ppid = atoi(nexttok(&ptr));
    nexttok(&ptr); // pgrp
    nexttok(&ptr); // sid
    tty = atoi(nexttok(&ptr));
    
    nexttok(&ptr); // tpgid
    nexttok(&ptr); // flags
    nexttok(&ptr); // minflt
    nexttok(&ptr); // cminflt
    nexttok(&ptr); // majflt
    nexttok(&ptr); // cmajflt
#if 1
    utime = atoi(nexttok(&ptr));
    stime = atoi(nexttok(&ptr));
#else
    nexttok(&ptr); // utime
    nexttok(&ptr); // stime
#endif
    nexttok(&ptr); // cutime
    nexttok(&ptr); // cstime
    prio = atoi(nexttok(&ptr));
    nice = atoi(nexttok(&ptr));
    nexttok(&ptr); // threads
    nexttok(&ptr); // itrealvalue
    nexttok(&ptr); // starttime
    vss = strtoul(nexttok(&ptr), 0, 10); // vsize
    rss = strtoul(nexttok(&ptr), 0, 10); // rss
    nexttok(&ptr); // rlim
    nexttok(&ptr); // startcode
    nexttok(&ptr); // endcode
    nexttok(&ptr); // startstack
    nexttok(&ptr); // kstkesp
    eip = strtoul(nexttok(&ptr), 0, 10); // kstkeip
    nexttok(&ptr); // signal
    nexttok(&ptr); // blocked
    nexttok(&ptr); // sigignore
    nexttok(&ptr); // sigcatch
    wchan = strtoul(nexttok(&ptr), 0, 10); // wchan
    nexttok(&ptr); // nswap
    nexttok(&ptr); // cnswap
    nexttok(&ptr); // exit signal
    nexttok(&ptr); // processor
    rtprio = atoi(nexttok(&ptr)); // rt_priority
    sched = atoi(nexttok(&ptr)); // scheduling policy
    
    tty = atoi(nexttok(&ptr));
    
    if(tid != 0) {
        ppid = pid;
        pid = tid;
    }

    pw = getpwuid(stats.st_uid);
    if(pw == 0) {
        sprintf(user,"%d",(int)stats.st_uid);
    } else {
        strcpy(user,pw->pw_name);
    }
    
    if(!namefilter || !strncmp(name, namefilter, strlen(namefilter))) {
        printf("%-8s %-5d %-5d %-5d %-5d", user, pid, ppid, vss / 1024, rss * 4);
        if(display_flags&SHOW_PRIO)
            printf(" %-5d %-5d %-5d %-5d", prio, nice, rtprio, sched);
        printf(" %08x %08x %s %s", wchan, eip, state, cmdline[0] ? cmdline : name);
        if(display_flags&SHOW_TIME)
            printf(" (u:%d, s:%d)", utime, stime);
        printf("\n");
    }
    return 0;
}
```

## 进入/proc文件夹
在/proc文件夹下有很多对应进程ID号的子文件夹：

```bash
drwxr-xr-x  23 root       root             4096 2012-10-01 02:09 ../
dr-xr-xr-x   7 root       root                0 2013-01-25 21:10 1/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:10 10/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:11 1001/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:11 1076/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:10 11/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:10 12/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:10 13/
dr-xr-xr-x   7 gdm        gdm                 0 2013-01-25 21:11 1345/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:11 1353/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:11 1375/
dr-xr-xr-x   7 root       root                0 2013-01-25 21:10 14/
```

我们可以进入对应的文件夹内，可以看到有以下信息，就可以查询到你的进程信息了。

***By Long Luo 2016-6-4 02:34:46 ~ 2016-6-4 02:48:18 at Shenzhen, China.***




