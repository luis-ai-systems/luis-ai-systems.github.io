---
layout: post
title: "终极解决暗黑模式闪烁 (FOUC)：硬核内联 CSS 方案"
date: 2026-03-30 20:30:00 +0800
categories: [前端, 技术]
tags: [CSS, FOUC, 主题切换, 性能优化, 博客重构]
mermaid: true
---

在给博客加上了极其酷炫的赛博朋克深色/浅色主题切换后，我遇到了一个前端老生常谈、但极其恶心的问题：**FOUC (Flash of Unstyled Content)**。

具体表现为：当我把主题切到“浅色模式”，然后点击导航栏去别的页面时，页面**总是会极快地闪过一下深色背景**，然后再变回浅色。这极其破坏那种极致冷酷的极客体验。

本文记录了我是如何一步步排查，并最终用“内联关键 CSS”将其彻底歼灭的过程。

## 为什么会闪烁？

刚开始，我的主题检测脚本写在 `main.js` 里：

1. 浏览器加载 HTML
2. 浏览器加载并解析 `premium.css`（里面包含了 `body` 默认的 `#050508` 深色背景）
3. 浏览器渲染：此时**页面是深色的**
4. `main.js` 被执行，读取 `localStorage`
5. 发现用户选了浅色，于是给 `body` 加上 `.light-theme` class
6. CSS 重新计算：**页面跳变回浅色**

这中间哪怕只有 50 毫秒的时间差，人眼也能明显捕捉到刺眼的“深色闪烁”。

### 第一次尝试：前置检测脚本（失败）

网上的标准解法是将 `<script>` 移到 `<head>` 中阻塞执行，在 `<body>` 渲染前给 `<html>` 加上主题 class。

```html
<head>
    <script>
      if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('light-theme');
      }
    </script>
</head>
```

结果：**依然闪烁。** 

这是因为外部 CSS 文件的加载是异步阻塞的。虽然 `<html>` 在第一时间拿到了 `.light-theme` 标记，但由于 `html.light-theme { background: #fff; }` 的规则写在 `premium.css` 里，浏览器必须等这个外部文件下载完才能应用。而在下载期间，默认的深色背景再次霸占了屏幕。

## 终极方案：内联关键 CSS (Critical CSS)

要做到绝对的**零延迟**，唯一的办法是：让浏览器在解析到 `<head>` 的瞬间，**不需要发任何网络请求**，就拥有渲染浅色背景的全部 CSS 素材。

我们在 `<head>` 中用 `<style>` 标签硬编码了导致页面大面积闪烁的**关键像素规则**：

```html
<head>
    <!-- 1. 阻塞式读取判定 -->
    <script>
      if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('light-theme');
      }
    </script>

    <!-- 2. 核心覆写规则直接内联 -->
    <style>
      /* 只要 html 有了 light-theme，立刻覆盖根变量 */
      html.light-theme {
        background: #f8f9fc !important;
        --color-bg-deep: #f8f9fc;
        --color-text-primary: #1a1a2e;
        /* ... 其他核心变量 */
      }
      
      /* 强行杀死深色的网格动画层 */
      html.light-theme body::before {
        animation: none !important;
        background: none !important;
      }
    </style>
</head>
```

## 渲染流水线对比

下面这张 Mermaid 架构图清晰地展示了优化前后的浏览器渲染流水线差异。你可以看到优化后，浅色背景在 First Paint (首次绘制) 就已经就位了。

```mermaid
sequenceDiagram
    participant Browser as 浏览器
    participant Head as <head> 解析
    participant CSS as 外部 CSS 网络请求
    participant Body as <body> 渲染
    participant JS as 外部 JS 执行

    box rgb(40, 40, 50) 优化前（发生闪烁）
        Browser->>Head: 解析开始
        Head->>CSS: 发起 premium.css 请求
        Browser->>Body: 开始渲染 (First Paint)
        Note over Browser,Body: ⚠️ 使用默认深色变量渲染<br>此时用户看到深黑色！
        CSS-->>Browser: 返回深色+浅色样式表
        Browser->>JS: 发起 main.js 请求
        JS-->>Browser: 执行脚本读 localStorage
        JS->>Body: 添加 .light-theme class
        Note over Browser,Body: 🔄 重新计算样式并重绘<br>画面突变为浅色 (闪烁发生) 
    end

    box rgb(20, 50, 40) 优化后（完美顺滑）
        Browser->>Head: 解析开始
        Note over Head: 执行内联 <script>
        Head->>Head: 发现浅色，给 <html> 加 class
        Note over Head: 解析内联 <style> (Critical CSS)
        Head->>CSS: 发起 premium.css 请求
        Browser->>Body: 开始渲染 (First Paint)
        Note over Browser,Body: ✅ 命中内联规则 html.light-theme<br>首次绘制即为完美的浅色背景！
        CSS-->>Browser: 返回剩余样式
        Browser->>JS: 发起 main.js 继续绑定事件
    end
```

## 总结

对付主题闪烁（FOUC），不仅要**阻止渲染（Blocking Script）**，还要解决**CSS 同步阻塞（Critical CSS）**。

把第一帧必须显示的背景颜色、主题变量、甚至伪动画的开关，全部剥离出来，硬写在 `<head>` 的 HTML 源码里。只有丢掉对外部网络资源的依赖，才能换来真正的丝滑切换体验。
