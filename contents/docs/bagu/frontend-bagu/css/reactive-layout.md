# 前端响应式布局

## 概念

响应式布局指的是同一页面在不同屏幕尺寸下有不同的布局。传统的开发方式是PC端开发一套，手机端再开发一套，而使用响应式布局只要开发一套就够，缺点就是CSS比较重。

> [!IMPORTANT]
> 响应式设计与自适应设计的区别：响应式开发一套界面，通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容；自适应需要开发多套界面，通过检测视口分辨率，来判断当前访问的设备是pc端、平板、手机，从而请求服务层，返回不同的页面。

## 响应式布局的实现方案

### 媒体查询(CSS的`@media`)

`CSS3`媒体查询可以让我们针对不同的媒体类型定义不同的样式，当重置浏览器窗口大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

#### 如何选择屏幕大小分割点

由于市面上设备在不停更新，各设备的屏幕分辨率参数不同，可以在网上查询实时屏幕分辨率统计分布情况。

对于屏幕大小分割断点的设计，可以根据以下断点进行微调：`600px`,`900px`,`1200px`,`1800px`，可以覆盖的设备如下：

![](/imgs/bagu/reactive-layout/resolution.png)

#### @media与@media screen

`@media screen`的css在打印设备里是无效的，而`@media`在打印设备里是有效的，如果css需要用在打印设备里，那么就用@media ，否则，就用@media screen。

不过这只是笼统的做法，其实如果把“screen”换为“print”，写为@media print，那么该css就可用到打印设备上了。但要注意：

> [!CAUTION] 注意
> `@media print`声明的css**只能**在打印设备上有效。

#### 媒体查询的工作方式

在`media`属性里：

- screen 是媒体类型里的一种，CSS2.1定义了10种媒体类型
- and 被称为关键字，其他关键字还包括 not(排除某种设备)，only(限定某种设备)
- (min-width: 400px) 就是媒体特性，其被放置在一对圆括号中。

**工作方式1: 直接在`link`标签中判断设备的尺寸，然后引用不同的css文件：**

意思是当屏幕的宽度大于等于400px的时候，应用`styleA.css`，当屏幕的宽度大于600px小于800px时，应用`styleB.css`

**工作方式2: 直接写在 style 标签里：**

```css
@media screen and (max-width: 600px) {
  /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  .class {
    background: #ccc;
  }
}
```

#### 移动优先 OR PC优先

不管是移动优先还是PC优先，都是依据当随着屏幕宽度增大或减小的时候，后面的样式会覆盖前面的样式。因此，移动端优先首先使用的是`min-width`，PC端优先使用的`max-width`。

**移动优先：**

```css
/* iphone6 7 8 */
body {
  background-color: yellow;
}
/* iphone 5 */
@media screen and (max-width: 320px) {
  body {
    background-color: red;
  }
}
/* iphoneX */
@media screen and (min-width: 375px) and (-webkit-device-pixel-ratio: 3) {
  body {
    background-color: #0ff000;
  }
}
/* iphone6 7 8 plus */
@media screen and (min-width: 414px) {
  body {
    background-color: blue;
  }
}
/* ipad */
@media screen and (min-width: 768px) {
  body {
    background-color: green;
  }
}
/* ipad pro */
@media screen and (min-width: 1024px) {
  body {
    background-color: #ff00ff;
  }
}
/* pc */
@media screen and (min-width: 1100px) {
  body {
    background-color: black;
  }
}
```

**PC优先：**

```css
/* pc width > 1024px */
body {
  background-color: yellow;
}
/* ipad pro */
@media screen and (max-width: 1024px) {
  body {
    background-color: #ff00ff;
  }
}
/* ipad */
@media screen and (max-width: 768px) {
  body {
    background-color: green;
  }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
  body {
    background-color: blue;
  }
}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
  body {
    background-color: #0ff000;
  }
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
  body {
    background-color: #0ff000;
  }
}
/* iphone5 */
@media screen and (max-width: 320px) {
  body {
    background-color: #0ff000;
  }
}
```

### 百分比布局

通过百分比单位，可以使得浏览器中组件的宽和高随着浏览器的高度的变化而变化，从而实现响应式的效果。Bootstrap里面的栅格系统就是利用百分比来定义元素的宽高，`CSS3`支持最大最小高，可以将百分比和`max(min)`一起结合使用来定义元素在不同设备下的宽高。

