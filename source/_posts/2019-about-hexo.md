---
title: 关于hexo
tags: Hexo
abbrlink: 27066
date: 2019-08-24 12:59:33
---

最近神差鬼使的想着完善的`blog`的功能，想尝试加下标签的列表页，还有`dark mode`，也顺便把多语言加上。

然后在加标签的列表页的时候，弄得很烦躁，`jade`的语法不记得了，不知道是不是`hexo`自带的缓存，你怎么改都没用，本地运行的服务就是不生效，烦得很，就不想弄了。有空慢慢的把`jade`的模板改成`ejs`，方便些用，毕竟`hexo`官网上面的例子那些都是使用这个模板的，方便对照。

<!-- more -->

写这篇主要是想记录下，然后因为刚才看到之前写的一篇文章的图片没了，都忘记是放在哪的了，就想着用`post_asset_folder`试下，在config那里把这个设置为`true`，创建文章的时候就会自动创建一个同名的文件夹，然后在文章中加上就可以了：

{% asset_img logo.svg This is an example image %}

#### ejs模板比较好用

这两天在把博客在用的主题从`jade`改成`ejs`，发现`ejs`确实比较好用，至少你不知道如何写的时候能参考文档或对照他人写的。

个人觉得，html模板还是以html的语法为主，加上绑定判断这些语法糖即可，如果像`jade`（现在叫`pug`）把html的语法整个改了，虽说语法简洁也易懂，但就多了一层学习成本，使用模板很重要的一点就是用起来容易，不用花费太多时间。

--

有人说hexo的文档写得不好，可我觉得还行吧，基本上想要实现的，官方文档都能找到相对应的。