# CSS中可继承与不可继承属性有哪些

> [!WARNING] > **继承**是指子元素即使没有绑定任何属性也获得了父元素的属性，比如字体。

## 不可继承的属性

- **display**：规定元素应该生成的框的类型
- **文本属性**：
  - vertical-align：垂直文本对齐
  - text-decoration：规定添加到文本的装饰
  - text-shadow：文本阴影效果
  - white-space：空白符的处理
  - unicode-bidi：设置文本的方向
- **盒子模型的属性**：width、height、margin、border、padding
- **背景属性**：background、background-color、background-image、background-repeat、background-position、background-attachment
- **定位属性**：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
- **生成内容属性**：content、counter-reset、counter-increment
- **轮廓样式属性**：outline-style、outline-width、outline-color、outline
- **页面样式属性**：size、page-break-before、page-break-after
- **声音样式属性**：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

## 可继承的属性

- **字体系列属性：**
  - font-family：字体系列
  - font-weight：字体的粗细
  - font-size：字体的大小
  - font-style：字体的风格
- **文本系列属性：**
  - text-indent：文本缩进
  - text-align：文本水平对齐
  - line-height：行高
  - word-spacing：单词之间的间距
  - letter-spacing：中文或者字母之间的间距
  - text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
  - color：文本颜色
- **元素可见性：**
  - visibility：控制元素显示隐藏
- **列表布局属性：**
  - list-style：列表风格，包括list-style-type、list-style-image等
- **光标属性：**
  - cursor：光标显示为何种形态
