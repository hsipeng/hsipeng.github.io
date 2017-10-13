---
layout: post
tags: mysql
title: mysql 日期零错误处理
date: 2017-10-13 10:01:22

---

## 情景简介
当我们从低版本数据库向高版本的数据库转入数据时经常性的会遇到不能为零的错误提示
比如5.6 到 5.7.

5.7 默认启用了strict mode,不支持‘0000-00-00：00:00:00’的日期类型的插入添加.

## 解决方法

- 1.java 或者其他语言链接时加参数

连接数据库转化为对象出错的解决办法为在数据库连接后面加上参数zeroDateTimeBehavior=convertToNull 这样如果碰到 ‘0000-00-00：00:00:00’的日期类型时，将会转化为null值.

例如:

```
db.jdbcurl=jdbc:mysql://192.168.1.52:3306/db?characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull
```

- 2.针对数据插入数据‘0000-00-00：00:00:00’ 数据本身不接受的解决办法为


  1、首先查询出数据库现有的模式

```
select @@sql_mode;
```

    2、把NO_ZERO_IN_DATE,NO_ZERO_DATE去掉，然后重新设置

```
SET GLOBAL sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```
