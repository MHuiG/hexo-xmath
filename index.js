/* global hexo */

'use strict';

const config = require('./lib/config')(hexo);
const {filter_md, filter_math,  render} = require('./lib/process');

hexo.extend.filter.register('before_post_render', data => {filter_md(config,data)}, 5);
hexo.extend.filter.register('after_post_render', async(data) => {await filter_math(config,data)}, 5);
hexo.extend.filter.register('after_render:html', (html, { page }) => {return render(config,html,page)});
