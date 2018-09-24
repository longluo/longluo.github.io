---
layout: post
title: "如何使用Hexo建立一个自己的个人Blog及主页美化？"
date: 2016-03-08 22:16:37 +800
comments: true
categories: Techniques
tags: [hexo, blog, 主页, 博客]
keywords: hexo, blog, next, npm, 博客, 指南, 主页
---

***By Long Luo***

我的女神之一[@恢复吃素的F小姐](http://weibo.com/rainfieldfifi)曾写了一篇文章[为了保持逼格，不要停止写作](http://www.15yan.com/topic/chuang-zuo-de-mi-mi/i0sBdlKnryf/?f=wx)，我深以为然。

个人也是个非常喜欢装逼的人。小学时发现自己在文字方面有一点点天赋时，就喜欢上了阅读和码字。上学时写在日记本里，后来接触了互联网，就写在了网络博客里，断断续续在新浪，网易，QQ空间等都留下了一些文字痕迹。

工作之后，成了一名程序员，有时候查资料发现大神们都有自己的个人网站时，感觉逼格好高。作为一名追求逼格的三流程序员，于是乎，买空间，查资料，折腾，终于也搭建了一个属于自己的[网络小屋](http://www.imlongluo.com/)。

[GitHub](https://github.com/)作为程序员界中最大的***同性交友***网站，逼格不知道高到哪里去了！我很快移情别恋，基于Github Pages建了一个[个人网站](http://longluo.me)，最开始是用基于**Jekyll**的[***Octopress***](http://octopress.org/)搭建的。

**Jekyll**是基于Python的，访问起来很慢，而且不够简洁。于是乎，基于***NodeJS***的[***Hexo***](https://hexo.io/zh-cn/)这个逼格极高的程序猿写作方式进入了我的视线，于是花了几个小时从[***Octopress***](http://octopress.org/)迁移到了[***Hexo***](https://hexo.io/zh-cn/)。

那么如何使用**Hexo**建立一个属于自己的网站呢？

<!-- more -->

# 一、 注册GitHub

首先我们需要做的是去[GitHub](https://github.com/)注册一个帐号，并创建一个Repository仓库。这里需要注意的是仓库的名称必须是`用户名.github.io`，才能使用**Github Pages**.

# 二、配置SSH

下载并安装[Git](https://git-scm.com/)。

## 1. 设置user name和email：

	$ git config --global user.name "你的GitHub用户名"
	$ git config --global user.email "你的GitHub注册邮箱"
	
## 2. 生成ssh密钥:

输入下面命令

	$ ssh-keygen -t rsa -C "你的GitHub注册邮箱"
	
一般情况下是不需要密码的，所以，接下来直接回车就好。 

此时，在用户文件夹下就会有一个新的文件夹`.ssh`，里面有刚刚创建的ssh密钥文件`id_rsa`和`id_rsa.pub`。 

注：id_rsa文件是私钥，要妥善保管，id_rsa.pub是公钥文件。

## 3. 添加公钥到github： 

点击用户头像，进入Settings(设置)选项。在用户设置栏，点击SSH and GPG keys选项，然后点击New SSH key(新建SSH)按钮； 

将id_rsa.pub中的内容复制到 Key 文本框中，然后点击Add SSH key(添加SSH)按钮。 

## 4. 测试SSH：

	$ ssh -T git@github.com

接下来会出来下面的确认信息：

	The authenticity of host 'github.com (207.97.227.239)' can't be established. 
	RSA key fingerprint is 17:24:ac:a5:76:28:24:36:62:1b:36:4d:eb:df:a6:45.
	Are you sure you want to continue connecting (yes/no)?
 
输入`yes`后回车。 

然后显示如下信息则OK(其中的SeayXu是用户名)。

	Hi longluo! You've successfully authenticated, 
	but GitHub does not provide shell access.
	
以上是准备工作。

# 三、创建本地仓库

## 1. 新建仓库文件夹

这里就取名为blog。

	$ mkdir blog
	
## 2. 初始化仓库

进入到blog文件夹，执行初始化命令。

	$ cd blog # 切换到blog目录
	$ git init # 初始化git仓库
	
注：初始化要在Hexo安装之后执行，因为在hexo初始化的时候会从github上克隆代码，会创建.git文件夹。

如果在此之前初始化仓库会将原有的仓库信息覆盖掉，最后也会删除。

# 四、Hexo初始化

## 1. 安装Hexo

Hexo是基于[NodeJS](https://nodejs.org/)，所以需要先安装NodeJS。

	$ npm install -g hexo-cli
	
## 2. 初始化框架

	$ hexo init <yourFolder>
	$ cd <yourFolder>

## 3. 安装依赖

	$ npm install
	
## 4. 初始化完成大概的目录：

	.
	├── _config.yml //网站的`配置`信息，您可以在此配置大部分的参数。
	├── package.json
	├── db.json // json格式的静态常量数据库	
	├── node_modules // Hexo的功能JavaScript文件
	├── public // 生成静态网页文件
	├── scaffolds   //模版文件夹。当您新建文章时，Hexo会根据scaffold来建立文件。
	├── source     //资源文件夹是存放用户资源的地方。
	|   ├── _drafts // 草稿文件夹
	|   └── _posts // 文章文件夹
	└── themes     //主题文件夹。Hexo会根据主题来生成静态页面。
	
	
## 5. 新建文章（创建一个Hello World）
	
	$ hexo new <title> for example: "Hello World"
	
在/source/_post里添加hello-world.md文件，之后新建的文章都将存放在此目录下。

如果要删除，直接在此文件夹下删除对应的文件即可。

## 6. 生成网站

	$ hexo generate
	
此时会将/source的.md文件生成到/public中，形成网站的静态文件。

## 7. 服务器

	$ hexo server -p 3000
	
输入http://localhost:3000即可查看网站。

## 8. 部署网站
	
	$ hexo deploy
	
该操作会将hexo生成的静态内容部署到配置的仓库中，请看下面介绍。

部署网站之前需要生成静态文件，即可以用`$ hexo generate -d`直接生成并部署。

此时需要在**_config.yml**中配置你所要部署的站点：

	## Docs: http://hexo.io/docs/deployment.html
	deploy:
		type: git
		repo: git@github.com:YourRepository.git
		branch: master
	
如果没有意外，部署就成功了，可以打开`http://<用户名>.github.io`查看。
   
# 五、使用Next主题让站点更酷炫

## 1. 使用NexT Theme

	$ cd your-hexo-site
	$ git clone https://github.com/iissnan/hexo-theme-next themes/next
	
从Next的Gihub仓库中获取最新版本。

## 2. Hexo NexT主题的文档结构

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

## 3. 启用NexT主题

需要修改/root/_config.yml配置项theme：

	# Extensions
	## Plugins: http://hexo.io/plugins/
	## Themes: http://hexo.io/themes/
	theme: next
	
## 4. 验证是否启用

	$ hexo s --debug
	
访问http://localhost:4000，确保站点正确运行。（此命令可以做平时预览用）

# 六、总结

通过以上步骤，我们就成功的实现了在Github上建立了一个高逼格的Hexo个人博客站点。

下面的事情就是不断的去写，去思考，去实践！

*** Complete By Long Luo @2016-3-08 23:12:01 at Shenzhen, China.***
*** Updated at 2016-6-1 23:42:55 ***
