---
layout: post
tags: ubuntu 
title: Ubuntu使用dnsmasq作本地DNS缓存
date: 2017-07-23T02:06:56Z
---

使用dnsmasq解决dns劫持，dns污染等问题
## 安装
```
sudo apt-get install dnsmasq
```
## 配置
### 修改/etc/resolv.conf文件
```
sudo vim /etc/resolv.conf  
```
将原有的内容全部注释，然后在第一行写上
```
nameserver 127.0.0.1
```
### 在/etc目录下新建resolv.dnsmasq文件
```
#local
nameserver 127.0.0.1
#pbulic+
nameserver 119.29.29.29
#v2ex
nameserver 178.79.131.110
#alibaba
nameserver 223.5.5.5
#onedns
nameserver 112.124.47.27
#dnspod dns+
nameserver 182.254.116.116
#114
nameserver 114.114.114.114
#google2
nameserver 8.8.4.4

```
### 编辑“/etc/dnsmasq.conf”文件
```
sudo gedit /etc/dnsmasq.conf
```
将resolv-file=放开注释
```
resolv-file=/etc/resolv.dnsmasq
```

### 编辑 /etc/dhcp/dhclient.conf
```
sudo vim /etc/dhcp3/dhclient.conf 
```
> 找到下面这一项 #prepend domain-name-servers 127.0.0.1将前面的“#”删除。这么做的目的是为了在使用自动连接时，能在/etc/resolv.conf文件的第一行添加上“nameserver 127.0.0.1”，这样，dns缓存依然有效。


### 编辑 etc/default/dnsmasq
```
sudo vim /etc/default/dnsmasq

```
 >  找到IGNORE_RESOLVCONF=yes，这一条要删除注释，删掉#号

## 重启服务

```
sudo service dnsmasq restart
```

## 测试结果:
```
dig google.com
```
> 两次返回结果的时间不一样，第二次一般是0ms；多试几个网址，证明成功了。


## 测试环境
ubuntu 16.04.
Raspberry Pi 2 B+
