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
    const rctx = typeof root === 'object'
      ? context.createRootContext(root)
      : null;

    compiler.compile(rctx, { root }, 'root');

    return {
      rctx,
      root,
      validate(data) {
        return validator.validate(this.rctx, this.root, data);
      }
    };
  },

  addSchema(schema, uri) {
    context.addSchema(schema, uri);
  },

  addSchemas(schemas) {
    if (Array.isArray(schemas)) {
      schemas.forEach(schema =>
        this.addSchema(schema));

    } else {
      Object.keys(schemas).forEach(uri =>
        this.addSchema(schemas[uri], uri));
    }
  }
};
