

function filter_md(config,data) {
  if (!config.fuck_md) return;
  if ((!data.mathjax && !data.math && !data.xmath) && !config.every_page) return;
  const md = require('./fuck-md')(config);
  data.content = md(data.content);
  return data;
};

async function filter_math(config,data) {
  if ((!data.mathjax && !data.math && !data.xmath) && !config.every_page) return;
  const mathjax = require('./mathjax')(config);
  data.content = await mathjax(data.content,data.tex_config || {});
  return data;
};


function render(config,html, page ) {
  if (config.append_css) {
    const css = require('./css')();
  
    if (config.every_page || (page.mathjax||page.math||page.xmath) || (page.__index && (page.posts.toArray().find(post => post.mathjax)||page.posts.toArray().find(post => post.math)||page.posts.toArray().find(post => post.xmath)))) {
      html = html.replace('</head>', `<style>${css}</style></head>`);
    }
  };
  return html;
}

module.exports = {
  filter_md,
  filter_math,
  render
};






