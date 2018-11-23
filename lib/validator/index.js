const keywords = require('./keywords');
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
  }
};

module.exports = function compileSchema(schema) {
  const _schema = JSON.parse(JSON.stringify(schema));
  const instance = Object.create(proto, {
    _schema: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: _schema
    }
  });

  compiler.compile(instance._schema);
  return instance;
}
