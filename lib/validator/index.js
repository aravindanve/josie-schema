const keywords = require('./keywords');
const context = require('./context');
const compile = require('./compile');
const validate = require('./validate');
const objectUtil = require('../utils/object');

const compiler = Object.create(
  keywords.compile,
  objectUtil.makeDescriptorMap({
    compile,
    _names: keywords.names,
    _locationsOf: keywords.locationsOf
  }));

const validator = Object.create(
  keywords.validate,
  objectUtil.makeDescriptorMap({
    validate
  }));

const proto = {
  validate(data) {
    return validator.validate(this._schema, data);
  },

  toJSON() {
    return this._originalSchema;
  }
};

module.exports = function compileSchema(schema) {
  const _schema = JSON.parse(JSON.stringify(schema));
  const ctx = context.create();
  const instance = Object.create(
    proto,
    objectUtil.makeDescriptorMap({
      _schema,
      _originalSchema: schema
    }));

  // pass1: compile
  compiler.compile(ctx, null, '#', _schema);

  // pass2: resolve context
  context.resolve(ctx);

  // return compiled schema
  return instance;
}
