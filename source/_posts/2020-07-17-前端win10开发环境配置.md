---
title: "\U0001F6E0前端win10开发环境配置"
tags: 教程
abbrlink: 5adce451
date: 2020-07-17 14:18:33
---

### 🗽科学上网

这个还是得最先配置好，才不会束手束脚的，下载软件也方便。

一句话：安装Shadowsocks，自己找线路。

不展开。

### 📦装机必备软件

- 更新最新版的Microsoft Edge（自从使用谷歌的内核后，很好用了
- 微信客户端（不得不用的，顺便充当截图工具
- Photoshop（切图仔老实安装吧
- Microsoft Office（网络好的话，其实在线版就挺好，onedrive已经越来越好用了
- Visual Studio Code（现今最好用的，很多插件自己选择了
- Chrome浏览器
- Microsoft Terminal Preview
- 7-Zip
- Telegram（选装

<!--more-->

### 🚧开发环境配置

**🎨命令行工具美化**

参考：
- https://docs.microsoft.com/zh-cn/windows/terminal/
- https://sspai.com/post/59380
- https://sspai.com/post/52868

跟着官方教程就很好了。还可以顺便安装Git for windows。

选了个oh-my-posh的主题Zash还行，虽然还是没有hyper酷炫。

在配置PowerShell时，会遇到执行策略权限问题。可参考: https://www.jianshu.com/p/4eaad2163567 

### 🔑配置ssh

看着github的教程配置即可，常规问题的解决方案都给得很详细了。
参考：https://docs.github.com/cn/github/authenticating-to-github/connecting-to-github-with-ssh

**踩坑🕳️**
配置好ssh之后，一直提示权限被拒绝，开始以为是防火墙问题，关掉依旧不行，然后发现git bash下可以，windows terminal下不行。找了下，发现要配置config，加上host和配置文件的路径对应就可以了。

### 🔌安装node管理工具nvm-windows和node，还有yarn

**踩坑🕳️**
安装nvm-windows的时候，踩了一个坑，没有以管理员的方式去运行安装，导致node虽然安装了，但命令行无法识别，估计得手动设置环境变量，但这样不人性化，删掉nvm，重新以管理员的身份去运行安装，就可以了。

安装yarn很简单，全局安装即可：npm install -g yarn

好了，基本上环境配置好，代码clone下来之后，就可以愉快的开发了。

关于开发效率辅助的，其实还有很多可以说，比如vscode的插件，代码测试调试这些，不展开来说了，很多东西自己慢慢会熟悉的。