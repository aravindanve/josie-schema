const TypeString = require( '../../constants/TypeString');

const prototype = {
  array(items) {
    return items
      ? this.items(items)
      : this.type(TypeString.ARRAY);
  },

  items(value) {
    if (!this.hasType(TypeString.ARRAY)) {
      this.type(TypeString.ARRAY);
    }
    this._schema.items = value;
    return this;
  },

  additionalItems(value) {
    if (!this.hasType(TypeString.ARRAY)) {
      this.type(TypeString.ARRAY);
    }
    this._schema.additionalItems = value;
  },

  maxItems(value) {
    if (!this.hasType(TypeString.ARRAY)) {
      this.type(TypeString.ARRAY);
    }
    this._schema.maxItems = value;
    return this;
  },

  minItems(value) {
    if (!this.hasType(TypeString.ARRAY)) {
      this.type(TypeString.ARRAY);
    }
    this._schema.minItems = value;
    return this;
  },

  uniqueItems(value) {
    if (!this.hasType(TypeString.ARRAY)) {
      this.type(TypeString.ARRAY);
    }
    this._schema.uniqueItems = value;
    return this;
  },

  contains(value) {
    if (!this.hasType(TypeString.ARRAY)) {
      this.type(TypeString.ARRAY);
    }
    this._schema.contains = value;
    return this;
  }
};

module.exports = prototype;
