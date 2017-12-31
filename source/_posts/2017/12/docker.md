---
layout: post
tags: docker
title: docker容器简单总结
date: 2017-12-31T12:37:33+08:00

---
docker 现代化服务端部署运行环境的解决方案，避免了很多程序兼容性的问题，所以值得每个软件开发人
掌握，一下是我自己学习之后稍微的整理出的知识点。
<!-- more -->

## 容器技术
容器技术是docker 的核心和基础。核心知识主要回答有关容器 what, why 和 how 三方面的问题。 其中以 how 为重，将展开讨论架构、镜像、容器、网络和存储。
进阶知识包括将容器真正用于生产所必需的技术，包括多主机管理、跨主机网络、监控、数据管理、日志管理和安全管理。 大家有兴趣深入docker，可以去看看
[《每天5分钟玩转Docker容器技术》](https://item.jd.com/16936307278.html)这本书。

## 容器平台技术

“容器平台技术”包括容器编排引擎、容器管理平台和基于容器的 PaaS。容器平台技术在生态环境中占据着举足轻重的位置，对于容器是否能够落地，是否能应用于生产至关重要。

## 容器核心技术
一想到容器就想到docker，docker因为构建了完整的容器生态系统，所以他成功了。
<table><tbody>
    <tr>
        <th rowspan="7">容器核心技术</th>
    </tr>
    <tr>
        <td>容器规范</td>
    </tr>
    <tr>
        <td>容器runtime</td>
    </tr>
    <tr>
        <td>容器管理工具</td>
    </tr>
    <tr>
        <td>容器定义工具</td>
    </tr>
    <tr>
        <td>Registries</td>
    </tr>
    <tr>
        <td>容器OS</td>
    </tr>
</table> 

> 容器规范(OCI) ，不同的组织和厂商开发的容器能够在不同的runtime中运行。

> 容器 runtime，需要跟操作系统kernel紧密结合，java 程序类似容器，jvm 类似runtime。jvm 为java 程序提供运行环境。所以容器只能在runtime 中运行。lxc、runc 和 rkt 是目前主流的三种容器 runtime。


> 容器管理工具 容器管理工具对内与 runtime 交互，对外为用户提供 interface。runc 的管理工具是 docker engine。docker engine 包含后台 deamon 和 cli 两个部分。我们通常提到 Docker，一般就是指的 docker engine。


> 容器定义工具，容器定义工具允许用户定义容器的内容和属性，这样容器就能够被保存，共享和重建。docker image 是 docker 容器的模板，runtime 依据 docker image 创建容器。
> dockerfile 是包含若干命令的文本文件，可以通过这些命令创建出 docker image。
> ACI (App Container Image) 与 docker image 类似，只不过它是由 CoreOS 开发的 rkt 容器的 image 格式。



> Registry，容器是通过 image 创建的，需要有一个仓库来统一存放 image，这个仓库就叫做 Registry。


> 容器 OS ，容器 OS 是专门运行容器的操作系统。与常规 OS 相比，容器 OS 通常体积更小，启动更快。因为是为容器定制的 OS，通常它们运行容器的效率会更高。

以上是一些简单的技术名词介绍，方便大家理解容器，下面讲怎么样应用docker.


## 容器的优势
### 对于开发人员 

- Build Once, Run Anywhere容器意味着环境隔离和可重复性。开发人员只需为应用创建一次运行环境，然后打包成容器便可在其他机器上运行。另外，容器环境与所在的 Host 环境是隔离的，就像虚拟机一样，但更快更简单。

### 对于运维人员 

- Configure Once, Run Anything只需要配置好标准的 runtime 环境，服务器就可以运行任何容器。这使得运维人员的工作变得更高效，一致和可重复。容器消除了开发、测试、生产环境的不一致性。

## Docker 架构
![](https://i.loli.net/2017/12/31/5a4872f9530be.png)

## Docker 客户端
最常用的 Docker 客户端是 docker 命令。通过 docker 我们可以方便地在 Host 上构建和运行容器。

## Docker 服务器
Docker daemon 是服务器组件，以 Linux 后台服务的方式运行。
可以查看运行情况
```bash
systemctl status docker.service
```
## Docker 镜像

可将 Docker 镜像看成只读模板，通过它可以创建 Docker 容器。例如某个镜像可能包含一个 Ubuntu 操作系统、一个 Apache HTTP Server 以及用户开发的 Web 应用。
镜像有多种生成方法：

- 可以从无到有开始创建镜像
- 也可以下载并使用别人创建好的现成的镜像
- 还可以在现有镜像上创建新的镜像

我们可以将镜像的内容和创建步骤描述在一个文本文件中，这个文件被称作 Dockerfile，通过执行 docker build <docker-file> 命令可以构建出 Docker 镜像。

## Docker 容器
Docker 容器就是 Docker 镜像的运行实例。

用户可以通过 CLI（docker）或是 API 启动、停止、移动或删除容器。可以这么认为，对于应用软件，镜像是软件生命周期的构建和打包阶段，而容器则是启动和运行阶段。

## Registry
Registry 是存放 Docker 镜像的仓库，Registry 分私有和公有两种。
`docker pull `命令可以从 Registry 下载镜像。 `docker run `命令则是先下载镜像（如果本地没有），然后再启动容器。

## helloword
```bash
下载hello-wrold镜像
docker pull hello-world

查看

docker imges hello-world

运行

docker run hello-world
> Hello from Docker!
```

到此docker就介绍完了。可以去参考一下链接。

## 参考链接
[每天5分钟玩转Docker容器技术（一）](https://juejin.im/post/5a40aa1a6fb9a0452a3c8ec0)
[每天5分钟玩转Docker容器技术（二）](https://link.juejin.im/?target=https%3A%2F%2Fjuejin.im%2Fpost%2F5a43037b5188252bca05239a)
[每天5分钟玩转Docker容器技术（三）](https://juejin.im/post/5a44531e518825455f2f9390)
