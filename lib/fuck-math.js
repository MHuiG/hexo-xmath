
module.exports = function(config) {
  return `
.mathformula-display{
  width: 100%; 
  overflow: auto hidden;
}
.mathformula-inline{
  max-width: 100%; 
  overflow: auto hidden;
  display: inline-block;
  white-space: nowrap; 
  vertical-align: middle;
  padding: 4px 2px 4px 6px
}
mjx-container{
  padding: 0 0 !important
}
`;
};
