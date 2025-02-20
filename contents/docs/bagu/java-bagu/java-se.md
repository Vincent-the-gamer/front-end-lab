# Java SE

## Java语言有哪些特点

- 面向对象：主要是封装，继承，多态。
- 平台无关性，“一次编写，到处运行”，因此采用 Java 语言编写的程序具有很好的可移植性。
- 支持多线程。C++ 语言没有内置的多线程机制，因此必须调用操作系统的 API 来完成多线程程序设计，而 Java 却提供了封装好多线程支持。
- 支持 JIT 编译，也就是即时编译器，它可以在程序运行时将字节码转换为热点机器码来提高程序的运行速度。

## JVM, JDK, JRE有什么区别？

JVM：也就是 Java 虚拟机，是 Java 实现跨平台的关键所在，不同的操作系统有不同的 JVM 实现。JVM 负责将 Java 字节码转换为特定平台的机器码，并执行。

JRE：也就是 Java 运行时环境，包含了运行 Java 程序所必需的库，以及 JVM。

JDK：一套完整的 Java SDK，包括 JRE，编译器 javac、Java 文档生成工具 javadoc、Java 字节码工具 javap 等。为开发者提供了开发、编译、调试 Java 程序的一整套环境。

**JDK 包含 JRE，JRE 包含 JVM。**

## 什么是跨平台？原理是什么？

以Java语言为例，跨平台是指Java程序一次编译后，可以在多个操作系统上运行。

原理是增加了一个中间件 JVM，JVM 负责将 Java 字节码转换为特定平台的机器码，并执行。

## 为什么有人说 Java 是“编译与解释并存”的语言？

编译型语言是指编译器针对特定的操作系统，将源代码一次性翻译成可被该平台执行的机器码。

解释型语言是指解释器对源代码进行逐行解释，解释成特定平台的机器码并执行。

之所以有人说 Java 是“编译与解释并存”的语言，是因为**Java 程序需要先将 Java 源代码文件编译字节码文件，再解释执行。**

![jieshi](/imgs/bagu/java-se/jieshi.png)

## Java有哪些数据类型

### 1. 基本数据类型

基本数据类型有：

1. 数值型

- 整数类：byte 字节、short 短整型、int 整型、long 长整型）
- 浮点类型（小数）：float 单精度浮点、double 双精度浮点

2. 字符型（char）

3. 布尔型（boolean）

它们的默认值和占用大小如下所示：

| 数据类型 | 默认值   | 大小            |
| -------- | -------- | --------------- |
| boolean  | false    | 1 字节或 4 字节 |
| char     | '\u0000' | 2 字节          |
| byte     | 0        | 1 字节          |
| short    | 0        | 2 字节          |
| int      | 0        | 4 字节          |
| long     | 0L       | 8 字节          |
| float    | 0.0f     | 4 字节          |
| double   | 0.0      | 8 字节          |

#### boolean 类型实际占用几个字节？

> [!NOTE]
> 一般情况下，boolean占1个字节

这要依据具体的 JVM 实现细节。Java 虚拟机规范中，并没有明确规定 boolean 类型的大小，只规定了 boolean 类型的取值 true 或 false。

不同的操作系统，不同的JDK可能会有不同的JVM实现，所以这里最好用JOL（Java Object Layout，Java对象布局）分析工具查看内存布局。

Maven引入：

```xml
 <dependency>
     <groupId>org.openjdk.jol</groupId>
     <artifactId>jol-core</artifactId>
     <version>0.10</version>
 </dependency>
```

使用方法：
```java
class Test {
    private int a;
    private boolean b;
}

public class JOLTest {
    public static void main(String[] args) {
        Object obj = new Test();
        // 查看对象内部信息
        System.out.println(ClassLayout.parseInstance(obj).toPrintable());
    }
}
```

通过这个方法来查看boolean所占字节最靠谱。


### 2. 引用数据类型

1. 类（class）
2. 接口（interface）
3. 数组 (`[]`)

## 自动类型转换，强制类型转换

当把一个范围较小的数值或变量赋给另外一个范围较大的变量时，会进行自动类型转换；反之，需要强制转换。

![zhuanhuan](/imgs/bagu/java-se/zhuanhuan.png)

