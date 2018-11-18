const TypeString = require('../constants/TypeString');
const FormatString = require('../constants/FormatString');
const literalBuilderPrototype = require('./prototypes/literal');
const nullBuilderPrototype = require('./prototypes/null');
const booleanBuilderPrototype = require('./prototypes/boolean');
const numberBuilderPrototype = require('./prototypes/number');
const integerBuilderPrototype = require('./prototypes/integer');
const stringBuilderPrototype = require('./prototypes/string');
const arrayBuilderPrototype = require('./prototypes/array');
const objectBuilderPrototype = require('./prototypes/object');
const makeStaticAliases = require('../utils/makeStaticAliases');
const check = require('../utils/check');

function Builder(value, ...args) {
  if (!(this instanceof Builder)) return new Builder(value, ...args);

  Object.defineProperties(this, {
    _schema: {
      configurable: false,
      enumerable: false,
      value: {},
      writable: true
    }
  });

  if (value !== undefined) {
    if (value !== null && typeof value === 'object') {
      this.object(value);

    } else {
      this.const(value);
    }
  }
}

Builder.prototype = {
  type(value) {
    this._schema.type = value;
    return this;
  },

  enum(...values) {
    this._schema.enum = values;
    return this;
  },

  const(value) {
    this._schema.const = value;
    return this;
  },

  default(value) {
    this._schema.default = value;
    return this;
  },

  toJSON() {
    return this._schema;
  },

  ...literalBuilderPrototype,
  ...nullBuilderPrototype,
  ...booleanBuilderPrototype,
  ...numberBuilderPrototype,
  ...integerBuilderPrototype,
  ...stringBuilderPrototype,
  ...arrayBuilderPrototype,
  ...objectBuilderPrototype
};

Builder.types = TypeString;
Builder.formats = FormatString;
Builder.check = check;

makeStaticAliases(Builder);

module.exports = Builder;
