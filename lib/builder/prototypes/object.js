const TypeString = require('../../constants/TypeString');

const objectBuilderPrototype = {
  object(value) {
    return this.type(TypeString.OBJECT).properties(value);
  },

  properties(value) {
    this._schema.properties = value;
    return this;
  },

  maxProperties(value) {
    this._schema.maxProperties = value;
    return this;
  },

  minProperties(value) {
    this._schema.minProperties = value;
    return this;
  },

  patternProperties(value) {
    this._schema.patternProperties = value;
    return this;
  },

  additionalProperties(value) {
    this._schema.additionalProperties = value;
    return this;
  },

  propertyNames(value) {
    this._schema.propertyNames = value;
    return this;
  }
};

module.exports = objectBuilderPrototype;
