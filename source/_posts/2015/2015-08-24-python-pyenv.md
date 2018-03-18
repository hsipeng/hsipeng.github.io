---
layout: post
tags: python 
title: python之pyenv版本控制
date: 2015-08-24


---


当需要多个python共存时，pyenv提供了解决知道

#####安装pyenv
<!-- more -->

```
git clone git://github.com/yyuu/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
exec $SHELL -l

```

#####用pyenv安装python

查看可安装的版本

```
 pyenv install --list
```


#####安装指定版本(3.4.0为例)

```
 pyenv install 3.4.0 -v
```

#####安装之后要对数据库进行更新

```
 pyenv rehash
```
 


#####设置全局python版本

```
pyenv global 3.4.0
```