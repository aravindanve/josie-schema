const TypeString = require('../../constants/TypeString');

const numberBuilderPrototype = {
  number() {
    return this.type(TypeString.NUMBER);
  },

  multipleOf(value) {
    this._schema.multipleOf = value;
    return this;
  },

  maximum(value) {
    this._schema.maximum = value;
    return this;
  },

  exclusiveMaximum(value) {
    this._schema.exclusiveMaximum = value;
    return this;
  },

  minimum(value) {
    this._schema.minimum = value;
    return this;
  },

  exclusiveMinimum(value) {
    this._schema.exclusiveMinimum = value;
    return this;
  }
};

module.exports = numberBuilderPrototype;
