---
layout: page
title: 归档
description: 时间线上的足迹
keywords: 归档
comments: false
menu: 归档
permalink: /archives/
---

<style>
.archive-content h3 {
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

.archive-content h3::before {
    content: '';
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #00e5ff, #7c4dff);
    border-radius: 4px;
    flex-shrink: 0;
}

.archive-content .posts-list {
    padding-left: 0;
    list-style: none;
    margin-bottom: 1.5em;
    position: relative;
}

.archive-content .posts-list::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, rgba(0,229,255,0.2) 0%, rgba(124,77,255,0.1) 100%);
}

.archive-content .posts-list-item {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 10px 0 10px 20px;
    border-bottom: none;
    position: relative;
    transition: all 0.2s ease;
    margin: 0;
}

.archive-content .posts-list-item::before {
    content: '';
    position: absolute;
    left: -3px;
    top: 50%;
    transform: translateY(-50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(0, 229, 255, 0.4);
    border: 2px solid rgba(5, 5, 12, 1);
    transition: all 0.2s ease;
}

.archive-content .posts-list-item:hover {
    padding-left: 26px;
}

.archive-content .posts-list-item:hover::before {
    background: #00e5ff;
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
}

.archive-content .posts-list-meta {
    flex-shrink: 0;
    font-size: 0.8rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
    color: rgba(255,255,255,0.25) !important;
    background: transparent !important;
    min-width: 50px;
}

.archive-content .posts-list-name {
    font-weight: 500;
    font-size: 0.95rem;
}

body.light-theme .archive-content h3 {
    color: #1a1a2e;
    border-bottom-color: rgba(0,0,0,0.06);
}

body.light-theme .archive-content .posts-list::before {
    background: linear-gradient(180deg, rgba(0,102,204,0.2) 0%, rgba(98,0,238,0.1) 100%);
}

body.light-theme .archive-content .posts-list-item::before {
    background: rgba(0, 102, 204, 0.3);
    border-color: #f8f9fc;
}

body.light-theme .archive-content .posts-list-item:hover::before {
    background: #0066cc;
    box-shadow: 0 0 10px rgba(0, 102, 204, 0.3);
}

body.light-theme .archive-content .posts-list-meta {
    color: #aaa !important;
}
</style>

<section class="container posts-content archive-content">
{% assign count = 1 %}
{% for post in site.posts reversed %}
    {% assign year = post.date | date: '%Y' %}
    {% assign nyear = post.next.date | date: '%Y' %}
    {% if year != nyear %}
        {% assign count = count | append: ', ' %}
        {% assign counts = counts | append: count %}
        {% assign count = 1 %}
    {% else %}
        {% assign count = count | plus: 1 %}
    {% endif %}
{% endfor %}

{% assign counts = counts | split: ', ' | reverse %}
{% assign i = 0 %}

{% assign thisyear = 1 %}

{% for post in site.posts %}
    {% assign year = post.date | date: '%Y' %}
    {% assign nyear = post.next.date | date: '%Y' %}
    {% if year != nyear %}
        {% if thisyear != 1 %}
            </ol>
        {% endif %}
<h3>{{ post.date | date: '%Y' }} <span style="font-size:0.75rem;font-weight:500;color:rgba(0,229,255,0.6);margin-left:4px;">({{ counts[i] }} 篇)</span></h3>
        {% if thisyear != 0 %}
            {% assign thisyear = 0 %}
        {% endif %}
        <ol class="posts-list">
        {% assign i = i | plus: 1 %}
    {% endif %}
<li class="posts-list-item">
<span class="posts-list-meta">{{ post.date | date:"%m-%d" }}</span>
<a class="posts-list-name" href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ol>
</section>
