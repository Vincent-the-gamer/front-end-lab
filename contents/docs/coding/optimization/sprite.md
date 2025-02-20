# Sprite 精灵图（又名雪碧图）

做 2D 游戏的时候，有一个术语叫做 sprite，其实就是融合了各种资源的图片，图片里面可能会有一个角色的一套动作、或是组成背景的不同内容的块 tile 等等。

游戏角色的行为（攻击、跳跃、蹲下等），表现出来其实就是不同图片的切换，状态很多，对应的图片很多，这样的话我们就要保存非常多的图片，这不太好维护（但也不是不可以）。

所以通常会将这个角色的所有动作放到一个图片上，当角色行为发生变化时，就修改位置和宽高信息截取到对应的状态图片。

![sprite-1](/imgs/coding/optimization/sprite/sprite-1.png)

**前端通过把一些小图片整合到大图片中，通过 background-position 等属性使用你需要的区域，可以实现只加载一张图，但是可以使用多个图标。**

![sprite-2](/imgs/coding/optimization/sprite/sprite-2.png)

以下是一个小实践：

> [!NOTE]
> 真正使用时不会用这么糊的图片，这里只是演示，而且图标设计时视觉观感上大小要一致

```html
<div style="
background-image: url('/imgs/coding/optimization/sprite/sprite-2.png');
background-size: initial;
width: 80px;
height: 80px;
background-position: 5px -18px;
" />
```

效果：

<div style="
background-image: url('/imgs/coding/optimization/sprite/sprite-2.png');
background-size: initial;
width: 80px;
height: 80px;
background-position: 5px -18px;
" />

```html
<div style="
background-image: url('/imgs/coding/optimization/sprite/sprite-2.png');
background-size: initial;
width: 80px;
height: 80px;
scale: 0.8;
background-position: -500px -18px;
" />
```

效果：

<div style="
background-image: url('/imgs/coding/optimization/sprite/sprite-2.png');
background-size: initial;
width: 80px;
height: 80px;
scale: 0.8;
background-position: -500px -18px;
" />
