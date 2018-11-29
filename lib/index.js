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
    const sctx = context.createGlobalContext();

    compiler.compile(sctx, { root }, 'root');

    return {
      sctx,
      root,
      validate(data) {
        return validator.validate(this.sctx, this.root, data);
      }
    };
  }
};
