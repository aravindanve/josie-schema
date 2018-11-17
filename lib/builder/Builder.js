const TypeString = require('../constants/TypeString');
const FormatString = require('../constants/FormatString');
const booleanBuilderPrototype = require('./prototypes/boolean');
const nullBuilderPrototype = require('./prototypes/null');
const arrayBuilderPrototype = require('./prototypes/array');
const makeStaticAliases = require('../utils/makeStaticAliases');

function Builder(...args) {
  if (!(this instanceof Builder)) return new Builder(...args);
  this._schema = {};
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

  ...booleanBuilderPrototype,
  ...nullBuilderPrototype,
  ...arrayBuilderPrototype
};

Builder.types = TypeString;
Builder.formats = FormatString;

makeStaticAliases(Builder);

module.exports = Builder;
