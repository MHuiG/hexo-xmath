# Hexo Xmath

Xmath: Server side MathJax renderer plugin for hexo-renderer-marked.

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
