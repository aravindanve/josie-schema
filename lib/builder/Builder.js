const TypeString = require('../constants/TypeString');
const FormatString = require('../constants/FormatString');
const literalPrototype = require('./prototypes/literal');
const nullPrototype = require('./prototypes/null');
const booleanPrototype = require('./prototypes/boolean');
const numberPrototype = require('./prototypes/number');
const integerPrototype = require('./prototypes/integer');
const stringPrototype = require('./prototypes/string');
const arrayPrototype = require('./prototypes/array');
const objectPrototype = require('./prototypes/object');
const conditionPrototype = require('./prototypes/condition');
const combinationPrototype = require('./prototypes/combination');
const nullablePrototype = require('./extendedPrototypes/nullable');
const aliasesPrototype = require('./extendedPrototypes/aliases');
const makeStaticAliases = require('../utils/makeStaticAliases');
const check = require('../utils/check');

function Builder(properties) {
  if (!(this instanceof Builder)) return new Builder(properties);

  Object.defineProperties(this, {
    _schema: {
      configurable: false,
      enumerable: false,
      value: {},
      writable: true
    },
    _type: {
      configurable: false,
      enumerable: false,
      value: {},
      writable: true
    }
  });

  if (check.isObject(properties)) {
    this.object(properties);
  }
}

Builder.prototype = {
  type(...values) {
    if (!values.length) {
      throw new TypeError('At least one type must be specified');
    }

    for (const value of values) {
      if (!check.isTypeString(value)) {
        throw new TypeError('Invalid type string specified');
      }
      this._type[value] = true;
    }

    const types = Object.keys(this._type);
    this._schema.type = types.length <= 1
      ? types[0] : types;

    return this;
  },

  hasType(...values) {
    if (!values.length) {
      return this._schema.type ? true : false;
    }

    for (const value of values) {
      if (!this._type[value]) {
        return false;
      }
    }

    return true;
  },

  enum(...values) {
    if (!values.length) {
      throw new TypeError('At least one value must be specified');
    }
    this._schema.enum = values;
    return this;
  },

  const(value) {
    if (check.isUndefined(value)) {
      throw new TypeError('A value value must be specified');
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

  ...literalPrototype,
  ...nullPrototype,
  ...booleanPrototype,
  ...numberPrototype,
  ...integerPrototype,
  ...stringPrototype,
  ...arrayPrototype,
  ...objectPrototype,
  ...conditionPrototype,
  ...combinationPrototype,

  ...nullablePrototype,
  ...aliasesPrototype
};

Builder.types = TypeString;
Builder.formats = FormatString;
Builder.check = check;

makeStaticAliases(Builder);

module.exports = Builder;
