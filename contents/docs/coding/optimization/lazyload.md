---
layout: doc
title: "图片懒加载"
lastUpdated: true
---

# 图片懒加载

## 概念

懒加载也叫延迟加载，指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式。用户滚动到它们之前，可视区域外的图像不会加载。这与图像预加载相反，在长网页上使用延迟加载将使网页加载更快。在某些情况下，它还可以帮助减少服务器负载。常适用图片很多，页面很长的电商网站场景中。

## 为什么要用懒加载

能提升用户的体验，不妨设想下，用户打开像手机淘宝长页面的时候，如果页面上所有的图片都需要加载，由于图片数目较大，等待时间很长，用户难免会心生抱怨，这就严重影响用户体验。
减少无效资源的加载，这样能明显减少了服务器的压力和流量，也能够减小浏览器的负担。
防止并发加载的资源过多会阻塞js的加载，影响网站的正常使用。

## 懒加载的原理

图片懒加载的原理是没有在可视区域的图片暂时不加载图片，等进入可视区域后在加载图片，这样可以减少初始页面加载的图片数量而提升页面加载速度。图片懒加载在提升页面加载速度的同时也会伴随用户看其他未展示的图片时会有等待时间；图片加载显示会伴有布局抖动等问题。

## 懒加载的实现方案

图片懒加载的关键是：**判断一个元素是否在可视区域**, 当元素在可视区域时再给src进行赋值。

### 方案一：img的loading属性设为“lazy”

> [!NOTE]
> HTMLImageElement 的 loading 属性为一个字符串，它的值会提示 用户代理 告诉浏览器不在可视视口内的图片该如何加载。这样一来，通过推迟图片加载仅让其在需要的时候加载而非页面初始载入时立刻加载，优化了页面的载入。lazy 告诉用户代理推迟图片加载直到浏览器认为其需要立即加载时才去加载。例如，如果用户正在往下滚动页面，值为 lazy 会导致图片仅在马上要出现在 可视视口中时开始加载。

```html
<img src="xxx.jpg" loading="lazy" />
```

兼容性：

![](/imgs/coding/optimization/lazyload/1-comp.png)

缺点:

虽然整个方案简单性能好，但问题也是最多的，所以很少使用这种方案。

- 前面提到图片懒加载用户看其他未展示的图片时会有等待时间，一般会设置一个默认图片，这种方案不能设置默认图片
- 图片的加载数量和图片的布局、可视区域尺寸有关，难以控制
- 图片的加载顺序也难以控制

该方案能粗略的实现图片懒加载基本功能。

### 方案二：getBoundingClientRect

[getBoundingClientRect的MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

该api返回值是一个 DOMRect对象，拥有left, top, right, bottom, x, y, width, 和 height属性

![](/imgs/coding/optimization/lazyload/element-box-diagram.png)

> [!IMPORTANT]
> 此处的right是元素右边界与视口左部的距离，bottom是元素下边界距离视口顶部的距离，而不是css属性中某些position的同名属性，注意区分。

当页面发生滚动的时候，top与left属性值都会随之改变。

如果一个元素在视窗之内的话，那么它一定满足下面四个条件：

- top 大于等于 0
- left 大于等于 0
- bottom 小于等于视窗高度
- right 小于等于视窗宽度

```ts twoslash
// @noErrors
function isInViewPort(element): boolean {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect()
  return (
    top >= 0
    && left >= 0
    && right < viewWidth
    && bottom < viewHeight
  )
}
```

### 方案三：Intersection Observer

> [!WARNING]
> 缺点：不支持低版本浏览器，不支持IE（哎）

`Intersection Observer`即重叠观察者，从这个命名就可以看出它用于判断两个元素是否重叠，因为不用进行事件的监听，性能方面相比`getBoundingClientRect`会好很多。

使用步骤主要分为两步：**创建观察者和传入被观察者**

1. **创建观察者**

```ts
const options = {
    // 表示重叠面积占被观察者的比例，从0-1 取值，
    // 1 表示完全被包含
    threshold: 1.0,
    root: document.querySelector（'#scrollArea'）// 必须是日标元素的父级元素
}

const callback = (entries, observer) => {
    // 以下是常用属性
    entries.forEach(entry => {
        entry.time;               // 触发的时间
        entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
        entry.boundingClientRect; // 被观察者的位置矩形
        entry.intersectionRect;   // 重叠区域的位置矩形
        entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
        entry.target;             // 被观察者
    })
}

const observer = new IntersectionObserver(callback, options)
```

通过`new IntersectionObserver`创建了观察者`observer`，传入的参数`callback`在重叠比例超过`threshold`时会被执行。

2. **传入被观察者**

通过 observer.observe(target) 这一行代码即可简单的注册被观察者

```js
const target = document.querySelector('.target')
observer.observe(target)
```

假如我们需要实现图片加载前loading的效果的话，我们就可以给img的src设为loading图片的路径，data-src设为图片真实路径，在上述callback函数，将data-src的值赋给src即可。
