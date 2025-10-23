module.exports = function(hexo) {
  const config = hexo.config.xmath = Object.assign({
    fuck_md : true,
    cjk_width : 0.9,
    normal_width : 0.6,
    append_css : true,
    every_page : false,
    packages: ["action", "ams", "amscd", "autoload", "bbm", "bbox", "begingroup", "boldsymbol", "braket", "bussproofs", "cancel", "cases", "centernot", "color","colortbl",  "colorv2", "dsfont", "empheq","enclose",  "extpfeil", "gensymb", "html","mathtools","mhchem","newcommand", "noerrors", "noundefined", "setoptions", "tagformat", "texhtml", "textcomp","textmacros","unicode","units","upgreek","verb",],
    tex_config: {
      tags: "all",
      inlineMath: {'[+]': [['$', '$'], ['\$', '\$'], ['\\(', '\\)']]},
      displayMath: {'[+]': [['$$', '$$'], ['\\[', '\\]']]},
    }
  }, hexo.config.xmath);

  return config;
};
