---
title: '解决使用LeanCloud国际版时网站文章浏览次数不显示的bug'
comments: true
date: 2021-03-28 21:55:31
tags: [Hexo, Bug, JS, Web,前端]
categories: Web
keywords: Leancloud, js, web, 网页, 调试, bug, debug, PV, 计数, 前端, 
---

***By Long Luo***

之前[个人网站](http://www.longluo.me)文章阅读次数存储一直在[Leancloud](http://www.leancloud.cn)上，由于去年国内版要求网站必须备案才能使用之后，个人网站的浏览次数一直是不可用状态。几个月前切换到国际版，但是切换之后浏览次数一直是`空白null`值，正常应该是`0`，数据也不会更新。

后台查看`Counter`数据，也一直是没有数据的状态。当时花费了时间去检查，试图找到问题所在，当时还是怀疑LeanCloud国际版后台接口API的问题，但一直没能解决这个问题。

今天下午从原理入手，分析每个可能的步骤，找到了**问题原因**，在此记录下解决问题的过程。

<!--more-->

# 如何显示阅读次数？
网站使用的是Hexo + Next主题，可以使用3种方式显示阅读次数：1. Leancloud; 2. FireStore; 3. Busuanzi

*FireStore*由于需要翻墙，尝试过发现不可行；

*Busuanzi*虽然也可以，设置之后发现首页数据显示紊乱，而且不准，使用了一段时间之后放弃；

*LeanCloud*是最合适的，数据也可以很方便的进行迁移。

在Next主题配置`_config.yml`文件中，可以设置使用哪种计数方式。注意文章阅读次数只能设置一个为true，否则页面会显示多个阅读次数。

```yaml
leancloud_visitors:
  enable: true
  app_id: # <your app id> hdPFnwkCdbHRj5Q3OQk5vNJQ-gzGzoHsz
  app_key: # <your app key> p2mNUdDbqxrxOYMjs1xiS0zM 

# Another tool to show number of visitors to each article.
# Visit https://console.firebase.google.com/u/0/ to get apiKey and projectId.
# Visit https://firebase.google.com/docs/firestore/ to get more information about firestore.
firestore:
  enable: false
  collection: articles # Required, a string collection name to access firestore database
  apiKey:  # Required
  projectId:  # Required 

# Show Views / Visitors of the website / page with busuanzi.
# For more information: http://ibruce.info/2015/04/04/busuanzi/
busuanzi_count:
  enable: true
  total_visitors: true
  total_visitors_icon: fa fa-user
  total_views: true
  total_views_icon: fa fa-eye
  post_views: false
  post_views_icon: fa fa-eye
```

## 如何读写阅读次数的？

这里以LeanCloud为例来说明阅读次数是如何读写的。首先打开[网站首页](http://www.longluo.me)，查看源代码：

```html
<span class="post-meta-item-icon">
    <i class="far fa-eye"></i>
</span>
<span class="post-meta-item-text">阅读次数：</span>
<span class="leancloud-visitors-count"></span>
```

可以看出，阅读次数是通过`leancloud-visitors-count`这个`class`的值来显示的，搜索`leancloud-visitors-count`可以在网页的`js`代码中找到：

```javascript
    function leancloudSelector(url) {
      url = encodeURI(url);
      return document.getElementById(url).querySelector('.leancloud-visitors-count');
    }
```

那么这段`js`代码在哪里呢？

通过查找，leancloud的`js`代码在`themes\next\layout\_third-party\statistics`目录下的`lean-analytics.njk`文件，代码如下：

```javascript
{%- if theme.leancloud_visitors.enable %}
<script{{ pjax }}>
  (function() {
    function leancloudSelector(url) {
      url = encodeURI(url);
      return document.getElementById(url).querySelector('.leancloud-visitors-count');
    }

    function addCount(Counter) {
      const visitors = document.querySelector('.leancloud_visitors');
      const url = decodeURI(visitors.id);
      const title = visitors.dataset.flagTitle;

      Counter('get', '/classes/Counter?where=' + encodeURIComponent(JSON.stringify({ url })))
        .then(response => response.json())
        .then(({ results }) => {
          if (results.length > 0) {
            const counter = results[0];
            leancloudSelector(url).innerText = counter.time + 1;
            Counter('put', '/classes/Counter/' + counter.objectId, { time: { '__op': 'Increment', 'amount': 1 } })
              .catch(error => {
                console.error('Failed to save visitor count', error);
              });
          } else {
            {%- if theme.leancloud_visitors.security %}
              leancloudSelector(url).innerText = 'Counter not initialized! More info at console err msg.';
              console.error('ATTENTION! LeanCloud counter has security bug, see how to solve it here: https://github.com/theme-next/hexo-leancloud-counter-security. \n However, you can still use LeanCloud without security, by setting `security` option to `false`.');
            {% else %}
              Counter('post', '/classes/Counter', { title, url, time: 1 })
                .then(response => response.json())
                .then(() => {
                  leancloudSelector(url).innerText = 1;
                })
                .catch(error => {
                  console.error('Failed to create', error);
                });
            {%- endif %}
          }
        })
        .catch(error => {
          console.error('LeanCloud Counter Error', error);
        });
    }

    function showTime(Counter) {
      const visitors = document.querySelectorAll('.leancloud_visitors');
      const entries = [...visitors].map(element => {
        return decodeURI(element.id);
      });

      Counter('get', '/classes/Counter?where=' + encodeURIComponent(JSON.stringify({ url: { '$in': entries } })))
        .then(response => response.json())
        .then(({ results }) => {
          for (let url of entries) {
            const target = results.find(item => item.url === url);
            leancloudSelector(url).innerText = target ? target.time : 0;
          }
        })
        .catch(error => {
          console.error('LeanCloud Counter Error', error);
        });
    }

    const { app_id, app_key, server_url } = {{ theme.leancloud_visitors | safedump }};
    function fetchData(api_server) {
      const Counter = (method, url, data) => {
        return fetch(`${api_server}/1.1${url}`, {
          method,
          headers: {
            'X-LC-Id'     : app_id,
            'X-LC-Key'    : app_key,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
      };
      if (CONFIG.page.isPost) {
        addCount(Counter);
      } else if (document.querySelectorAll('.post-title-link').length >= 1) {
        showTime(Counter);
      }
    }

    const api_server = app_id.slice(-9) === '-MdYXbMMI' ? `https://${app_id.slice(0, 8).toLowerCase()}.api.lncldglobal.com` : server_url;

    if (api_server) {
      fetchData(api_server);
    } else {
      fetch('https://app-router.leancloud.cn/2/route?appId=' + app_id)
        .then(response => response.json())
        .then(({ api_server }) => {
          fetchData('https://' + api_server);
        });
    }
  })();
