const keywords = require('./keywords');
const context = require('./context');
const compile = require('./compile');
const validate = require('./validate');

const compiler = Object.create(keywords.compile, {
  compile: {
    configurable: false,
    enumerable: false,
    writable: false,
    value: compile
  },
  _names: {
    configurable: false,
    enumerable: false,
    writable: false,
    value: keywords.names
  },
  _locationsOf: {
    configurable: false,
    enumerable: false,
    writable: false,
    value: keywords.locationsOf
  }
});

const validator = Object.create(keywords.validate, {
  validate: {
    configurable: false,
    enumerable: false,
    writable: false,
    value: validate
  }
});

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
  const instance = Object.create(proto, {
    _schema: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: _schema
    },
    _originalSchema: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: schema
    }
  });

  // pass1: compile
  compiler.compile(ctx, null, '#', _schema);

  // pass2: resolve context
  context.resolve(ctx);

  // return compiled schema
  return instance;
}
