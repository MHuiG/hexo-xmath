# Hexo Xmath

[![](https://img.shields.io/npm/v/hexo-xmath.svg?style=flat-square)](https://www.npmjs.com/package/hexo-xmath)

Xmath: Server side [MathJax](http://www.mathjax.org/) renderer plugin for [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked).

这里是 Hexo 的服务器端 MathJax 渲染器插件。 致力于解决 [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked) 与 MathJax 渲染冲突的问题以及 Nunjucks 和 Mathjax 的语法冲突。 如果你使用了其他的 markdown 渲染器，点击右上角X,[出门左转](https://volantis.js.org/blogs/2025-10-25-latex/)。

警告：此插件是一个服务器端数学渲染插件，它不依赖于任何前端脚本。如果您在安装此插件之前已经启用了其他数学渲染方法，请执行以下作以避免冲突：

- 删除所有其他 Hexo 数学插件
- 在 Hexo 主题设置中禁用前端数学渲染器
- 删除与数学渲染相关的前端脚本
- 删除除了 hexo-renderer-marked 之外的其他 markdown 渲染器

```shell
npm install hexo-renderer-marked --save
npm uninstall hexo-xm
npm uninstall hexo-renderer-kramed
npm uninstall hexo-renderer-markdown-it
npm uninstall hexo-renderer-markdown-it-plus
npm uninstall hexo-renderer-multi-markdown-it
npm uninstall hexo-renderer-pandoc
npm uninstall hexo-renderer-unified
```



## 安装

```shell
npm install hexo-xmath --save
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

在 Front-matter 中设置 `tex_config` 可以覆盖站点配置 `_config.yml` 中的 `tex_config` 设置选项。例如：

```md
---
title: Hello World
categories: Hello
date: 1900-01-02 10:00:00
xmath: true
tex_config: 
  tags: none
---
```

## 配套 Markdown 渲染器

仅支持  [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked) ，因为笔者不用其他的 Markdown 渲染器。

```shell
npm install hexo-renderer-marked --save
```

同时卸载其他 Markdown 渲染器。


## 兼容方案及原理

```yaml
xmath:
  fuck_md: true # 对 markdown 进行转义兼容
```

创建自动程序仅对 `$` 和 `$$` 之间的数学公式中的 `_` 和 `\` 等进行转义。已经完成手动转义的，不再进行转义。例如：

原始

```md
$$
\begin{alignat*}{1}
\eta\left(\text{s}\right)&=\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}-1\right)^\text{s}}-\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}\right)^\text{s}}+\underbrace{\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}\right)^\text{s}}-\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}\right)^\text{s}}}_{=\space0}\\
\\
&=\underbrace{\underbrace{\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}-1\right)^\text{s}}}_\text{odd part}+\underbrace{\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}\right)^\text{s}}}_\text{even part}}_{\text{odd part}\space+\space\text{even part}}-\left\{\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}\right)^\text{s}}+\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}\right)^\text{s}}\right\}\\
\\
&=\sum_{\text{n}\space\ge\space1}\frac{1}{\text{n}^\text{s}}-2\sum_{\text{n}\space\ge\space1}\frac{1}{\left(2\text{n}\right)^\text{s}}
\end{alignat*}
$$
```

手动转义：

```md
$$
\\begin{alignat\*}{1}
\\eta\\left(\\text{s}\\right)&=\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}-1\\right)^\\text{s}}-\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}+\\underbrace{\\sum_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}-\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}}\_{=\\space0}\\\\
\\\\
&=\\underbrace{\\underbrace{\\sum_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}-1\\right)^\\text{s}}}\_\\text{odd part}+\\underbrace{\\sum_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}}\_\\text{even part}}\_{\\text{odd part}\\space+\\space\\text{even part}}-\\left\\{\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}+\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}\\right\\}\\\\
\\\\
&=\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\text{n}^\\text{s}}-2\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}
\\end{alignat\*}
$$
```

经过自动程序处理后，上面两种情形均转换为已转义：

```md
$$
\\begin{alignat\*}{1}
\\eta\\left(\\text{s}\\right)&=\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}-1\\right)^\\text{s}}-\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}+\\underbrace{\\sum_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}-\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}}\_{=\\space0}\\\\
\\\\
&=\\underbrace{\\underbrace{\\sum_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}-1\\right)^\\text{s}}}\_\\text{odd part}+\\underbrace{\\sum_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}}\_\\text{even part}}\_{\\text{odd part}\\space+\\space\\text{even part}}-\\left\\{\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}+\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}\\right\\}\\\\
\\\\
&=\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\text{n}^\\text{s}}-2\\sum\_{\\text{n}\\space\\ge\\space1}\\frac{1}{\\left(2\\text{n}\\right)^\\text{s}}
\\end{alignat\*}
$$
```

然后交给 markdown 渲染器处理。

同理，我们可以通过添加空格解决 Nunjucks 和 Mathjax 的语法冲突。

## 题外话

存在另一种冲突解决方案：逆向渲染流程，即先让 MathJax 解析公式，再用 Markdown 引擎处理文本， 最后使用 Nunjucks 渲染。由于理论上 MathJax 生成的 HTML 不含 Markdown 语法，可从根本上避免冲突。

但是笔者发现之前手动转义的公式不能正常解析了。难道要把之前所有手动转义的都改回来？真让人头大，于是这种方案就没有被实现。感兴趣的小伙伴可以尝试一下，但是也不排除会引入新的问题。

## 许可证

根据 [GPL-3.0](https://github.com/MHuiG/hexo-xmath/blob/main/LICENSE) 发布。