但是我们必须要弄清楚css中子元素的百分比到底是相对谁的百分比。

直接上结论吧：

子元素的`height`或`width`中使用百分比，是相对于子元素的直接父元素，`width`相对于父元素的`width`，`height`相对于父元素的`height`；子元素的`top`和`bottom`如果设置百分比，则相对于直接非`static`定位(默认定位)的父元素的高度，同样子元素的`left`和`right`如果设置百分比，则相对于直接非`static`定位(默认定位的)父元素的宽度；子元素的`padding`如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的`width`，而与父元素的`height`无关。跟`padding`一样，`margin`也是如此，子元素的`margin`如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的`width`；`border-radius`不一样，如果设置`border-radius`为百分比，则是相对于自身的宽度，除了`border-radius`外，还有比如`translate`、`background-size`等都是相对于自身的；

从上述对于百分比单位的介绍我们很容易看出如果全部使用百分比单位来实现响应式的布局，有明显的以下两个缺点：

- 计算困难，如果我们要定义一个元素的宽度和高度，按照设计稿，必须换算成百分比单位。
- 可以看出，各个属性中如果使用百分比，相对父元素的属性并不是唯一的。比如`width`和`height`相对于父元素的`width`和`height`，而`margin`、`padding`不管垂直还是水平方向都相对比父元素的宽度、`border-radius`则是相对于元素自身等等，造成我们使用百分比单位容易使布局问题变得复杂。

### rem布局

`rem`是CSS3新增的单位，并且移动端的支持度很高，Android2.x+,ios5+都支持。rem单位都是相对于根元素html的font-size来决定大小的,根元素的font-size相当于提供了一个基准，当页面的size发生变化时，只需要改变font-size的值，那么以rem为固定单位的元素的大小也会发生响应的变化。 因此，如果通过rem来实现响应式的布局，只需要根据视图容器的大小，动态的改变font-size即可（而em是相对于父元素的）。

#### rem响应式的布局思想

- 一般不要给元素设置具体的宽度，但是对于一些小图标可以设定具体宽度值
- 高度值可以设置固定值，设计稿有多大，我们就严格有多大
- 所有设置的固定值都用rem做单位(首先在HTML总设置一个基准值：px和rem的对应比例，然后在效果图上获取px值，布局的时候转化为rem值)
- js获取真实屏幕的宽度，让其除以设计稿的宽度，算出比例，把之前的基准值按照比例进行重新的设定，这样项目就可以在移动端自适应了

#### rem布局的缺点

在响应式布局中，必须通过js来动态控制根元素font-size的大小，也就是说css样式和js代码有一定的耦合性，且必须将改变font-size的代码放在css样式之前。

```ts twoslash
// @noErrors
// 将视图容器分为10份，font-size用十分之一的宽度来表示，
// 最后在header标签中执行这段代码，就可以动态定义font-size的大小，
// 从而1rem在不同的视觉容器中表示不同的大小，用rem固定单位可以实现不同容器内布局的自适应。
function refreshRem() {
  const docEl = doc.documentElement
  const width = docEl.getBoundingClientRect().width
  const rem = width / 10
  docEl.style.fontSize = `${rem}px`
  flexible.rem = win.rem = rem
}
win.addEventListener('resize', refreshRem)
```

`rem`布局也是目前多屏幕适配的最佳方式。默认情况下我们html标签的font-size为16px,我们利用媒体查询，设置在不同设备下的字体大小。

```css
/* pc width > 1100px */
html {
  font-size: 100%;
}
body {
  background-color: yellow;
  font-size: 1.5rem;
}
/* ipad pro */
@media screen and (max-width: 1024px) {
  body {
    background-color: #ff00ff;
    font-size: 1.4rem;
  }
}
/* ipad */
@media screen and (max-width: 768px) {
  body {
    background-color: green;
    font-size: 1.3rem;
  }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
  body {
    background-color: blue;
    font-size: 1.25rem;
  }
}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
  body {
    background-color: #0ff000;
    font-size: 1.125rem;
  }
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
  body {
    background-color: #0ff000;
    font-size: 1rem;
  }
}
/* iphone5 */
@media screen and (max-width: 320px) {
  body {
    background-color: #0ff000;
    font-size: 0.75rem;
  }
}
```