</script>

{%- endif %}
```

这段代码主要包含以下几个函数：

1. `addCount`：进入文章页面，请求数据库，显示及写入数据库；
2. `showTime`：不进入具体文章页面，请求数据库，显示阅读次数；
3. `fetchData`：从Leancloud数据库获取数据；

函数调用顺序：

> `fetchData` --> `addCount` / `showTime`

# 问题原因出在哪？

显示原理弄明白了，那么为什么数据没有显示呢？

那我们就Debug这个页面吧，打断点，看看`js`代码每一步执行，执行过程和变量数据是否和我们预期一致。

在首页界面调试时，`showTime`会直接进入：

```javascript
        .catch(error => {
          console.error('LeanCloud Counter Error', error);
        });
```

所以数据就显示为`null`了，也不显示0。

在具体文章页面进行Debug：

```javascript
      if (CONFIG.page.isPost) {
        if (CONFIG.hostname !== location.hostname) return;
        addCount(Counter);
      } else if (document.querySelectorAll('.post-title-link').length >= 1) {
        showTime(Counter);
      }
```

进入`fetchData`之后， `if (CONFIG.hostname !== location.hostname) return;`，没有进入`addCount`流程，因此数据为null。

而`if (CONFIG.hostname !== location.hostname) return;`这行代码的目的是：

因为页面也可以在本地上运行，所以这行代码是将在本地`localhost`的刷新次数不视为一个刷新次数，所以就直接`return`了。

Bingo，***问题根源找到了！！！***

--------------- 2021.04.05 Update ---------------

在网站主配置文件`_config.yml`中，之前的配置文件的url地址如下：

```yaml
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://longluo.me
```

调试时发现`location.hostname`的值为`www.longluo.me`，而`CONFIG.hostname`的值为`http://longluo.me`，所以就会出现上述问题。


# 问题是如何解决的？

解决方法也很简单，去除`if (CONFIG.hostname !== location.hostname) return;`这行代码。

重新编译发布，Okay，阅读次数有了，后台查看数据也存在，问题解决。

--------------- 2021.04.05 Update ---------------

将网站主配置文件`_config.yml`中的`url`值从`http://longluo.me`修改为`www.longluo.me`即可，问题即得以解决。


# 小结

通过解决这个问题，当出现问题时，要先***理清楚逻辑***，然后一步一步跟踪解决，定位问题，最终解决问题。


