---
layout: categories
title: Categories
description: 哈哈，你找到了我的文章基因库
keywords: 分类
comments: false
menu: 分类
permalink: /categories/
---

<style>
.posts-content h3 {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 2em;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
}

.posts-content h3::before {
    content: '';
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #00e5ff, #7c4dff);
    border-radius: 4px;
    flex-shrink: 0;
}

.posts-content .posts-list {
    padding-left: 0;
    list-style: none;
    margin-bottom: 1.5em;
}

.posts-content .posts-list-item {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 10px 0 10px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    border-left: 2px solid transparent;
    transition: all 0.2s ease;
    margin: 0;
}

.posts-content .posts-list-item:hover {
    border-left-color: rgba(0, 229, 255, 0.5);
    padding-left: 20px;
    background: rgba(0, 229, 255, 0.02);
}

.posts-content .posts-list-meta {
    flex-shrink: 0;
    font-size: 0.8rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
    color: rgba(255,255,255,0.25) !important;
    background: transparent !important;
    min-width: 80px;
}

.posts-content .posts-list-name {
    font-weight: 500;
    font-size: 0.95rem;
}

body.light-theme .posts-content h3 {
    color: #1a1a2e;
    border-bottom-color: rgba(0,0,0,0.06);
}

body.light-theme .posts-content .posts-list-item {
    border-bottom-color: rgba(0,0,0,0.04);
}

body.light-theme .posts-content .posts-list-item:hover {
    border-left-color: rgba(0, 102, 204, 0.4);
    background: rgba(0, 102, 204, 0.02);
}

body.light-theme .posts-content .posts-list-meta {
    color: #aaa !important;
}
</style>

<section class="container posts-content">
{% assign sorted_categories = site.categories | sort %}
{% for category in sorted_categories %}
<h3 id="{{ category[0] }}">{{ category | first }} <span style="font-size:0.75rem;font-weight:500;color:rgba(0,229,255,0.6);margin-left:4px;">({{ category[1].size }})</span></h3>
<ol class="posts-list">
{% for post in category.last %}
<li class="posts-list-item">
<span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span>
<a class="posts-list-name" href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ol>
{% endfor %}
</section>
<!-- /section.content -->
