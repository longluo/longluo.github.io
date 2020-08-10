---
layout: post
title: "Git常用操作指南"
comments: true
date: 2016-09-14 08:55:18
tags: [git, 工具, 效率]
categories: Tools
keywords: git, 工具, 效率, 指南, 
---

	$ git add .	
	
	$ git add -u .

	git reset是指将当前head的内容重置，不会留log信息。
	
git reset HEAD filename  从暂存区中移除文件

git reset –hard HEAD~3  会将最新的3次提交全部重置，就像没有提交过一样。

git reset –hard commit (38679ed709fd0a3767b79b93d0fba5bb8dd235f8) 回退到 38679ed709fd0a3767b79b93d0fba5bb8dd235f8 版本

根据–soft   –mixed   –hard，会对working tree和index和HEAD进行重置:
git reset –mixed：此为默认方式，不带任何参数的git reset，即时这种方式，它回退到某个版本，只保留源码，回退commit和index信息
git reset –soft：回退到某个版本，只回退了commit的信息，不会恢复到index file一级。如果还要提交，直接commit即可
git reset –hard：彻底回退到某个版本，本地的源码也会变为上一个版本的内容

git 放弃本地修改 强制更新
git fetch --all
git reset --hard origin/master
git fetch 只是下载远程的库的内容，不做任何的合并 git reset 把HEAD指向刚刚下载的最新的版本

git新手。本地做了一些修改，我用git rebase说有冲突。我现在想把本地的请求都干掉，可能有的已经commit过了（没有push过），完全同步成远程版本，应该用什么命令？

使用命令：

git reset --hard ORIGIN/BRANCH

比如master分支：

git reset --hard origin/master

# Git 

## Git dojo

[https://www.shortcutfoo.com/](https://www.shortcutfoo.com/)

## Try Git


[https://try.github.io/levels/1/challenges/1](https://try.github.io/levels/1/challenges/1)

## LearnGitBranching

[http://learngitbranching.js.org/](http://learngitbranching.js.org/)




