---
layout: post
title: "如何使用Google Volley网络库发起带Header的HTTP请求?"
date: 2014-09-07 12:20:14 +0800
comments: true
categories: 网络
description: "如何使用Google Volley网络库发起带Header的HTTP请求?"
keywords: Volley, HTTP, JSON
---

### ***By Long Luo***

由于合作的第三方iQiyi视频的数据源更新速度很慢，通过和iQiyi反馈，于是提供了新的API接口。

通过阅读新API接口说明，在发起HTTP Get请求时，必须**同时带2个加密的Header参数**，分别是时间戳和MD5加密后的key、时间戳以及客户端参数，否则无法返回正确的请求。

目前在Android客户端使用的是Google开源Volley库，支持各种HTTP请求，图片缓存，JSON解析，性能十分强大。之前使用的接口都是直接发起HTTP Get请求，附带相关参数即可。

通过阅读Volley相关资料，找到了下列方法，可以在发起HTTP请求时，附带Header参数，代码如下所示：

<!--more-->

	    public void makeHTTPrequest(String url) {
        MyLog.d(TAG, "makeHTTPrequest, url=" + url);

        JsonObjectRequest jsonObjRequest = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            MyLog.d(TAG, "response=" + response);
                            parseiQiyiInterfaceResponse(response);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        if (error instanceof NetworkError) {
                        } else if (error instanceof ClientError) {
                        } else if (error instanceof ServerError) {
                        } else if (error instanceof AuthFailureError) {
                        } else if (error instanceof ParseError) {
                        } else if (error instanceof NoConnectionError) {
                        } else if (error instanceof TimeoutError) {
                        }

                        MyLog.e(TAG, "onErrorResponse, error=" + error);
                    }
                }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<String, String>();
                headers.put("t", iQiyiInterface.getEncryptTimestamp());
                headers.put("sign", iQiyiInterface.getSign());

                // MyLog.d(TAG, "headers=" + headers);
                return headers;
            }
        };

        // Set a retry policy in case of SocketTimeout & ConnectionTimeout
        // Exceptions. Volley does retry for you if you have specified the
        // policy.
        jsonObjRequest.setRetryPolicy(new DefaultRetryPolicy(5000,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES, DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        jsonObjRequest.setTag(TAG);
        jsonObjRequest.setShouldCache(true);

        mQueue.add(jsonObjRequest);
        mQueue.start();
    }

**Header参数使用HashMap存储。**

获取到JSON数据之后，剩下的就是解析数据了，在这里就不赘述了。

在完成这个过程中，还遇到了很多小插曲，比如Header的sign值不支持大写字母，结果前后也白费了不少力气。apk烧写到手机之后，还需要使用tcpdump抓取数据包，看是否返回了正确的数据。

最后发现了Chrome的一个Smart Header插件，完美的解决了以上问题，不需要每次抓包验证返回结果了，直接在Chrome浏览器即可，节省了大量时间。

总之，希望这篇文章对大家能有所帮助。谢谢！

#### *Created by Long Luo at 2014-09-07 12:30:03 @Shenzhen, China.*

