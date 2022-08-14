const postcssjitprops = require("postcss-jit-props");
const openProps = require("open-props");

module.exports = {
  plugins: [postcssjitprops(openProps), require("autoprefixer")],
};
