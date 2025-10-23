/* global hexo */

'use strict';

const config = require('./lib/config')(hexo);
const mathjax = require('./lib/mathjax')(config);
const md = require('./lib/fuck-md')(config);


hexo.extend.filter.register('before_post_render', data => {
  if (!config.fuck_md) return;
  if ((!data.mathjax && !data.math && !data.xmath) && !config.every_page) return;
  data.content = md(data.content);
  return data;
}, 5);

// Mimi https://github.com/next-theme/hexo-filter-mathjax
hexo.extend.filter.register('after_post_render', async(data) => {
  if ((!data.mathjax && !data.math && !data.xmath) && !config.every_page) return;
  data.content = await mathjax(data.content,data.tex_config || {});
  return data;
}, 5);


if (config.append_css) {
  let css = require('./lib/css')();
  if(config.fuck_math){
    const fuckcss = require('./lib/fuck-math')();
    css += fuckcss;
  };
  
  hexo.extend.filter.register('after_render:html', (html, { page }) => {
    if (config.every_page || (page.mathjax||page.math||page.xmath) || (page.__index && (page.posts.toArray().find(post => post.mathjax)||page.posts.toArray().find(post => post.math)||page.posts.toArray().find(post => post.xmath)))) {
      html = html.replace('</head>', `<style>${css}</style></head>`);
    }
    return html;
  });
}
