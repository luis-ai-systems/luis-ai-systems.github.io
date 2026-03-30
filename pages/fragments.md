---
layout: page
title: Fragments
description: 零散的知识碎片汇集于此
keywords: fragments, 片段
comments: false
mermaid: false
menu: 片段
permalink: /fragments/
---

<style>
.fragment-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
}

.fragment-tags a {
    display: inline-block;
    padding: 5px 14px;
    font-size: 0.82rem;
    font-weight: 500;
    color: rgba(255,255,255,0.5) !important;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 999px;
    transition: all 0.25s ease;
    text-decoration: none !important;
}

.fragment-tags a:hover,
.fragment-tags a.active {
    color: #00e5ff !important;
    background: rgba(0,229,255,0.08);
    border-color: rgba(0,229,255,0.25);
}

.listing {
    list-style: none;
    padding: 0;
    margin: 0;
}

.listing-item {
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    transition: all 0.2s ease;
}

.listing-item:hover {
    padding-left: 8px;
}

.listing-item > a:first-child {
    font-weight: 600;
    font-size: 0.95rem;
}

.listing-item .tag-pill {
    display: inline-block;
    font-size: 0.7rem;
    padding: 2px 10px;
    background: rgba(124, 77, 255, 0.1);
    border: 1px solid rgba(124, 77, 255, 0.2);
    border-radius: 999px;
    color: rgba(124, 77, 255, 0.8) !important;
    font-weight: 500;
    text-decoration: none !important;
    transition: all 0.2s ease;
}

.listing-item .tag-pill:hover {
    background: rgba(124, 77, 255, 0.18);
    border-color: rgba(124, 77, 255, 0.4);
}

body.light-theme .fragment-tags a {
    color: #888 !important;
    background: rgba(0,0,0,0.03);
    border-color: rgba(0,0,0,0.06);
}

body.light-theme .fragment-tags a:hover {
    color: #0066cc !important;
    background: rgba(0,102,204,0.06);
    border-color: rgba(0,102,204,0.2);
}

body.light-theme .listing-item {
    border-bottom-color: rgba(0,0,0,0.05);
}

body.light-theme .listing-item .tag-pill {
    background: rgba(98, 0, 238, 0.06);
    border-color: rgba(98, 0, 238, 0.15);
    color: rgba(98, 0, 238, 0.7) !important;
}
</style>

> ✦ 零散的知识，简短的观点，作为片段汇集于此。

{% assign tagliststr = '' %}
{% for item in site.fragments %}
{% if item.title != "Fragment Template" %}
  {% for tag in item.tags %}
    {% if tagliststr contains tag %}
    {% else %}
      {% if tagliststr != '' %}{% assign tagliststr = tagliststr | append: ',' %}{% endif %}
      {% assign tagliststr = tagliststr | append: tag %}
    {% endif %}
  {% endfor %}
{% endif %}
{% endfor %}

{% assign taglist = tagliststr | split: ',' | sort_natural %}

<div class="fragment-tags">
<a href="{{ site.url }}/fragments/">全部</a>{% for tag in taglist %}<a href="{{ site.url }}/fragments/?tag={{ tag }}">{{ tag }}</a>{% endfor %}
</div>

<ul class="listing">
{% for item in site.fragments %}
{% if item.title != "Fragment Template" %}
<li class="listing-item" tags="{% for tag in item.tags %}{{ tag }} {% endfor %}">
  <a href="{{ site.url }}{{ item.url }}">{{ item.title }}</a>
  {% for tag in item.tags %}
  <a class="tag-pill" href="{{ site.url }}/fragments/?tag={{ tag }}" title="{{ tag }}">{{ tag }}</a>
  {% endfor %}
</li>
{% endif %}
{% endfor %}
</ul>

<script>
jQuery(function() {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2]; return null;
    }

    var tag = getUrlParam('tag');
    if (tag == undefined || tag === '') {
        return;
    }

    // Highlight active tag
    $(".fragment-tags a").each(function() {
        if ($(this).attr('href').indexOf('tag=' + tag) > -1) {
            $(this).addClass('active');
        }
    });

    $(".listing-item").each(function() {
        if ($(this).attr('tags').indexOf(tag) < 0) {
            $(this).css('display', 'none');
        }
    });
});
</script>
