---
layout: post
title: 构建纯静态前沿交互：基于 Canvas 的绝对避让排版引擎
categories: [折腾, 前端实验]
description: 记录如何零后端、全静态实现陈楼 Pretext 风格的万字符弹簧物理避让矩阵，并解决全屏 Canvas 与博客光暗主题以及 Mac 触控板深坑。
keywords: Canvas, 物理引擎, 绝对领域, Jekyll compress 踩坑
---

为了将博客的极简赛博风贯彻到底，我在这两天实现了一个非常有实验性的页面——**“次元（Absolute Terror Field）”**。

灵感来源于 [Chenglou/Pretext](https://github.com/chenglou/pretext) 震撼的排版避让效果，但与之不同的是，我们没有引入庞大的 React 生态或外网后端。我仅仅通过 **原生 HTML5 `<canvas>`** 和百行的纯 JavaScript 物理弹簧算法，就在静态博客中复现了满屏字母的引力场效果。

---

## Ⅰ. 核心技术痛点解析

构建这套纯前端交互矩阵涉及到了多个底层问题：
1. **真实物理模拟与碰撞检测**：字符不仅要躲开我们的光标/节点，离开后还要像挂着弹簧一样优雅地“崩”回原位。
2. **主题同步 (Theme Awareness)**：传统的 `<canvas>` 绘图是静态像素，无法跟随博客左上角的“月亮/太阳”白天黑夜模式自动变色。
3. **MacBook 触控板事件劫持**：苹果 Safari 或 Chrome 中的触控板惯性拖拽容易被识别为滚动而打断物理坐标采集。
4. **代码压缩引擎的“静默暗杀”**：由于博客应用了 HTML 代码压缩机制，一段无害的 "//" 注释引发了长达半天的黑屏惨案（后文详述）。

---

## Ⅱ. 物理引擎运转架构

为了彻底搞清这个循环结构，我梳理了整个引擎渲染和处理的管线（Pipeline）。

```mermaid
graph TD
    A[Window resize/boot] --> B(初始化 Canvas 尺寸 & Nodes/Particles)
    B --> C{requestAnimationFrame}
    
    %% Input Layer
    subgraph 交互监听层
        I1(mousedown/touchstart) --> |捕获高亮节点| I2(修改节点坐标 & isDragging 属性)
        I3(mousemove/touchmove) --> |刷新绝对坐标| I2
    end
    
    %% Physics Calc
    subgraph 物理运算帧
        P1(遍历 Particles) --> |计算与基底距离| P2(施加恢复拉力 vx += dx * 0.08)
        P2 --> P3(计算与 Nodes 距离矩阵)
        P3 --> |若 Dist < Radius| P4(施加弹斥力 Mathf.atan2 计算夹角推开距)
        P4 --> P5(速度附加快衰减 vx *= 0.7 降噪避免乱飞)
        P5 --> P6(更新字符最新坐标 x, y)
    end
    
    %% Render Pipeline
    subgraph 像素绘制管线
        R1[读取根节点 light-theme 主题状态] --> R2[清理上一帧 clearRect]
        R2 --> R3[重绘动态底色 fillRect]
        R3 --> R4[绘制二次贝塞尔曲线连结 跳线]
        R4 --> R5[根据物理运算层坐标重绘所有字体]
        R5 --> R6[绘制 Nodes 与发光滤镜 shadowBlur]
    end

    C --> |读取| I2
    C --> P1
    P6 --> R1
    R6 --> C
```

---

## Ⅲ. 血泪踩坑指南

在实现这套机制时，除了算法上的调整，这三个堪称隐形杀手的坑耗费了最多时间：

### 1. Jekyll `compress` HTML 压缩器与 JavaScript 的量子纠缠
在这个系统中，最离谱的 Bug 就是——**页面在本地开发正常，一旦推送到 GitHub Action 部署后，整个 Canvas 画面只剩下一片纯黑幕布，代码抛出完全隐藏的闪退。**

最终发现问题的核心竟是：
博客为了性能使用了 `{% raw %}{% layout compress %}{% endraw %}` 模块来极度压缩 HTML 代码。它会在构建时**粗暴地删掉 HTML 里的所有换行符（Newline）**。
这导致我在 `<script>` 里的 `// 计算反向推力` 等单行注释，因为失去了“换行”保护，硬生生地把 `//` 后面长达几百行的核心 Javascript 全部当成了注释给吃掉了，直接引发**严重词法 SyntaxError**。

**修复方案：** 必须在静态博客的直接内联脚本中强制放弃 `//` 单行注释，严格采用 `/* Block 注释 */` 以防被压缩器吞断语境。

### 2. Mac 触控板拖拽与视口滚动
原本仅绑定了 `mousemove`，发现 Mac 触控板点按拖拽时常常失灵。
这是因为触控板微小的移动经常被浏览器判定位系统级别 `Scroll` 而阻止事件。解决方案必须两路齐发：
1. **CSS 钳制**：为 Canvas 对象加上 `touch-action: none !important;` 彻底禁用所有的手势。
2. **主动拦截**：在 JS 监听事件中，加入 `if (e.cancelable) e.preventDefault();` 拒绝原始滚轮和上滑操作，抢夺坐标归属权。
3. **扩大点击域**：将节点抓取判断放宽到了勾股定理距离求交的 `dx*dx + dy*dy < 2500`（50px 半径范围），让触控板不再需要肉眼追踪 1 个特定细微像素。

### 3. 主题（Theme Awareness）的解耦跟随
Canvas 原生是不讲 CSS `color: red` 道理的，它只读十六进制。为了能随着用户手头的**“白昼/暗夜”模式**实时切换效果。我们巧妙地使用 JS 将检测逻辑融入了 60fps 的 `animate()` 循环中：
```javascript
function isLightTheme() {
    return document.documentElement.classList.contains('light-theme');
}
```
每一帧都会嗅探博客是否注入了发白的主题雷达，随后智能重配文字为 “墨水蓝/赛博紫外”。至此，一套**不需要 React，不需要后端计算，甚至不需要外部 NPM 包**的高能静态实验室绝对领域落地了！

快去上方导航栏体验 **[次元]** 的自动排版威力吧！
