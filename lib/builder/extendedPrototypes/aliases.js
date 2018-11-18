const prototype = {
  positiveNumber() {
    return this.number().exclusiveMinimum(0);
  },
  negativeNumber() {
    return this.number().exclusiveMaximum(0);
  },
  nonNegativeNumber() {
    return this.number().minimum(0);
  },
  positiveInteger() {
    return this.integer().exclusiveMinimum(0);
  },
  negativeInteger() {
    return this.integer().exclusiveMaximum(0);
  },
  nonNegativeInteger() {
    return this.integer().minimum(0);
  },
  nonEmptyString() {
    return this.minLength(1);
  },
  nonEmptyArray() {
    return this.minItems(1);
  },
  nonEmptyObject() {
    return this.minProperties(1);
  }
};

module.exports = prototype;