### 视口单位

`css3`中引入了一个新的单位`vw/vh`，与**视图窗口(viewport)**有关，`vw`表示相对于视图窗口的宽度，`vh`表示相对于视图窗口高度，除了vw和vh外，还有`vmin`和`vmax`两个相关的单位。各个单位具体的含义如下：

| 单位 | 含义                                                      |
| ---- | --------------------------------------------------------- |
| vw   | 相对于视窗的宽度，1vw 等于视口宽度的1%，即视窗宽度是100vw |
| vh   | 相对于视窗的高度，1vh 等于视口高度的1%，即视窗高度是100vh |
| vmin | vw和vh中的较小值                                          |
| vmax | vw和vh中的较大值                                          |

![viewport](/imgs/bagu/reactive-layout/viewport.png)

用视口单位度量，视口宽度为100vw，高度为100vh（左侧为竖屏情况，右侧为横屏情况）。例如，在桌面端浏览器视口尺寸为650px，那么 1vw = 650 \* 1% = 6.5px（这是理论推算的出，如果浏览器不支持0.5px，那么实际渲染结果可能是7px）。

那么vw或者vh很类似百分比单位。vw和%的区别为：

| 单位  | 含义                                                                       |
| ----- | -------------------------------------------------------------------------- |
| %     | 大部分相对于祖先元素，也有相对于自身的情况，比如border-radius、translate等 |
| vw/vh | 相对于视窗的尺寸                                                           |

从对比中我们可以发现，vw单位与百分比类似，的确有区别，前面我们介绍了百分比单位的换算困难，这里的vw更像"理想的百分比单位"。任意层级元素，在使用vw单位的情况下，1vw都等于视图宽度的百分之一。

#### 使用视口单位来实现响应式

有两种做法：

1. 仅使用vw作为CSS单位

- 对于设计稿的尺寸转换为单位，使用`sass/scss`函数编译

  ```scss
  //iPhone 6尺寸作为设计稿基准
  $vm_base: 375;
  @function vw($px) {
    @return ($px / 375) * 100vw;
  }
  ```

- 无论是文本还是布局宽度、间距等都使用vw作为单位

  ```scss
  .mod_nav {
    background-color: #fff;
    &_list {
      display: flex;
      padding: vm(15) vm(10) vm(10); // 内间距
      &_item {
        flex: 1;
        text-align: center;
        font-size: vm(10); // 字体大小
        &_logo {
          display: block;
          margin: 0 auto;
          width: vm(40); // 宽度
          height: vm(40); // 高度
          img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
          }
        }
        &_name {
          margin-top: vm(2);
        }
      }
    }
  }
  ```

- 1物理像素线（也就是普通屏幕下1px,高清屏幕下0.5px的情况）采用`transform: scale()`实现

  ```scss
  .mod_grid {
      position: relative;
      &::after {
          // 实现1物理像素的下边框线
          content: '';
          position: absolute;
          z-index: 1;
          pointer-events: none;
          background-color: #ddd;
          height: 1px;
          left: 0;
          right: 0;
          top: 0;
          @media only screen and (-webkit-min-device-pixel-ratio: 2) {
              -webkit-transform: scaleY(0.5);
              -webkit-transform-origin: 50% 0%;
          }
      }
      ...
  }
  ```

- 对于需要保持宽高比的图，应该用`padding-top`实现

```scss
.mod_banner {
  position: relative;
  padding-top: percentage(100/700); // 使用padding-top
  height: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
  }
}
```

2. 搭配vw和rem

虽然采用vw适配后的页面效果很好，但是它是利用视口单位实现的布局，依赖视口大小而自动缩放，无论视口过大还是过小，它也随着时候过大或者过小，失去了最大最小宽度的限制，此时我们可以结合`rem`来实现布局

- 给根元素字体大小设置随着视口变化而变化的vw单位，这样就可以实现动态改变其大小
- 限制根元素字体大小的最大最小值，配合body加上最大宽度和最小宽度

