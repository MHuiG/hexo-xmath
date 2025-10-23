# Hexo Xmath

[![](https://img.shields.io/npm/v/hexo-xmath.svg?style=flat-square)](https://www.npmjs.com/package/hexo-xmath)

Xmath: Server side [MathJax](http://www.mathjax.org/) renderer plugin for [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked).

这里是 Hexo 的服务器端 MathJax 渲染器插件。 致力于解决 [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked) 与 MathJax 渲染冲突的问题。 如果你使用了其他的 markdown 渲染器，点击右上角X。

警告：此插件是一个服务器端数学渲染插件，它不依赖于任何前端脚本。如果您在安装此插件之前已经启用了其他数学渲染方法，请执行以下作以避免冲突：

- 删除所有其他 Hexo 数学插件
- 在 Hexo 主题设置中禁用前端数学渲染器
- 删除与数学渲染相关的前端脚本
- 删除除了 hexo-renderer-marked 之外的其他 markdown 渲染器


## 安装

```shell
npm install hexo-xmath
```

## 配置选项

您可以在 Hexo `_config.yml` 中配置此插件。默认选项：

```yaml
# https://github.com/MHuiG/hexo-xmath/
xmath:
  fuck_md: true # 对 markdown 进行转义兼容
  append_css: true # add CSS to every page
  every_page: false # if true, every page will be rendered by MathJax regardless the `xmath` setting in Front-matter
  packages: # extra packages to load
    # https://docs.mathjax.org/en/latest/input/tex/extensions/index.html
    # - base
    # - configmacros
    # - require
    # 上面三个包默认已加载
    - action
    - ams
    - amscd
    - autoload
    - bbm
    #- bboldx
    - bbox
    - begingroup
    - boldsymbol
    - braket
    - bussproofs
    - cancel
    - cases
    - centernot
    - color
    - colortbl
    - colorv2
    - dsfont
    - empheq
    - enclose
    - extpfeil
    - gensymb
    - html
    - mathtools
    - mhchem
    - newcommand
    - noerrors
    - noundefined
    #- physics
    - setoptions
    - tagformat
    - texhtml
    - textcomp
    - textmacros
    - unicode
    - units
    - upgreek
    - verb
    #- mediawiki-texvc
  tex_config: 
    # you can put your tex extension options here
    # see http://docs.mathjax.org/en/latest/options/input/tex.html#tex-extension-options for more detail
    tags: all # none or 'ams' or 'all'
    inlineMath: 
      '[+]': [['$', '$'], ['\$', '\$'], ['\\(', '\\)']]
    displayMath: 
      '[+]': [['$$', '$$'], ['\\[', '\\]']]
    macros: {Re: '\mathfrak{R}', Im: '\mathfrak{I}',d: '\mathrm{d}',O: '\mathcal{O}',M: '\mathcal{M}',o: '\mathcal{o}',i: '\mathrm{i}',e: '\mathrm{e}'}
    
    
  ###########################################################################################

```

## 用法


在您要启用 MathJax 的每篇文章（帖子/页面）的 Front-matter 中设置 `xmath: true` 或者 `math: true` 或者 `mathjax: true` 。例如：

```md
---
title: Hello World
categories: Hello
date: 1900-01-02 10:00:00
xmath: true
---
```



