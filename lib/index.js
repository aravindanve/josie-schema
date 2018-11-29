/*
 * Josie Schema
 * JSON Schema Tools
 * https://github.com/aravindanve
 *
 */

const compiler = require('./validator/compile');
const validator = require('./validator/validate');
const context = require('./validator/context');

module.exports = {
  compile(schema) {
    const root = JSON.parse(JSON.stringify(schema));
    const gctx = context.createGlobalContext();

    compiler.compile(gctx, { root }, 'root');

    return {
      gctx,
      root,
      validate(data) {
        return validator.validate(this.gctx, this.root, data);
      }
    };
  }
};
