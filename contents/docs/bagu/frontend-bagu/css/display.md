# display的属性值及其作用

| 属性值       | 作用                                                       |
| ------------ | ---------------------------------------------------------- |
| none         | 元素不显示，并且会从文档流中移除。                         |
| block        | 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。       |
| inline       | 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。 |
| inline-block | 默认宽度为内容宽度，可以设置宽高，同行显示。               |
| list-item    | 像块类型元素一样显示，并添加样式列表标记。                 |
| table        | 此元素会作为块级表格来显示。                               |
| inherit      | 规定应该从父元素继承display属性的值。                      |

## display的block、inline和inline-block的区别

- block：会独占一行，多个元素会另起一行，可以设置width、height、margin和padding属性；

- inline：元素不会独占一行，设置width、height属性无效。但可以设置水平方向的margin和padding属性，不能设置垂直方向的padding和margin；

- inline-block：将对象设置为inline对象，但对象的内容作为block对象呈现，之后的内联对象会被排列在同一行内。

对于行内元素和块级元素，其特点如下：

- **行内元素**
    - 设置宽高无效；
    - 可以设置水平方向的margin和padding属性，不能设置垂直方向的padding和margin；
    - 不会自动换行；
- **块级元素**
    - 可以设置宽高；
    - 设置margin和padding都有效；
    - 可以自动换行；
    - 多个块状，默认排列从上到下。