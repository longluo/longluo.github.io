---
layout: post
title: "Hexo入门指北"
date: 2016-03-11 23:37:21
tags: [Hexo, Web,  Blog]
categories: Techniques
keywords: hexo, manual, handbook, blog, web, 
comments: true
---

***By Long Luo***

之前一篇文章[如何使用Hexo建立一个自己的个人Blog及主页美化？](http://www.longluo.me/blog/2016/03/08/the-manual-of-hexo/)，讲述了如何利用Github Pages建立一个属于自己的静态博客，下面这篇文章主要讲的是hexo的常见指令及说明，定位于**Hexo的入门指南**。

# Hexo 命令

命令行中输入：

	$hexo help

列出了Hexo常用命令：

	Commands:
	  clean     Removed generated files and cache.
	  config    Get or set configurations.
	  deploy    Deploy your website.
	  generate  Generate static files.
	  help      Get help on a command. 查看帮助信息
	  init      Create a new Hexo folder. init [文件夹名]： 创建一个hexo项目，不指定文件夹名，则在当前目录创建
	  list      List the information of the site
	  migrate   Migrate your site from other system to Hexo.
	  new       Create a new post.
	  publish   Moves a draft post from _drafts to _posts folder.
	  render    Render files with renderer plugins.
	  server    Start the server.
	  version   Display version information. 查看hexo的版本
	
	Global Options:
	  --config  Specify config file instead of using _config.yml config-path：指定配置文件，代替默认的_config.yml
	  --cwd     Specify the CWD cwd-path：自定义当前工作目录
	  --debug   Display all verbose messages in the terminal 调试模式，输出所有日志信息
	  --draft   Display draft posts
	  --safe    Disable all plugins and scripts 安全模式，禁用所有的插件和脚本
	  --silent  Hide output on console 无日志输出模式

Hexo常用命令也可以使用以下缩写：

	hexo n == hexo new
	hexo g == hexo generate
	hexo s == hexo server
	hexo d == hexo deploy

清除生成内容

	$ hexo clean

执行此操作会删除 public 文件夹中的内容。

以上就是经常使用的命令。

<!--more-->

# Hexo文件夹结构

## scaffolds：
模板文件夹，新建文章时，Hexo会根据scaffold来建立文件。Hexo有三种默认布局： post 、page和draft，它们分别对应不同的路径。新建文件的默认布局是post ，可以在配置文件中更改布局。用draft布局生成的文件会被保存到source/_drafts文件夹。

## source：
资源文件夹是存放用户资源的地方。

### source/_post：
文件箱。除_posts文件夹之外，开头命名为`_`(下划线)的文件`/`文件夹和隐藏的文件将会被忽略。Markdown和HTML文件会被解析并放到public文件夹，而其他文件会被拷贝过去

### source/_draft: 
草稿箱

## themes：
主题 文件夹。Hexo 会根据主题来生成静态页面。

### themes/landscape：
默认的皮肤文件夹

## _config.yml：
全局的配置文件，每次更改要重启服务。

# 全局配置

可以在 _config.yml 中修改：

	# Hexo Configuration
	## Docs: http://hexo.io/docs/configuration.html
	## Source: https://github.com/hexojs/hexo/
	# Site 站点配置
	title: Hexo-demo #网站标题
	subtitle: hexo is simple and easy to study #网站副标题
	description: this is hexo-demo #网栈描述
	author: pomy #你的名字
	language: zh-CN #网站使用的语言
	timezone: Asia/Shanghai #网站时区
	# URL #可以不用配置
	## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
	url: http://yoursite.com #网址，搜索时会在搜索引擎中显示
	root: / #网站根目录
	permalink: :year/:month/:day/:title/ #永久链接格式
	permalink_defaults: #永久链接中各部分的默认值
	# Directory 目录配置
	source_dir: source #资源文件夹，这个文件夹用来存放内容
	public_dir: public #公共文件夹，这个文件夹用于存放生成的站点文件
	tag_dir: tags #标签文件夹
	archive_dir: archives #归档文件夹
	category_dir: categories #分类文件夹
	code_dir: downloads/code #Include code 文件夹
	i18n_dir: :lang #国际化文件夹
	skip_render: #跳过指定文件的渲染，您可使用 glob 来配置路径
	# Writing 写作配置
	new_post_name: :title.md # 新文章的文件名称
	default_layout: post #默认布局
	titlecase: false # Transform title into titlecase
	external_link: true # Open external links in new tab
	filename_case: 0 #把文件名称转换为 (1) 小写或 (2) 大写
	render_drafts: false #显示草稿
	post_asset_folder: false #是否启动资源文件夹
	relative_link: false #把链接改为与根目录的相对位址
	future: true
	highlight: #代码块的设置
	enable: true
	line_number: true
	auto_detect: true
	tab_replace:
	# Category & Tag 分类 & 标签
	default_category: uncategorized #默认分类
	category_map: #分类别名
	tag_map: #标签别名
	# Date / Time format 时间和日期
	## Hexo uses Moment.js to parse and display date
	## You can customize the date format as defined in
	## http://momentjs.com/docs/#/displaying/format/
	date_format: YYYY-MM-DD
	time_format: HH:mm:ss
	# Pagination 分页
	## Set per_page to 0 to disable pagination
	per_page: 10 #每页显示的文章量 (0 = 关闭分页功能)
	pagination_dir: page #分页目录
	# Extensions 扩展
	## Plugins: http://hexo.io/plugins/ 插件
	## Themes: http://hexo.io/themes/ 主题
	theme: landscape #当前主题名称
	# Deployment #部署到github
	## Docs: http://hexo.io/docs/deployment.html
	deploy:
	type:
	
一般主题下有一个 languages 文件夹，用于对应 language 配置项。比如在 ejs 中有：

	<%= __('tags') %>
	
language的配置项是zh-CN ，则会在 languages 文件夹下找到`zh-CN.yml`文件中对应的项来解释。

修改全局配置时，注意缩进，同时注意冒号后面要有一个空格。

# 主题配置

主题的配置文件在/themes/主题文件夹/_config.yml ，一般包括导航配置(menu)，内容配置(content)，评论插件，图片效果(fancybox)和边栏(sidebar)。

Hexo提高了大量的主题，可以在全局配置文件中更改主题：

	# Extensions 扩展
	## Plugins: http://hexo.io/plugins/ 插件
	## Themes: http://hexo.io/themes/ 主题
	theme: 你的主题名称
	
主题的文件目录必须在themes目录下

# 文章
命令行中输入：

	$ hexo new "new article"

之后在source/_posts目录下面，多了一个new-article.md的文件。

打开之后我们会看到：

	---
	title: new article 
	date: 2014-11-01 20:10:33 
	tags: 
	---

文件的开头是属性，采用统一的yaml格式，用三条短横线分隔。下面是文章正文。

文章的正文支持markdown格式。markdown不像html似的一大堆标签，很简单，只有几个符号。

新建、删除或修改文章后，不需要重启hexo server，刷新一下即可预览。

## 属性
文章可以拥有如下属性：

	Setting Description Default
	layout    Layout    post或page    
	title    文章的标题    
	date    创建日期    文件的创建日期    
	updated    修改日期    文件的修改日期    
	comments    是否开启评论    true    
	tags    标签    
	categories    分类    
	permalink    url中的名字    文件名    

动态博客中通过发布文章页面设置的各种属性，在hexo里要这样设置。

## 分类和标签

例如：

	categories: - 日记 
	tags: - Hexo - node.js

## 摘要
同wordpress一样，`<!--more-->`之上的内容为摘要。

## layout
如果你修改了layout，在scaffolds文件夹里一定要有名字对应的模版文件，否则会采用默认模版。

## 文件名
在配置文件中的new_post_name项可以设置文件名，默认为:title，也就是你在命令行输入的名字。

文件名可以为下面几个变量和字符串常量的任意组合：

	Variable Description

	:title    Escaped title (lower case and replace spaces with dash)    
	:year    Created year (4-digit)    
	:month    Created month (2-digit)    
	:i_month    Created month (Without leading zeros)    
	:day    Created day (2-digit)    
	:i_day    Created day (Without leading zeros)    

##  草稿
草稿相当于很多博客都有的“私密文章”功能。

	$ hexo new draft "new draft"

会在source/_drafts目录下生成一个new-draft.md文件。但是这个文件不被显示在页面上，链接也访问不到。也就是说如果你想把某一篇文章移除显示，又不舍得删除，可以把它移动到_drafts目录之中。

如果你希望强行预览草稿，更改配置文件：

	render_drafts: true

或者，如下方式启动server：

	$ hexo server --drafts

下面这条命令可以把草稿变成文章，或者页面：

	$ hexo publish [layout] <filename>

## 页面

命令行键入：

	$ hexo new page about

会在`source/about`中生成index.html。这个就叫做页面，不在文章列表显示，可以通过http://localhost:4000/about浏览。

页面支持文章的大部分属性，除了分类和标签。

## 导航
打开主题中的设置文件，即`themes\<theme_name>\_config.yml`（其中`<theme_name>`是当前主题的名字，默认为landscape，下同），找到menu:，在列表的末端添加About: 关于。刷新页面，导航栏上就出现了关于链接。

## 边栏
进入`themes\<theme_name>\layout\_widget`目录中，创建about.ejs文件，模仿其他文件中的模版，输入以下内容：

<% if (site.tags.length){ %> 
  <div class="widget-wrap"> 
    <h3 class="widget-title">About</h3> 
    <div class="widget"> 
      邮箱：xxx@xxx.com<br /> 
      微博：@xxxxx 
    </div> 
  </div> 
<% } %>

打开`themes\<theme_name>\_config.yml`，找到#Sidebar，在最后面添加- about。刷新页面。

## 底栏
打开`themes\<theme_name>\layout\_partial\footer.ejs`修改。

## banner
打开`themes\<theme_name>\source\css\images`，把banner.jpg换掉。

# 搬入hexo

首先，需要拿到原博客数据的xml文件。

wordpress的话，后台“工具->导出”就可以生成。点点和lofter也支持类似操作。如果遇到不支持导出xml的博客，先用http://www.diandian.com/transfer/转到点点，再用http://www.diandian.com/backup导出XML文件。

之后，安装hexo-migrator-wordpress这个插件

	npm install hexo-migrator-wordpress --save

## 运行

	hexo migrate wordpress wordpress.xml

xml中的数据就导入到source中了。最后的工作是修复链接什么的。

# 搬出hexo
没有什么好的办法。可以写个脚本遍历public文件夹，之后post到指定目录或者制作成xml文件。

# 备份

有句话说得好，数据恢复的最佳方案永远是***备份备份再备份***。

个人建议，分别**备份站点配置**和**文章**。

站点配置包括blog根目录除了source和public文件夹的所有内容，文章就是source文件夹的全部内容。站点配置不经常变的话可以不用经常备份。

# Sitemap & RSS
切换到blog根目录下，输入：

	$ npm install hexo-generator-feed 
	$ npm install hexo-generator-sitemap

之后重启博客，访问`/atom.xml`和`/sitemap.xml`，会发现已经生成了。可以把sitemap提交到搜索引擎的站长平台来增加收录。

# 部署

首先按照前面教程建立好代码仓库，这里假设你的用户名是`your_name`。由于ssh配置比较麻烦，这里采用https方式提交。

找到配置文件中#Deployment一节，修改：

	type: github 
	repository:https://github.com/your_name/your_name.git
	branch: master

之后输入：

	$hexo deploy --generate

或者

	$ hexo generate --deploy

hexo会自动生成并部署。
如果之前已经生成过了，直接输入：

	$ hexo deploy

部署即可。

***By Long Luo at 2016-3-11 23:19:53 ~ 2016-3-12 00:27:31@Shenzhen, China.***
***Updated at 2016-6-3 00:04:11***
***Modified By Long Luo at 2018年9月25日23点58分***

