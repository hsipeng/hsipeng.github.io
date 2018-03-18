---
author: lirawx
head: http://7xl4ai.com1.z0.glb.clouddn.com/logo.jpg
date: 2015-08-15
title: mac下ssd trim 开启
images: http://7xl4ai.com1.z0.glb.clouddn.com/ssd.jpg
tags: efi
category: mac
status: publish
summary: 很多人自己加ssd给苹果鸡，然后没有开trim，又或者穷屌pc上ssd装了mac开启trim，不知道该怎么办了。大家都知道trim开了对ssd好处，所以就不废话了直接上命令...

---
很多人自己加ssd给苹果鸡，然后没有开trim，又或者穷屌pc上ssd装了mac开启trim，不知道该怎么办了。大家都知道trim开了对ssd好处，所以就不废话了直接上命令...

#####打开终端一次输入以下三句命令：

```
sudo cp /System/Library/Extensions/IOAHCIFamily.kext/Contents/PlugIns/IOAHCIBlockStorage.kext/Contents/MacOS/IOAHCIBlockStorage  /System/Library/Extensions/IOAHCIFamily.kext/Contents/PlugIns/IOAHCIBlockStorage.kext/Contents/MacOS/IOAHCIBlockStorage.original
```
<!-- more -->

```
sudo perl -p0777i -e 's@((?:Rotational|WakeKey\x0a)\x00{1,20})APPLE SSD(\x00{1,20}[QMT])@$1\x00\x00\x00\x00\x00\x00\x00\x00\x00$2@' /System/Library/Extensions/IOAHCIFamily.kext/Contents/PlugIns/IOAHCIBlockStorage.kext/Contents/MacOS/IOAHCIBlockStorage
```


```
sudo touch /System/Library/Extensions/
```

以上适用于10.9