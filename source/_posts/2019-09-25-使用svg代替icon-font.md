title: 使用svg代替icon font
date: 2019-09-25 10:25:46
tags: [Tech, 前端优化]
---

工作中遇到的问题，项目中有使用字体图标，因为需求设计把logo形态的图标也加到了字体图标库中，但因为这些新加的图标并不是正方形的，而是长方形的，当使用的时候，就需要设置成很大的字号，才能显示正常，然`iconfont`上的字体图标制作标准是方形的，也就导致了字体的高度也会和宽度一样，这显然不利于页面布局。

用万能的搜索引擎寻找了下解决方案，发现可以用`svg`代替。

开始考虑想一个个`svg`图标导进去使用，但页面那里引入`svg`和使用布局混在一起，太乱了：

```html
<svg class="icon1">
    <defs>
        ...
    </defs>
    <path d="...">
    </path>
</svg>
<svg class="icon2">
    <defs>
        ...
    </defs>
    <path d="...">
    </path>
</svg>
...
```

<!-- more -->

然后考虑`Symbols`的方式，把多个`svg`图标整合到一个`svg`中，生成类似下面这样的：

```html
<svg xmlns="http://www.w3.org/2000/svg">
    <symbol id="icon1">
        <path d="..."></path>
    </symbol>
    <symbol id="icon2">
        <path d="..."></path>
    </symbol>
</svg>
```

然后就可以根据`id`单独使用其中某个`icon`：

```html
<svg class="icon">
   <use xlink:href="#icon1"></use>
</svg>
```

#### 如何转换svg为symbols格式？

方式有挺多种，其他没了解，下面说下我使用的方式，用`gulp-svg-symbols`

首先安装此插件:

```c
npm install --save-dev gulp-svg-symbols
// or use yarn
yarn add -D gulp-svg-symbols
```

配置`gulpfile.js`：

```js
// svg转换
...
gulp.task('svg', function() {
  const svgSymbols = require('gulp-svg-symbols')
  const path = 'app/common/svg'
  return gulp
    .src(`${path}/source/*.svg`)
    .pipe(svgSymbols())
    .pipe(rename(path => (path.basename = 'partner')))
    .pipe(gulp.dest(path))
})
```

插件其他参数选项请参考[文档](https://github.com/Hiswe/gulp-svg-symbols)

参考：

- [Web 设计新趋势: 使用 SVG 代替 Web Icon Font](https://io-meter.com/2014/07/20/replace-icon-fonts-with-svg/)
- [Inline SVG vs Icon Fonts [CAGEMATCH]](https://css-tricks.com/icon-fonts-vs-svg/)