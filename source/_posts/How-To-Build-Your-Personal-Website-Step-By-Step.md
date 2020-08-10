---
layout: post
title: "如何一步一步建立一个属于你自己的个人网站？"
comments: true
date: 2016-09-09 22:56:28
tags: [网站, 个人品牌, 程序员]
categories: Web
keywords: 网站, 个人品牌, 程序员, Linux, VPS, 域名
---

***By Long Luo***

[LNMP](http://lnmp.org/)

	wget -c http://soft.vpser.net/lnmp/lnmp1.3-full.tar.gz

	tar zxf lnmp1.3-full.tar.gz

	cd lnmp1.3-full

 	./install.sh lnmpa

	$ git --version
	git version 1.7.1


	$ ssh-keygen -t rsa -C "youremail@example.com"

id_rsa.pub

	ssh -t git@github.com


	$ git config --global user.name "Your Name"
	$ git config --global user.email "email@example.com"


```
The authenticity of host 'github.com (192.30.253.112)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,192.30.253.112' (RSA) to the list of known hosts.
PTY allocation request failed on channel 0
Hi longluo! You've successfully authenticated, but GitHub does not provide shell access.
                                                                                        Connection to github.com closed.
```


修改SSH密码。登录ssh后, 通过passwd命令修改即可，命令格式:

	passwd {用户名}
　
　　出现：(current) UNIX password: 然后输入当前系统登陆用户的密码 回车
　　出现：New password: 再输入新密码（新的密码必须是字母数字都有，不然的话不成功）