```scss
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vm_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
  @return ($px / $vm_fontsize) * 1rem;
}
// 根元素大小使用 vw 单位
$vm_design: 750;
html {
  font-size: ($vm_fontsize / ($vm_design / 2)) * 100vw;
  // 同时，通过Media Queries 限制根元素最大最小值
  @media screen and (max-width: 320px) {
    font-size: 64px;
  }
  @media screen and (min-width: 540px) {
    font-size: 108px;
  }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
  max-width: 540px;
  min-width: 320px;
}
```

### 图片响应式

这里的图片响应式包括两个方面：

- 大小自适应，这样能够保证图片在不同的屏幕分辨率下出现压缩、拉伸的情况；
- 根据不同的屏幕分辨率和设备像素比来尽可能选择高分辨率的图片，也就是当在小屏幕上不需要高清图或大图，这样我们用小图代替，就可以减少网络带宽了。

#### 使用max-width（图片自适应）

图片自适应意思就是图片能随着容器的大小进行缩放，可以采用如下CSS：

```css
img {
  display: inline-block;
  max-width: 100%;
  height: auto;
}
```

inline-block 元素相对于它周围的内容以内联形式呈现，但与内联不同的是，这种情况下我们可以设置宽度和高度。

max-width保证了图片能够随着容器的进行等宽扩充（即保证所有图片最大显示为其自身的 100%。此时，如果包含图片的元素比图片固有宽度小，图片会缩放占满最大可用空间），而height为auto可以保证图片进行等比缩放而不至于失真。如果是背景图片的话要灵活运用background-size属性。

那么为什么不能用width：100%呢？因为这条规则会导致它显示得跟它的容器一样宽。在容器比图片宽得多的情况下，图片会被无谓地拉伸。

#### 使用srcset

```html
<img srcset="photo_w350.jpg 1x, photo_w640.jpg 2x" src="photo_w350.jpg" alt="">
```

如果屏幕的dpi = 1的话则加载1倍图，而dpi = 2则加载2倍图，手机和Mac基本上dpi都达到了2以上，这样子对于普通屏幕来说不会浪费流量，而对于视网膜屏来说又有高清的体验。

如果浏览器不支持srcset，则默认加载src里面的图片。

但是你会发现实际情况并不是如此，在Mac上的Chrome它会同时加载srcset里面的那张2x的，还会再去加载src里面的那张，加载两张图片。顺序是先把所有srcset里面的加载完了，再去加载src的。这个策略比较奇怪，它居然会加载两张图片，如果不写src，则不会加载两张，但是兼容性就没那么好。这个可能是因为浏览器认为，既然有srcset就不用写src了，如果写了src，用户可能是有用的。而使用picture就不会加载两张。

#### 使用background-image

```css
.banner {
  background-image: url(/static/large.jpg);
}

@media screen and (max-width: 767px) {
  background-image: url(/static/small.jpg);
}
```

#### 使用`<picture>`标签

[picturefill.min.js](https://scottjehl.github.io/picturefill/): 解决**IE**等浏览器不支持的问题

```html
<picture>
    <source srcset="banner_w1000.jpg" media="(min-width: 801px)">
    <source srcset="banner_w800.jpg" media="(max-width: 800px)">
    <img src="banner_w800.jpg" alt="">
</picture>

<!-- picturefill.min.js 解决IE等浏览器不支持 <picture> 的问题 -->
<script type="text/javascript" src="js/vendor/picturefill.min.js"></script>
```

**picture必须要写img标签，否则无法显示**，对picture的操作最后都是在img上面，例如onload事件是在img标签触发的，picture和source是不会进行layout的，它们的宽和高都是0。

另外使用source，还可以对图片格式做一些兼容处理：

```html
<picture>
    <source type="image/webp" srcset="banner.webp">
    <img src="banner.jpg" alt="">
</picture>
```

## 总结

在实际项目中，我们可能需要综合上面的方案，比如用rem来做字体的适配，用srcset来做图片的响应式，宽度可以用rem，flex，栅格系统等来实现响应式，然后可能还需要利用媒体查询来作为响应式布局的基础，因此综合上面的实现方案，项目中实现响应式布局需要注意下面几点：

- 设置viewport
- 媒体查询
- 字体的适配（字体单位）
- 百分比布局
- 图片的适配（图片的响应式）
- 结合flex，grid，BFC，栅格系统等已经成型的方案
