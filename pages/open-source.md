---
layout: default
title: Open Source Projects
keywords: 开源,open-source,GitHub,开源项目
description: 开源改变世界。
menu: 开源
permalink: /open-source/
---

<style>
.os-page .collection-head {
    padding: 2rem 0 1.5rem !important;
}

.os-page .collection-head .container {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

.os-page .collection-head .container:hover {
    box-shadow: none !important;
    border-color: transparent !important;
}

.os-page .hero-title {
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: 1px;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #00e5ff, #7c4dff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.os-page .hero-subtitle {
    color: rgba(255,255,255,0.5);
    font-size: 1rem;
    font-weight: 400;
}

.os-page .repo-count {
    display: inline-block;
    background: linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,77,255,0.15));
    border: 1px solid rgba(0,229,255,0.2);
    border-radius: 999px;
    padding: 2px 12px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #00e5ff;
    margin-left: 8px;
}

/* Card Grid */
.os-page .project-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
    gap: 20px !important;
    padding: 0 !important;
    list-style: none !important;
    margin-top: 20px !important;
}

.os-page .project-card {
    text-decoration: none !important;
    display: block;
}

.os-page .project-card .card-inner {
    background: rgba(12, 12, 22, 0.75);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.os-page .project-card:hover .card-inner {
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 229, 255, 0.08);
}

.os-page .card-header {
    padding: 24px 24px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.os-page .card-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(0,229,255,0.12), rgba(124,77,255,0.12));
    border: 1px solid rgba(0,229,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.os-page .card-icon .octicon {
    font-size: 16px;
    color: #00e5ff;
}

.os-page .card-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: #e8e8f0;
    margin: 0;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.os-page .card-body {
    padding: 12px 24px 16px;
    flex-grow: 1;
}

.os-page .card-desc {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.os-page .card-footer {
    padding: 14px 24px;
    border-top: 1px solid rgba(255,255,255,0.04);
    display: flex;
    gap: 16px;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.3);
}

.os-page .card-stat {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.os-page .card-stat .octicon {
    font-size: 13px;
}

/* Light theme */
body.light-theme .os-page .hero-title {
    background: linear-gradient(135deg, #0066cc, #6200ee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

body.light-theme .os-page .hero-subtitle {
    color: #888;
}

body.light-theme .os-page .repo-count {
    background: linear-gradient(135deg, rgba(0,102,204,0.1), rgba(98,0,238,0.1));
    border-color: rgba(0,102,204,0.2);
    color: #0066cc;
}

body.light-theme .os-page .project-card .card-inner {
    background: rgba(255,255,255,0.8);
    border-color: rgba(0,0,0,0.06);
}

body.light-theme .os-page .project-card:hover .card-inner {
    border-color: rgba(0,102,204,0.3);
    box-shadow: 0 16px 48px rgba(0,0,0,0.1), 0 0 20px rgba(0,102,204,0.06);
}

body.light-theme .os-page .card-name {
    color: #1a1a2e;
}

body.light-theme .os-page .card-desc {
    color: #666;
}

body.light-theme .os-page .card-footer {
    border-top-color: rgba(0,0,0,0.05);
    color: #999;
}

body.light-theme .os-page .card-icon {
    background: linear-gradient(135deg, rgba(0,102,204,0.08), rgba(98,0,238,0.08));
    border-color: rgba(0,102,204,0.12);
}

body.light-theme .os-page .card-icon .octicon {
    color: #0066cc;
}

@media (max-width: 50em) {
    .os-page .project-grid {
        grid-template-columns: 1fr !important;
    }
    .os-page .hero-title {
        font-size: 1.5rem;
    }
}
</style>

{% if site.github.public_repositories != false %}
{% assign sorted_repos = site.github.public_repositories | sort: 'stargazers_count' | reverse %}

<div class="os-page">
<section class="collection-head small">
    <div class="container">
        <div class="columns">
            <div class="column two-thirds">
                <div class="collection-title">
                    <h1 class="hero-title">Open Source Projects</h1>
                    <p class="hero-subtitle">开源改变世界 <span class="repo-count">{{ sorted_repos.size }} repos</span></p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="container content">
    <div class="project-grid">
        {% for repo in sorted_repos %}
        <a href="{{ repo.html_url }}" target="_blank" class="project-card">
            <div class="card-inner">
                <div class="card-header">
                    <div class="card-icon">
                        <span class="octicon octicon-repo"></span>
                    </div>
                    <h3 class="card-name">{{ repo.name }}</h3>
                </div>
                <div class="card-body">
                    <p class="card-desc">{{ repo.description }}</p>
                </div>
                <div class="card-footer">
                    <span class="card-stat" title="{{ repo.stargazers_count }} stars">
                        <span class="octicon octicon-star"></span> {{ repo.stargazers_count }}
                    </span>
                    <span class="card-stat" title="{{ repo.forks_count }} forks">
                        <span class="octicon octicon-git-branch"></span> {{ repo.forks_count }}
                    </span>
                    <span class="card-stat" title="Last updated: {{ repo.updated_at }}">
                        <span class="octicon octicon-clock"></span>
                        <time datetime="{{ repo.updated_at }}">{{ repo.updated_at | date: '%Y-%m-%d' }}</time>
                    </span>
                </div>
            </div>
        </a>
        {% endfor %}
    </div>
</section>
</div>
{% endif %}
