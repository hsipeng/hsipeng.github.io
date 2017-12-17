---
layout: post
tags: maven modules
title: maven 分模块工程
date: 2017-12-17

---

在平时的Javaweb项目开发中为了便于后期的维护，我们一般会进行分层开发，最常见的就是分为domain（域模型层）、dao（数据库访问层）、service（业务逻辑层）、web（表现层），这样分层之后，各个层之间的职责会比较明确，后期维护起来也相对比较容易，今天我们就是使用Maven来构建以上的各个层。每个层对应一个模块，这里domain层为model 包， web 层为controller层。


<!-- more -->

项目结构如下:

```
.
├── README.md
├── maven_archetype_custom.iml
├── maven_archetype_custom_common
│   ├── maven_archetype_custom_common.iml
│   ├── pom.xml
│   └── src
├── maven_archetype_custom_controller
│   ├── maven_archetype_custom_controller.iml
│   ├── pom.xml
│   └── src
├── maven_archetype_custom_dao
│   ├── maven_archetype_custom_dao.iml
│   ├── pom.xml
│   └── src
├── maven_archetype_custom_model
│   ├── maven_archetype_custom_model.iml
│   ├── pom.xml
│   └── src
├── maven_archetype_custom_service
│   ├── maven_archetype_custom_service.iml
│   ├── pom.xml
│   └── src
├── pom.xml
└── src
    ├── main
    └── test

```

## 环境

- mac os 10.13.2
- idea 2017.2
- maven 3.5

## 实现步骤

parent 包普通maven项目就好，主要是配置pom.xml ，所有的依赖jar包都可以写入pom.xml 后面创建的模块会继承这个pom.xml。
差不多这种感觉：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.lirawx</groupId>
    <artifactId>maven_archetype_custom</artifactId>
    <packaging>pom</packaging>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>maven_archetype_custom_common</module>
        <module>maven_archetype_custom_model</module>
        <module>maven_archetype_custom_dao</module>
        <module>maven_archetype_custom_service</module>
        <module>maven_archetype_custom_controller</module>
    </modules>
  .......
</project>
```

接下来创建其他模块，直接parent 包右键new -> module 就好，然后除了controller包也就是web层是webapp 也就是war打包以外其他都是普通maven项目,也就是packaging设置为pom。

项目结构搭建好了，现在还不能整个项目编译，我们稍稍修改一些配置。controller 层依赖service层，service 层依赖dao层，dao层依赖model层，所以我们需要在pom.xml中添加相关依赖。这边我所有工具包都在common包下，所以他们都依赖common包，

下面贴一下配置
model 层

```xml
	<parent>
        <artifactId>maven_archetype_custom</artifactId>
        <groupId>cn.lirawx</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>maven_archetype_custom_model</artifactId>
    <dependencies>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_common</artifactId>
            <version>${project.version}</version>
        </dependency>
    </dependencies>
      
```

dao 层

```xml
<parent>
        <artifactId>maven_archetype_custom</artifactId>
        <groupId>cn.lirawx</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>maven_archetype_custom_dao</artifactId>
    <dependencies>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_common</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_model</artifactId>
            <version>${project.version}</version>
        </dependency>
    </dependencies>

```



service 层

```xml
<parent>
        <artifactId>maven_archetype_custom</artifactId>
        <groupId>cn.lirawx</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>maven_archetype_custom_service</artifactId>
    <dependencies>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_common</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_model</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_dao</artifactId>
            <version>${project.version}</version>
        </dependency>
    </dependencies>

```



controller 层

```xml
<parent>
        <artifactId>maven_archetype_custom</artifactId>
        <groupId>cn.lirawx</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>
    <artifactId>maven_archetype_custom_controller</artifactId>
    <packaging>war</packaging>
    <name>maven_archetype_custom_controller Maven Webapp</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_common</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_model</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>cn.lirawx</groupId>
            <artifactId>maven_archetype_custom_service</artifactId>
            <version>${project.version}</version>
        </dependency>
    </dependencies>

```

> ${project.version} 是maven自带的属性，表示整个工程的version

