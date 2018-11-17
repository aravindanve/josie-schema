const TypeString = require( '../../constants/TypeString');

const arrayBuilderPrototype = {
  array(items) {
    return this.type(TypeString.ARRAY).items(items);
  },

  items(value) {
    this._schema.items = value;
    return this;
  },

  maxItems(value) {
      this._schema.maxItems = value;
      return this;
  },

  minItems(value) {
      this._schema.minItems = value;
      return this;
  },

  uniqueItems(value) {
      this._schema.uniqueItems = value;
      return this;
  },

  contains(value) {
      this._schema.contains = value;
      return this;
  }
};

module.exports = arrayBuilderPrototype;
