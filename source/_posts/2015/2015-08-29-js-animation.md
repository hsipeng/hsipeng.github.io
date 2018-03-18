---
layout: post
tags: js 
title: css+js实现加载动画
date: 2015-08-29


---

想要酷炫的加载动画么，那就一起来看看吧。

首先你要找到css和js的代码

css是动画，js控制动画显示和隐藏

一下是我收集的一段css自改代码
<!-- more -->
html

```
<div class="loaders" id="loading">
           <div class="loader">
                   <div class="loader-inner ball-clip-rotate-multiple">
                       <div></div>
                       <div></div>
                   </div>
               </div>
       </div>

```

css
```
@keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg) scale(1);
        transform: rotate(0deg) scale(1)
    }

    50% {
        -webkit-transform: rotate(180deg) scale(0.6);
        transform: rotate(180deg) scale(0.6)
    }

    100% {
        -webkit-transform: rotate(360deg) scale(1);
        transform: rotate(360deg) scale(1)
    }
}
.ball-clip-rotate-multiple {
    position: absolute;
    left: 50%;
    top: 50%;
}

.ball-clip-rotate-multiple>div {
    position: absolute;
    left: 0;
    top: 0;
    border: 2px solid #8b8b8b;
    border-bottom-color: transparent;
    border-top-color: transparent;
    border-radius: 100%;
    height: 35px;
    width: 35px;
    -webkit-animation: rotate 1s 0s ease-in-out infinite;
    animation: rotate 1s 0s ease-in-out infinite
}

.ball-clip-rotate-multiple>div:last-child {
    display: inline-block;
    top: 10px;
    left: 10px;
    width: 15px;
    height: 15px;
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    border-color: #8b8b8b transparent;
    -webkit-animation-direction: reverse;
    animation-direction: reverse
}
```


js代码,控制自动隐藏
```
$(window).load(function() {
        $("#loading").fadeOut(500);
        })
        </script>
```
特别提示以上代码需要加载jquery.js

[百度链接](http://pan.baidu.com/s/1gdyGOMZ)
密码：

```
kn1f
```

以上修改自

[http://www.htmleaf.com/css3/css3donghua/201504151682.html](http://www.htmleaf.com/css3/css3donghua/201504151682.html)