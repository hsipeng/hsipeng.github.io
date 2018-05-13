---
layout: post
tags: btsync ubuntu
title: Ubuntu安装BTSync
date: 2017-05-25

---

BTSync是多台电脑之间同步文件的利器，很好用。

在Ubuntu上安装BTSync的步骤：

## 添加btsync官方的Repository

以下命令新建一个 /etc/apt/sources.list.d/btsync.list 文件。

```
sudo sh -c 'echo "deb http://linux-packages.getsync.com/btsync/deb btsync non-free" > /etc/apt/sources.list.d/btsync.list'
```
## 安装BTSync的Public key

<!-- more -->
使Ubuntu信任此BTSync提供的Repository。

```
wget -qO - http://linux-packages.getsync.com/btsync/key.asc | sudo apt-key add -
```
## 安装

接下来就能用apt-get安装BTSync了，需要先update一下。

```
sudo apt-get update
sudo apt-get install btsync
```

## 创建用于同步的目录

安装默认创建了一个btsync用户，可以创建一个新目录并授权给btsync用户，以后同步的内容就放在这个目录下。

```
sudo mkdir /home/btsync
sudo chown btsync /home/btsync
```
## 使BTSync自动启动

默认启动服务的用户是btsync
```
sudo systemctl enable btsync
```

除了enable，systemctl命令还可以带disable、start、stop、status等参数。

## 通过web设置BTSync

在本地用浏览器访问localhost:8888即可。

如果是VPS或Ubuntu server等没有图形界面的系统，可以编辑BTSync的配置文件。

```
sudo vi /etc/btsync/config.json
```
找到下面内容：

```
"webui" :
{
    "listen" : "127.0.0.1:8888"
    //"listen" : "0.0.0.0:8888", 外网访问
    "login" : "yourusername",
    "password" : "yourpassword"
}
```

将 “127.0.0.1:8888” 修改为 “0.0.0.0:8888” ，保存退出。重启BTSync。
然后就能用其他机器的浏览器访问 “Ubuntu_IP:8888” 来设置BTSync。