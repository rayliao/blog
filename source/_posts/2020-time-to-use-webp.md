---
title: webp是该用起来了
tags: 技术
abbrlink: 7b2b0798
date: 2020-05-22 20:54:46
---

webp的好处不用多说了，相比jpg和png格式，文件大小能节省很多。但因为并不是所有浏览器都支持，所以需要做一些兼容处理。

### 得到webp

随便搜索引擎一搜，会有很多在线转换图片格式的工具，也有很多可供下载的工具，看你自己怎么用了，比如说前端的`gulp`，会有对应的图片压缩转换的插件可使用。这里我就说下google提供的的命令行工具`webp`。

在Mac下可以使用homebrew安装webp工具：

```bat
brew install webp
```

安装完成之后，就可以使用cwebp将jpg或png转成webp格式：

```bat
cwebp [-preset <...>] [options] in_file [-o out_file]
```

更多的操作自行查阅[文档](https://developers.google.com/speed/webp/docs/using)吧。

<!-- more -->

### 后端处理

这里就不细说了，大概原理就是在浏览器向服务器发起请求时，对于支持webp图片的浏览器，会在请求头Accept中带上image/webp的信息，服务器就能识别浏览器是否支持webp从而返回对应的图片格式，具体可查看凹凸实验室的文章——[探究WebP一些事儿](https://aotu.io/notes/2016/06/23/explore-something-of-webp/)

### 前端处理

在页面上可以使用`picture`标签来做兼容，会根据浏览器设备版本选择不同的选项：

```html
<picture>
    <!-- JPEG -->
    <source
        srcset="./images/example.jpg"
        type="image/jpeg">
    <!-- WebP -->
    <source
        srcset="./images/example.webp"
        type="image/webp">
    <!-- The fallback -->
    <img
        src="./images/example.jpg" alt="example">
</picture>
```

但这样写会比较臃肿，可以通过`Service Wroker`来拦截网络请求，监听fetch事件，根据Accept头部来判断浏览器是否支持webp图片，并且查找是否存在`image/webp`Mime类型，这样就可以确定并替换成webp返回。

```ts
// serviceWorker.ts
window.addEventListener('fetch', (e: any) => {
    // Clone the request
    const req = e.request.clone()

    // Check if the image is a jpeg
    if (/\.jpg$|.png$/.test(e.request.url)) {
    // Get all of the headers
    const headers: string[] = Array.from(req.headers.entries())

    // Inspect the accept header for WebP support
    const acceptHeader: string[] = headers.filter(
        (item) => item[0] === 'accept'
    )
    const supportsWebp = acceptHeader[1].includes('webp')

    // If we support WebP
    if (supportsWebp) {
        // Build the return URL
        const returnUrl =
        req.url.substr(0, req.url.lastIndexOf('.')) + '.webp'

        e.respondWith(
        fetch(returnUrl, {
            mode: 'no-cors',
        })
        )
    }
    }
})
```

然后页面就可以写得简单些：

```html
<picture>
    <source
        srcset="./images/example.jpg"
        type="image/jpeg">
</picture>
```

但看了下这个[例子](https://deanhume.github.io/Service-Workers-WebP/)，也一样会去请求jpg的图片，那这样就不起作用了。

### React下使用且要支持CSS内使用

上面的方式是挺方便的，但因为我的个人网站目前使用react，有些图片是导入进去使用的，我试了下如此service worker的方式就不支持了。加之很多时候会在css内引入背景图片，所以不能在service worker做判断，那就还是在页面上操作：

```jsx
const ImgWithFallback = ({
  src,
  fallback,
  type = 'image/webp',
  ...delegated
}) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} {...delegated} />
    </picture>
  );
};
```

使用的时候是：

```jsx
<ImgWithFallback
  src={require("./images/example.webp")}
  fallback={require("./images/example.png")}
  alt="example"
/>
```

想要在css内使用webp，就得知道浏览器是否支持webp，然后在html加上一个class做标识，如此在css内使用background引入图片的时候，就可以根据class去引入不同格式的图片。

如何知道浏览器是否支持webp呢，创建一个canvas判断下：

```js
function canUseWebP() {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    // very old browser like IE 8, canvas not supported
    return false;
}
```

然后根据判断在html标签加上class即可。

参考：

- https://aotu.io/notes/2015/11/06/webp-responsive-image/
- https://aotu.io/notes/2016/06/23/explore-something-of-webp/
- https://www.npmjs.com/package/react-image-webp
- https://joshwcomeau.com/performance/embracing-modern-image-formats/
- https://developers.google.com/speed/webp/docs/using
- https://css-tricks.com/using-webp-images/#article-header-id-3