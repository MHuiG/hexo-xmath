// https://docs.mathjax.org/en/latest/server/direct.html#id6
// https://docs.mathjax.org/en/latest/server/direct.html#id8
//
//  Load the packages needed for MathJax
//
const { mathjax } = require('@mathjax/src/js/mathjax.js');
const { TeX } = require('@mathjax/src/js/input/tex.js');
const { SVG } = require('@mathjax/src/js/output/svg.js');
const { LiteAdaptor } = require('@mathjax/src/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('@mathjax/src/js/handlers/html.js');

//
// Load the component definitions
//
const {Loader} = require('@mathjax/src/js/components/loader.js');
const {Package} = require('@mathjax/src/js/components/package.js');
require('@mathjax/src/components/js/startup/init.js');
require('@mathjax/src/components/js/core/lib/core.js');
require('@mathjax/src/components/js/input/tex/tex.js');
require('@mathjax/src/components/js/output/svg/svg.js');

//
// Set up methods for loading dynamic files
//
MathJax.config.loader.require = (file) => require(file);
mathjax.asyncLoad = (file) => require(Package.resolvePath(file));


//
// Import the needed TeX packages
//
const pkg ={
  "action":"Action",
  "ams":"Ams",
  "amscd":"AmsCd",
  "autoload":"Autoload",
  "base":"Base",
  "bbm":"Bbm",
  "bboldx":"Bboldx",
  "bbox":"Bbox",
  "begingroup":"Begingroup",
  "boldsymbol":"Boldsymbol",
  "braket":"Braket",
  "bussproofs":"Bussproofs",
  "cancel":"Cancel",
  "cases":"Cases",
  "centernot":"Centernot",
  "color":"Color",
  "colortbl":"Colortbl",
  "colorv2":"ColorV2",
  "configmacros":"ConfigMacros",
  "dsfont":"Dsfont",
  "empheq":"Empheq",
  "enclose":"Enclose",
  "extpfeil":"Extpfeil",
  "gensymb":"Gensymb",
  "html":"Html",
  "mathtools":"Mathtools",
  "mhchem":"Mhchem",
  "newcommand":"Newcommand",
  "noerrors":"NoErrors",
  "noundefined":"NoUndefined",
  "physics":"Physics",
  "require":"Require",
  "setoptions":"SetOptions",
  "tagformat":"TagFormat",
  "texhtml":"TexHtml",
  "textcomp":"Textcomp",
  "textmacros":"TextMacros",
  "unicode":"Unicode",
  "units":"Units",
  "upgreek":"Upgreek",
  "verb":"Verb",
};
const pkgs =Object.keys(pkg);
for (const module of pkgs) {
  const path = `@mathjax/src/js/input/tex/${module}/${pkg[module]}Configuration.js`;
  require(path);
}

//
// Record the pre-loaded component files
//
Loader.preLoaded(
  'loader', 
  'startup',
  'core',
  'input/tex',
  'output/svg',
  '[tex]/base',
  '[tex]/configmacros',
  '[tex]/require',
);

module.exports = function(config) {

  //
  //  Create DOM adaptor and register it for HTML documents
  //
  const adaptor = new LiteAdaptor({
    fontSize        : 16,
    cjkCharWidth    : config.cjk_width,
    unknownCharWidth: config.normal_width
  });
  RegisterHTMLHandler(adaptor);
  const texConfig = MathJax.config.tex || {};
  if (Array.isArray(config.packages)) {
    texConfig.packages = { '[+]': ["base","configmacros","require", ...config.packages] };
  }
  Object.assign(texConfig, config.tex_config);

  return async function(content,cf) {
    Object.assign(texConfig, cf);

    //
    //  Create input and output jax and a document using them on the content from the HTML file
    //
    const tex = new TeX(texConfig);
    const svg = new SVG({
      ...(MathJax.config.output || {}),
      ...(MathJax.config.svg || {}),
      fontCache: 'none',
    });
    const html = mathjax.document(content, {
      ...(MathJax.config.options || {}),
      InputJax : tex,
      OutputJax: svg,
    });
    
    //
    // Wait for the typesetting to finish
    //
    await html.renderPromise();

    
    //
    //  Output the resulting HTML
    //
    const result = adaptor.innerHTML(adaptor.body(html.document));
     
    return result;

    
  };
};
