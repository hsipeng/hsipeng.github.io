---
layout: post
tags: wifi
title: linux 无线网络启用
date: 2015-03-07

---
####方法一
sudo rmmod acer-wmi
#####这样就可以打开无线了！无线信号也会出来 ，但是有一个问题就是，只要机器一重启，那个文件又被修改回来了！
####方法二（完美）
blacklist acer-wmi
这个命令加入到/etc/modprobe.d/blacklist.conf文件最后即可。

