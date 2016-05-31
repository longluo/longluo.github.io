---
layout: post
title: "Hexo"
date: 2016-05-31 09:00:37 +800
comments: true
categories: Life
tags: [hexo, blog]
keywords: 
---

***By Long Luo***


测试SSH：

	$ ssh -T git@github.com
	
接下来会出来下面的确认信息：

The authenticity of host 'github.com (207.97.227.239)' can't be established. 
RSA key fingerprint is 17:24:ac:a5:76:28:24:36:62:1b:36:4d:eb:df:a6:45.
 Are you sure you want to continue connecting (yes/no)?
输入 yes 后回车。 
然后显示如下信息则OK(其中的SeayXu是用户名)。

Hi SeayXu! You've successfully authenticated, 
but GitHub does not provide shell access.
以上是准备工作。


Hexo初始化博客框架

安装Hexo

Hexo安装和搭建依赖Nodejs和Git,可自行下载。

	$ npm install -g hexo-cli
	
初始化框架

	$ hexo init <yourFolder>
	$ cd <yourFolder>
	$ npm install
	
初始化完成大概的目录：

	.
	├── _config.yml //网站的 配置 信息，您可以在此配置大部分的参数。
	├── package.json
	├── scaffolds     //模版 文件夹。当您新建文章时，Hexo 会根据 scaffold 来建立文件。
	├── source     //资源文件夹是存放用户资源的地方。
	|   ├── _drafts
	|   └── _posts
	└── themes     //主题 文件夹。Hexo 会根据主题来生成静态页面。
	
新建文章（创建一个Hello World）
	
	$ hexo new "Hello World"
	
在/source/_post里添加hello-world.md文件，之后新建的文章都将存放在此目录下。

生成网站

	$ hexo generate
	
此时会将/source的.md文件生成到/public中，形成网站的静态文件。

服务器
	$ hexo server -p 3000
输入http://localhost:3000即可查看网站。

部署网站
	
	$ hexo deploy
	
部署网站之前需要生成静态文件，即可以用$ hexo generate -d直接生成并部署。此时需要在_config.yml中配置你所要部署的站点：

## Docs: http://hexo.io/docs/deployment.html
 deploy:
   type: git
   repo: git@github.com:YourRepository.git
   branch: master

   
使用Next主题让站点更酷炫
使用
$ cd your-hexo-site
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
从Next的Gihub仓库中获取最新版本。
启用
需要修改/root/_config.yml配置项theme：
# Extensions
## Plugins: http://hexo.io/plugins/
## Themes: http://hexo.io/themes/
theme: next
验证是否启用
$ hexo s --debug
访问http://localhost:4000，确保站点正确运行。（此命令可以做平时预览用）


Hexo NexT主题的文档结构

/languages   #用来配置国际化语言版本，里边包含各种个配置像的文本翻译。
/layout      #以swig文件来定义各种含有配置信息调用的布局
/scripts     #一些JS脚本
/source    
   /css      #用来修改自定义样式，需要掌握一定的css语法。
   /fonts    #定义字体文件，可以修改博客字体
   /images   #一些svg图片
   /js       #一些js脚本
   /vendors  
   /404.html #自定义的公益404页面
/test        #用于测试
   
   

创建本地仓库

打开 Git Bash 终端，等待执行命令。

新建仓库文件夹：这里就取名为blog。

	$ mkdir blog
	
初始化仓库：进入到blog文件夹，执行初始化命令。

	$ cd blog # 切换到blog目录
	$ git init # 初始化git仓库
	
注：初始化要在Hexo安装之后执行，因为在hexo初始化的时候会从github上克隆代码，会创建.git文件夹。如果在此之前初始化仓库会将原有的仓库信息覆盖掉，最后也会删除。

#### 初探Hexo

如果没有安装Nodejs，请先安装Nodejs， Nodejs官网 ； 
以下操作是在blog文件夹中。

#### 安装Hexo

	$ npm install hexo-cli -g
	
#### 初始化Hexo

	$ hexo init
	
#### 安装依赖

	$ npm install
	
#### 启动Hexo

	$ hexo server

启动之后，打开浏览器，在地址栏输入：http://localhost:4000 ，你会看到Hexo的示例页面。

注：此时可以初始化git本地仓库了，或者是等本地博客搭建好之后也可以。


等待他完成后我们可以进去到文件夹中看到以下目录：

	node_modules ： Hexo的功能JavaScript文件
	public ：生成静态网页文件
	scaffolds ：工具模板
	source ：
		/_drafts -草稿文件夹
		/_posts -文章文件夹
		
	themes ：用来存放皮肤的文件夹
	_config.yml ：全局配置文件
	db.json ：json格式的静态常量数据库
	
	

再探Hexo

#### 新建文章：

	$ hexo new <title>
	
此时在 source_posts 文件夹中便会多出一个文档"title.md". 
如果要删除，直接在此文件夹下删除对应的文件即可。

#### 生成静态页面

	$ hexo generate
	
生成的静态内容在 public 文件夹内。

#### 清除生成内容

	$ hexo clean
	
执行此操作会删除 public 文件夹中的内容。

#### 部署Hexo

	$ hexo deploy
	
该操作会将hexo生成的静态内容部署到配置的仓库中，请看下面介绍。

#### 部署Hexo

编辑配置文件：在编辑器中打开Hexo配置文件**_config.yml**，找到下面内容：

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type:
添加github仓库信息：

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: git@github.com:SeayXu/seayxu.github.io.git #github仓库地址
  branch: master # github分支
关联远程仓库

$ # 将SeayXu/seayxu.github.io.git换成自己的GitHub仓库地址

	$ git remote add origin git@github.com:SeayXu/seayxu.github.io.git
	
部署

	$ hexo deploy
如果没有意外，部署就成功了，可以打开 http:// <用户名> .github.io 查看。

本文简单介绍 Hexo 的部署，接下来的文章会介绍 Hexo 的相关配置。

关于NPM
NPM的全称是Node Package Manager，是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。
就目前而言，NPM的官网[1]拥有18万的packages。国内的镜像是淘宝所提供的CNPM[2]，与NPM相同，它会每隔10分钟就同步一次。

一些常用命令

	npm -v: 查看npm安装的版本
	npm init: 引导你创建一个package.json文件，包括名称、版本、作者这些信息等
	npm install <modulename>: 安装模块
	npm install <modulename> -g: 安装全局模块
	npm install <modulename>@1.0.0: 安装指定版本的模块
	npm install <modulename> -save: 安装模块并添加到package.json依赖中

	npm uninstall <modulename>: 卸载模块

	npm cache clean: 清除缓存

	npm help: 查看帮助命令

	npm ls: 查看当前目录安装的依赖
	npm ls -g: 查看全局目录安装的依赖
	npm view <modulename>: 查看包的package.json
	npm view <modulename> dependencies: 查看包的依赖关系
	npm view <modulename> repository.url: 查看包的源文件地址

	npm update <modulename>: 更新模块

	npm remove <modulename>: 移除模块
	
	



