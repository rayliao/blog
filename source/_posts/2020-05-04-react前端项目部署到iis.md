---
title: react前端项目部署到iis
abbrlink: c1176cea
date: 2020-05-04 10:52:34
tags: 技术
---

这几天开发用于微信公众号的页面，被微信网页授权，搞得烦死了。授权好多步骤，又跟之前的小程序的`openid`有些冲突，换成`unionid`，但也遇到一系列的坑。项目是`create react app`搭建的，为了避免跨域问题，在`package.json`配置了代理。对iis不熟悉，网上搜刮了很多资料，捣腾了很久。

<!-- more -->

#### BrowserRouter or HashRouter

直接使用`BrowserRouter`，iis不作配置的话，访问会报404错，路由问题，iis估计会把地址如`http://url/app`当作是`http://url/app.html`去访问，所以报404了。通过url rewrite应该就可以了，没去试过。直接使用HashRouter省事很多，不用配置，直接可以用。

#### 代理映射

项目另外配置有接口地址，只需要在`package.json`配置`proxy: "http://api.url.com/"`，就可以了，本地运行没问题，但这个配置只是针对node服务器生效，在iis上要生效的话，得配置URL rewrite，然后这两天就卡在这里，我本身不熟悉这一块，我朋友配置服务器也不熟悉这块，网上资料也不多，所以折腾了很久。

具体就是，`build`的时候，代理接口的请求加上前缀`/api`，iis那边需要做URL的重写，把请求到`/api`的映射到接口地址去，如`http://api.url.com`，开始朋友根据网上的教程，配置成重定向了一直不行，后来配置成重写，又变成访问404。

后来才找到一个教程，是要安装ARR，配置反向代理：

具体需求：

假如我的项目地址是`web.url.com`，接口请求数据是`web.url.com/api/**/**`，例如获取用户数据`web.url.com/api/user/getdata`，实际请求接口就应该是`api.url.com/user/getdata`。

要实现上面的需求，需要iis在7及以上。

1. 安装ARR: [下载地址](http://www.iis.net/downloads/microsoft/application-request-routing)

2. 开启代理功能，进入操作版面的`Server Proxy Settings`选项，开启代理。

3. 配置反向代理规则。进入部署的站点，进入URL重写功能。左侧操作菜单选择添加规则，新建一条入站规则，选择空白规则，目的是匹配请求的URL，当符合我们添加的规则时，则进行反向代理的操作，假定所有的接口请求都是这种`web.url.com/api/**/**`以api这个关键词开头，写一个正则表达式来匹配需要反向代理的url请求     

4. 编辑入站规则：
   1. 填写匹配URL选项相关信息，采用与模式匹配的正则表达式，表达式为：`^api/(.*)`，匹配所有前端站点的包含api的url请求
   2. 填写条件，条件是说匹配哪个域名，填写文章开头说的前端站点的域名`web.url.com`，条件输入：`{HTTP_HOST}`（请求的主机名），模式：`^web.url.com$`(如果有端口可以加上端口)
   3. 填写反向代理最终指向的地址，前面我们所做的匹配，就是为了这一步所做的准备，操作类型是重写，URL填写：`http://web.url.com/api/{R:1}`，注意前面匹配了URL中包含api关键词的URL，这里必须加上`/api/{R:1}`，`{R:1}`是说api后面的参数都带着

参考来源：
- [React的Api代理和IIS配置](https://www.cnblogs.com/scudfly/p/11765282.html)
- [IIS8反向代理，前后端分离部署解决方案](https://blog.csdn.net/u010696334/article/details/98944294)