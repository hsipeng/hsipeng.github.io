---
layout: post
tags: js
title: javascript特效（知识点笔记）
date: 2017-04-28

---

## javascript中常用坐标属性offset、scroll、client
offset、scroll、client是js中获取元素尺寸的api的三大家族。
 <!-- more -->
![](http://images.cnitblog.com/blog/555524/201501/251833059254129.png)

### 1、在文档（document）对象里面用：

scrollWidth/Height:获取对象的滚动宽度(滚动条可以滚动的宽度，相当于整个页面的总宽度的样子--网页正文全宽)

scrollLeft/Top:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离（页面利用滚动条滚动到右边时，隐藏在滚动条左边的页面宽度---页面被卷去左边）


### 2、在节点对象里面用：

offsetLeft/Top:获取对象相对于版面（css里面没有进行定位，则offsetParent取值为根元素进行计算）或由 offsetParent 属性指定的父坐标的计算左侧位置（当有css定位时，当前对象相对与offsetParent元素的距离）

offsetWidth/Height (width+padding+border)
获取当前对象的宽度。
style.width也是当前对象的宽度(width+padding+border)。
区别：
```
1)style.width返回值除了数字外还带有单位px；
2)如对象的宽度设定值为百分比宽度,则无论页面变大还是变小，style.width都返回此百分比,而offsetWidth则返回在不同页面中对象的宽度值而不是百分比值；
3)如果没有给 HTML 元素指定过 width样式，则 style.width 返回的是空字符串；
```
offsetLeft :
当前对象到其上级层左边的距离。
不能对其进行赋值.设置对象到其上级层左边的距离请用style.left属性。
style.left当前对象到其上级层左边的距离。
区别：
```
1)style.left返回值除了数字外还带有单位px；
2)如对象到其上级层左边的距离设定值为百分比，style.left返回此百分比,而offsetLeft则返回到其上级层左边的距离的值；
3)如果没有给 HTML 元素指定过 left样式，则 style.left返回的是空字符串；
```
注意：如果上级层为body，由于IE、FF对padding、margin的解释不一样所以要明确规定处理不是下列的区别就不成立了。
IE   
```
1)如果Div的上级层是body，而div与body之间有个div，如body->div->divo；divo的offsetTop=div的padding+margin+boder；
2）如果Div的上级层是body，如body>divo；divo的offsetTop=div的padding+margin+boder；
```

这divo的offsetTop=divo的margin >body.padding则为divo的margin，否则为body.padding谁大是谁？FF  上述两种情况：offsetTop=margin+padding ;
(IE与FF中的body默认padding为10)在IE6.0 FF3.6.13

```
clientWidth/Height:
获取对象可见内容的宽度，不包括滚动条，不包括边框；

clientLeft/Top:
 获取对象的border宽度
```

### 3、事件里面用的：
```
event.clientX 相对文档的水平座标

event.clientY 相对文档的垂直座标

event.offsetX 相对容器的水平坐标
event.offsetY 相对容器的垂直坐标
```

4、屏幕的：
```
window.screenTop 网页正文部分上
window.screenLfet 网页正文部分左

window.screen.height  屏幕分辨律的高
window.screen.left  屏幕分辨律的宽

window.screen.availHeight  屏幕可用工作区的高度
window.screen.availWidth  屏幕可用工作区的宽度

document.documentElement.scrollTop 垂直方向滚动的值


网页可见区域宽： document.body.clientWidth;
网页可见区域高： document.body.clientHeight;
网页可见区域宽： document.body.offsetWidth   (包括边线的宽);
网页可见区域高： document.body.offsetHeight  (包括边线的宽);
网页正文全文宽： document.body.scrollWidth;
网页正文全文高： document.body.scrollHeight;
网页被卷去的高： document.body.scrollTop;
网页被卷去的左： document.body.scrollLeft;
网页正文部分上： window.screenTop;
网页正文部分左： window.screenLeft;
屏幕分辨率的高： window.screen.height;
屏幕分辨率的宽： window.screen.width;
屏幕可用工作区高度： window.screen.availHeight;
屏幕可用工作区宽度：window.screen.availWidth;
```
## 补充：
![](http://img.blog.csdn.net/20160625084926003)
