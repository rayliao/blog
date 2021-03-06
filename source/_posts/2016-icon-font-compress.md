---
title: 字体图标的压缩
tags:
  - 技术
  - 前端优化
abbrlink: 6187
date: 2016-02-26 11:31:20
---

字体图标管理办法：

* [阿里巴巴矢量图标库](http://iconfont.cn/)，可以新建图标管理项目，上传添加你想要的图标上去，图标项目可以添加成员共同管理。
* [百度字体编辑器](http://font.baidu.com/editor/)，百度这个，可以打开多个ttf，woff，eot，otf格式的字体文件，然后可以复制剪切修改单个字体。


所以字体图标的压缩方法，就是通过百度字体编辑器，删除没用上的字体图标，只保留需要的字体图标。

然后因为字体图标需要有多种字体格式，以适应浏览器的多样性，且在IIS部署的时候，还需要专门设置一下，针对`*.woff`和`*.svg`格式的加载问题。同时，在移动端宽带的限制下，加载多个字体文件，是不好的。所以，要换另外一种方式，就是把字体文件转换成`base64编码`格式。

使用的工具叫`fontmin`，详细使用方法可以浏览[fontmin官网](http://efe.baidu.com/blog/fontmin-getting-started/)。

<!-- more -->

安装`fontmin`：

````
$ npm install fontmin
````

在`gulpfile.js`添加转换字体的任务：

````
gulp.task('fontmin', function (){
    var Fontmin = require('fontmin');

    var srcPath = 'app/fonts/origin/xxxxx.ttf'; // 字体源文件
    var destPath = 'app/fonts';    // 输出路径
    var text = '需要提取的字体';  
    //用于设计稿有使用特殊字体，然引用整个字体文件太大，就可以提取需要的文字，比如设计稿中只使用了“风生水起”四个字，那么text的值改成“风生水起”，运行之后，就只生成这四个字的字体文件和base64编码

    // 初始化
    var fontmin = new Fontmin()
        .src(srcPath)               // 输入配置
        .use(Fontmin.glyph({        // 字型提取插件
            // text: text
        }))
        // .use(Fontmin.ttf2eot())     // eot 转换插件
        // .use(Fontmin.ttf2woff())    // woff 转换插件     
        // .use(Fontmin.ttf2svg())     // svg 转换插件
        .use(Fontmin.css({
            base64: true,
            glyph: true,
            iconPrefix: 'ioniconsmin-icon',  // class prefix, only work when glyph is `true`. default to "icon"
            fontFamily: 'ioniconsmin',   // custom fontFamily, default to filename or get from analysed ttf file
            asFileName: false       
        }))
        .dest(destPath);            // 输出配置

    // 执行
    fontmin.run(function (err, files, stream) {

        if (err) {                  // 异常捕捉
            console.error(err);
        }

        console.log('done');        // 成功
    });
});
````

打开命令行，输入命令：
````
$ gulp fontmin
````
会生成字体文件和样式文件。

done.
