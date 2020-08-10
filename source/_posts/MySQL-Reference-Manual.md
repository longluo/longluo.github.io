---
layout: post
title: "MySQL常用操作指南"
comments: true
date: 2016-09-20 19:51:09
tags: [MySQL, Tools, 效率, 数据库]
categories: DataBase
keywords: MySQL, 数据库, 工具, 效率, 指南, 
---

***By Long Luo***


```text
-rw-r--r--  1 root  mysql  17987 Jan 15  2016 COPYING
-rw-r--r--  1 root  mysql 151708 Jan 15  2016 INSTALL-BINARY
-rw-r--r--  1 root  mysql   2496 Jan 15  2016 README
drwxr-xr-x  2 root  mysql   4096 Sep  9 15:06 bin
drwxr-xr-x  3 root  mysql   4096 Sep  9 15:06 data
drwxr-xr-x  2 root  mysql   4096 Sep  9 15:06 docs
drwxr-xr-x  3 root  mysql   4096 Sep  9 15:06 include
drwxr-xr-x  3 root  mysql   4096 Sep  9 15:06 lib
drwxr-xr-x  4 root  mysql   4096 Sep  9 15:06 man
drwxr-xr-x 10 root  mysql   4096 Sep  9 15:06 mysql-test
drwxr-xr-x  2 root  mysql   4096 Sep  9 15:06 scripts
drwxr-xr-x 27 root  mysql   4096 Sep  9 15:06 share
drwxr-xr-x  4 root  mysql   4096 Sep  9 15:06 sql-bench
drwxr-xr-x  2 root  mysql   4096 Sep  9 15:06 support-files
drwxr-xr-x  5 mysql mysql   4096 Sep 14 17:13 var
```


# MySQL配置文件



# MySQL数据库表

```text
drwx------ 2 mysql mysql     4096 Sep 14 09:05 blog
-rw-rw---- 1 mysql mysql  5242880 Sep 21 09:03 ib_logfile0
-rw-rw---- 1 mysql mysql  5242880 Sep 19 23:01 ib_logfile1
-rw-rw---- 1 mysql mysql 27262976 Sep 21 09:03 ibdata1
drwx------ 2 mysql mysql     4096 Sep  9 15:06 mysql
-rw-rw---- 1 mysql mysql    27732 Sep  9 15:06 mysql-bin.000001
-rw-rw---- 1 mysql mysql  1113246 Sep  9 15:06 mysql-bin.000002
-rw-rw---- 1 mysql mysql      264 Sep  9 15:06 mysql-bin.000003
-rw-rw---- 1 mysql mysql     1112 Sep  9 15:06 mysql-bin.000004
-rw-rw---- 1 mysql mysql      126 Sep  9 15:06 mysql-bin.000005
-rw-rw---- 1 mysql mysql      126 Sep  9 16:41 mysql-bin.000006
-rw-rw---- 1 mysql mysql      126 Sep  9 16:45 mysql-bin.000007
-rw-rw---- 1 mysql mysql      126 Sep  9 16:50 mysql-bin.000008
-rw-rw---- 1 mysql mysql      126 Sep  9 17:52 mysql-bin.000009
-rw-rw---- 1 mysql mysql  1082048 Sep 13 19:30 mysql-bin.000010
-rw-rw---- 1 mysql mysql     1806 Sep 13 20:28 mysql-bin.000011
-rw-rw---- 1 mysql mysql      126 Sep 13 20:38 mysql-bin.000012
-rw-rw---- 1 mysql mysql      126 Sep 13 20:40 mysql-bin.000013
-rw-rw---- 1 mysql mysql  1197139 Sep 13 21:45 mysql-bin.000014
-rw-rw---- 1 mysql mysql      126 Sep 13 21:51 mysql-bin.000015
-rw-rw---- 1 mysql mysql  1740852 Sep 14 13:39 mysql-bin.000016
-rw-rw---- 1 mysql mysql   767198 Sep 14 17:13 mysql-bin.000017
-rw-rw---- 1 mysql mysql 11751982 Sep 21 09:02 mysql-bin.000018
-rw-rw---- 1 mysql mysql      342 Sep 14 17:13 mysql-bin.index
drwx------ 2 mysql mysql     4096 Sep  9 15:06 performance_schema
-rw-r----- 1 mysql root     46863 Sep 14 17:13 server.imlongluo.com.err
-rw-rw---- 1 mysql mysql        5 Sep 14 17:13 server.imlongluo.com.pid
```


```text
-rw-rw---- 1 mysql mysql    67 Sep 13 21:53 db.opt
-rw-rw---- 1 mysql mysql  8688 Sep 13 21:54 wp_commentmeta.frm
-rw-rw---- 1 mysql mysql 13380 Sep 13 21:54 wp_comments.frm
-rw-rw---- 1 mysql mysql 13176 Sep 13 21:54 wp_links.frm
-rw-rw---- 1 mysql mysql  8698 Sep 13 21:54 wp_options.frm
-rw-rw---- 1 mysql mysql  8682 Sep 13 21:54 wp_postmeta.frm
-rw-rw---- 1 mysql mysql 13684 Sep 13 21:54 wp_posts.frm
-rw-rw---- 1 mysql mysql  8776 Sep 14 09:05 wp_slim_events.frm
-rw-rw---- 1 mysql mysql  8776 Sep 14 09:05 wp_slim_events_archive.frm
-rw-rw---- 1 mysql mysql 46598 Sep 14 09:05 wp_slim_stats.frm
-rw-rw---- 1 mysql mysql 46598 Sep 14 09:05 wp_slim_stats_archive.frm
-rw-rw---- 1 mysql mysql  8666 Sep 13 21:54 wp_term_relationships.frm
-rw-rw---- 1 mysql mysql  8768 Sep 13 21:54 wp_term_taxonomy.frm
-rw-rw---- 1 mysql mysql  8682 Sep 13 21:54 wp_termmeta.frm
-rw-rw---- 1 mysql mysql  8668 Sep 13 21:54 wp_terms.frm
-rw-rw---- 1 mysql mysql  8684 Sep 13 21:54 wp_usermeta.frm
-rw-rw---- 1 mysql mysql 13064 Sep 13 21:54 wp_users.frm
```


# MySQL数据库内容




# 

