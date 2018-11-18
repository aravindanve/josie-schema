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

  if (check.isObject(value)) {
    this.object(value);

  } else if (!check.isUndefined(value)) {
    this.const(value);
  }
}

Builder.prototype = {
  type(...values) {
    if (!values.length) {
      throw new TypeError('At least one value is required');
    }

    // init types array
    const types = check.isArray(this._schema.type)
      ? this._schema.type : (this._schema.type
        ? [this._schema.type] : []);

    // push unique values to array
    for (const value of values) {
      if (!check.isTypeString(value)) {
        throw new TypeError('Invalid type string');
      }
      if (types.indexOf(value) < 0) {
        types.push(value);
      }
    }

    // set type
    this._schema.type = types.length <= 1
      ? types[0] : types;

    return this;
  },

  enum(...values) {
    if (!values.length) {
      throw new TypeError('At least one value is required');
    }
    this._schema.enum = values;
    return this;
  },

  const(value) {
    if (check.isUndefined(value)) {
      throw new TypeError('A value is required');
    }
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
