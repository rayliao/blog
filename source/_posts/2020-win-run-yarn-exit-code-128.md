---
title: "\U0001F986Windows下运行yarn exit code: 128"
tags: 技术
abbrlink: e1375075
date: 2020-07-27 12:00:56
---

项目运行yarn安装依赖报128错。昨晚11点多尝试了几次，今天早上起来又尝试了几次。在google找答案，issues上的答案都尝试了一遍。

有人说清理缓存，yarn clean cache，不行。
有人说删掉cache文件夹，不行。
有人说删掉yarn.lock，不行。
有人说删掉node_modules，没安装成功不存在node_modules。

<!--more-->

无答案参考：https://github.com/yarnpkg/yarn/issues/3303

然后以为是yarn的问题，换用npm去安装，发现依旧还是同样的错误。

接着安装好了outline，尝试挂VPN安装，IT WORKS！

唉，国内的开发环境就是有这些掣肘。想要顺利开发，你得先学习如果科学上网，纯粹科学上网还不行，像Shadowsocks这些软件只能用于正常浏览器上网，要想让命令行也穿透，得使用outline。

——这是最好的时代