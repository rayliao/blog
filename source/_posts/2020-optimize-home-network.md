---
title: 优化下家里的网络
tags: 教程
abbrlink: bb608ee0
date: 2020-06-09 10:58:14
---

用的宽带是移动的200m，房子是租的，三房一厅94平，一个TP-Link的路由器放在客厅，其实一直觉得在主卧网速很差，但没有过多去理会，以为是移动本身的问题。

上周网络差到不行，躺在床上没办法工作，就下定决定好好排查下是移动宽带的问题还是路由器问题。网上找了下，可以通过ping的方式看下发送包和丢包情况去判断下宽带的速度，还可以直接连一下移动的网关试一下如何。后来思考了下，也不用那么麻烦，直接用测速的在客厅分别连下路由器和移动的网关就行了。然后发现路由器和移动的网关速度都很可以啊。然后在几个房间分别测试了下，主卧速度差到不行，看来是Wi-Fi信号衰减的问题无疑了。

<!--more-->

知道问题所在就好办了，接着就是选择解决方案。最高枕无忧的方法当然是拉一条网线进去主卧，但有些困难，因为是租的房子，只能明线，就会很丑，而且没有洞可以穿进房间。所以使用网线的方案都放弃。其实一开始还傻乎乎的去尝试看已有那台路由器能不能跟移动的智能网关做无线桥接，发现移动的网关并不支持，也就一直连不上。

1. 首先尝试了最实惠的方案，在某东买了TP-Link的无线信号放大器，测试插在了几个位置，但发现效果差强人意，只好退货放弃；
2. 接着考察了下去房间的走廊情况，想着能不能把网线拉到那，再接上一台路由器，做桥接，但没有找到理想的插座，也只好作罢。
3. 最后趁着618咬咬牙买了华硕的AC86U，有30天无忧体验挺好，把原来那个路由器放到房间做桥接，效果还行，虽然也并没有达到理想状态，但比之前好多了，信号衰减了50%吧。其实做无线桥接买个普通的路由器就好了。但自己有私心，想玩下，想刷梅林，挂下ss体验下。

网上一直有说华硕这个路由器不稳定，经常断流，不知道会不会。先体验下吧，这个路由器支持华硕的AiMesh，但没那个本钱买多一台，这个功能对我暂时没用，插u盘似乎支持得挺好，后面可以弄个简易的Nas，似乎主打游戏模式，但自己现在不玩游戏，对我也没用。

### 后记

再三考虑之后（流下了没钱的泪），还是把AC86U退掉了。然后换了台小米的路由器，这次拿回来之后用5G的桥接，在主卧速度竟然很棒，也就更加没有理由留下AC86U了。

本来还考虑要不要升级移动的宽带，每个月加50元，可以升级到600M，还送两台路由器，挺香的，但就是要被移动监禁两年。也是再三考虑之后（再次流下了没钱的泪），想想200M也够了，平时在家宽带使用率也不高，也就作罢了。

参考：[WiFi穿墙完全指南](https://zhuanlan.zhihu.com/p/51101641)