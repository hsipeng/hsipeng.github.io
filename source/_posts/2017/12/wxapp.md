---
layout: post
tags: 小程序
title: 小程序初探
date: 2017-12-02

---

最近研究了一下小程序的开发工具的应用。主要是通过腾讯云上传测试代码和正式代码，主要是集成了很多工具，
比较方便。
<!-- more -->
## 程序截图
![](https://github.com/lirawx/weapp/raw/master/dtools/weapp-screen-drivernews.gif)
## 功能介绍
功能比较简单，基于脚手架[wafer2-quickstart-nodejs](https://github.com/tencentyun/wafer2-quickstart-nodejs)抽空业余时间写的一些代码，主要是新闻数据获取，我用node js 爬取的驱动之家的新闻
新闻地址为[➡️](http://news.mydrivers.com/blog/) 这个地址的新闻每天都会更新。很实用，不多
也不少，每天差不多40条左右，没什么广告，业内热门新闻都有，有时候还有steam游戏打折推荐，很不错。

## 主要实现
WEUI [文档](https://github.com/Tencent/weui-wxss)
font awesome 引入
moment js 时间格式化
promise 风格 API 封装。


几个主要的功能代码贴一下。
sql.js  工具类代码，通用
```
var mysql = require('mysql')
var config = require('../config')
const moment = require('moment')

var pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.db
})

var query = function (sql, val) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return resolve(err)
            } else {
                connection.query(sql, val, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

let insertData = function (n) {
    let _sql = `INSERT INTO tb_driver_news(id, title, auther, pulish_time, href, imgs_url, content, contentHTML, createAt, updateAt) VALUES (null, '${n.title}', '${n.auther}', '${n.publishtime}', '${n.href}', '${n.imgsUrl}', '${n.content}','${n.contentHTML}', NOW(), NOW());`
    return query(_sql)
}

let selectData = function (t) {
    let re = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
    if (!re.test(t) || t === undefined || t === null) {
        t = moment().format('Y-M-D')
    }
    let _sql = `SELECT * FROM tb_driver_news WHERE DATE_FORMAT(createAt,'%Y-%m-%d') = '${t}';`
    return query(_sql)
}
module.exports = {
    insertData,
    selectData
}

```

util.js 客户端工具类

moment.js 直接官网下[moment.min.js](http://momentjs.com/) 就好了。
```
const moment = require('moment.js');
const getToday = () => {
  return moment(new Date()).format('Y-M-D');
}
const getWeek = date => {
  let w = '';
  switch (moment(date).format('E')) {
    case '1':
      w = '一';
      break;
    case '2':
      w = '二';
      break;
    case '3':
      w = '三';
      break;
    case '4':
      w = '四';
      break;
    case '5':
      w = '五';
      break;
    case '6':
      w = '六';
      break;
    case '7':
      w = '七';
      break;
  }
  return '星期'+w;
}
const getYesterDay = () => {
  return moment(new Date()).subtract(1, 'days').format('Y-M-D');
}
const getDayBeforeYesterDay = () => {
  return moment(new Date()).subtract(2, 'days').format('Y-M-D');
}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = {
  formatTime,
  getToday,
  getWeek,
  getYesterDay,
  getDayBeforeYesterDay,
  showBusy,
  showSuccess,
  showModel }

```

app.wxss
里面包含了fontawesome 的图标应用 实现原理就是吧字体文件ttf 转成 base64 格式的代码
然后引用就好了
我贴一部分具体的拿fontawesome.css替换就好了

下载地址[app.wxss](https://github.com/lirawx/weapp/raw/master/dtools/client/app.wxss)
```
@font-face {
    font-family: 'fa';
    src: url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTXLOMIUAAlXMAAAAHEdERUYAJwKrAAJVrAAAAB5PUy8yiDJ6IwAAAVgAAABgY21hcJ0vdNQAAAw4AAADAmdhc3D//wADAAJVpAAAAAhnbHlmHejPwQAAGdQAAh3kaGVhZAbB4eAAAADcAAAANmhoZWEO ....
.....
JkmAAAAAMtPPDAAAAAA01pbLg==) format('truetype');
    font-weight: normal;
    font-style: normal;
}

.fa {
  font-family: "fa" !important;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
}

/* makes the font 33% larger relative to the icon container */
.fa-lg {
  font-size: 1.33333333em;
  line-height: 0.75em;
  vertical-align: -15%;
}
.fa-2x {
  font-size: 2em;
}
.fa-3x {
  font-size: 3em;
}
.fa-4x {
  font-size: 4em;
}
.fa-5x {
  font-size: 5em;
}

```

