const validator = require('./validator');
const metaSchema = require('./metaSchema.json');

function Builder(schema) {
  if (!(this instanceof Builder)) {
    return new Builder(schema);
  }

  Object.defineProperties(this, {
    _schema: {
      configurable: false,
      enumerable: false,
      value: schema || {},
      writable: true
    }
  });
}

Builder.prototype.toJSON = function () {
  return this._schema;
}

Builder.prototype.export = function () {
  return JSON.parse(JSON.stringify(this._schema));
}

Builder.prototype.compile = function () {
  return validator(this);
}

// keyword methods
for (const keyword of Object.keys(metaSchema.properties)) {
  // add instance method
  Builder.prototype[keyword] = function (value) {
    this._schema[keyword] = value;
  }

  // add static method
  Builder[keyword] = function (value) {
    return (new Builder)[keyword](value);
  }
}

module.exports = Builder;
