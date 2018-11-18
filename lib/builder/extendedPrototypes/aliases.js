const prototype = {
  numberPositive() {
    return this.number().exclusiveMinimum(0);
  },

  numberNegative() {
    return this.number().exclusiveMaximum(0);
  },

  numberNonNegative() {
    return this.number().minimum(0);
  },

  integerPositive() {
    return this.integer().exclusiveMinimum(0);
  },

  integerNegative() {
    return this.integer().exclusiveMaximum(0);
  },

  integerNonNegative() {
    return this.integer().minimum(0);
  },

  stringNonEmpty() {
    return this.minLength(1);
  },

  arrayNonEmpty() {
    return this.minItems(1);
  },

  objectNonEmpty() {
    return this.minProperties(1);
  }
};

module.exports = prototype;
