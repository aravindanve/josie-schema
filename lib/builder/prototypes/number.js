const TypeString = require('../../constants/TypeString');

const prototype = {
  number() {
    return this.type(TypeString.NUMBER);
  },

  multipleOf(value) {
    if (!this.hasType(TypeString.NUMBER) &&
        !this.hasType(TypeString.INTEGER)) {
      this.type(TypeString.NUMBER);
    }
    this._schema.multipleOf = value;
    return this;
  },

  maximum(value) {
    if (!this.hasType(TypeString.NUMBER) &&
        !this.hasType(TypeString.INTEGER)) {
      this.type(TypeString.NUMBER);
    }
    this._schema.maximum = value;
    return this;
  },

  exclusiveMaximum(value) {
    if (!this.hasType(TypeString.NUMBER) &&
        !this.hasType(TypeString.INTEGER)) {
      this.type(TypeString.NUMBER);
    }
    this._schema.exclusiveMaximum = value;
    return this;
  },

  minimum(value) {
    if (!this.hasType(TypeString.NUMBER) &&
        !this.hasType(TypeString.INTEGER)) {
      this.type(TypeString.NUMBER);
    }
    this._schema.minimum = value;
    return this;
  },

  exclusiveMinimum(value) {
    if (!this.hasType(TypeString.NUMBER) &&
        !this.hasType(TypeString.INTEGER)) {
      this.type(TypeString.NUMBER);
    }
    this._schema.exclusiveMinimum = value;
    return this;
  }
};

module.exports = prototype;
