/*
 * Josie Schema
 * JSON Schema Tools
 * https://github.com/aravindanve
 *
 */

const compiler = require('./compiler');
const validator = require('./validator');
const context = require('./context');
const clone = require('./utils/clone');

module.exports = {
  compile(schema) {
    const root = clone(schema);
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
