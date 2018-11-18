const TypeString = require('../../constants/TypeString');

const prototype = {
  object(value) {
    return value
      ? this.properties(value)
      : this.type(TypeString.OBJECT);
  },

  maxProperties(value) {
    if (!this.hasType(TypeString.OBJECT)) {
      this.type(TypeString.OBJECT);
    }
    this._schema.maxProperties = value;
    return this;
  },

  minProperties(value) {
    if (!this.hasType(TypeString.OBJECT)) {
      this.type(TypeString.OBJECT);
    }
    this._schema.minProperties = value;
    return this;
  },

  properties(value) {
    if (!this.hasType(TypeString.OBJECT)) {
      this.type(TypeString.OBJECT);
    }
    this._schema.properties = value;
    return this;
  },

  patternProperties(value) {
    if (!this.hasType(TypeString.OBJECT)) {
      this.type(TypeString.OBJECT);
    }
    this._schema.patternProperties = value;
    return this;
  },

  additionalProperties(value) {
    if (!this.hasType(TypeString.OBJECT)) {
      this.type(TypeString.OBJECT);
    }
    this._schema.additionalProperties = value;
    return this;
  },

  propertyNames(value) {
    if (!this.hasType(TypeString.OBJECT)) {
      this.type(TypeString.OBJECT);
    }
    this._schema.propertyNames = value;
    return this;
  }
};

module.exports = prototype;
