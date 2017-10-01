---
layout: post
tags: centos php openssl
title: centos 下php拓展的安装
date: 2017-10-01 10:01:22

---

## 环境配置
php 安装目录 /usr/local/php
php 源码目录  /home/xxx/php-5.6.22
OS centos 7

## phpize 编译安装拓展

phpize 需要进入php源码

```
cd /home/xxx/php-5.6.22/ext/openssl
```
然后运行
```
/usr/local/php/bin/phpize

```
此时会生成configure文件

然后执行安装配置
```
./configure --with-php-config=/usr/local/php/bin/php-config --with-openssl

```
这边注意php-config位置路径

最后
```
make

make install
```

## 验证是否成功

php -m
