const protoype = {
  allOf(...values) {
    if (!values.length) {
      throw new TypeError('At least one value must be specified');
    }
    this._schema.allOf = values;
    return this;
  },

  anyOf(...values) {
    if (!values.length) {
      throw new TypeError('At least one value must be specified');
    }
    this._schema.anyOf = values;
    return this;
  },

  oneOf(...values) {
    if (!values.length) {
      throw new TypeError('At least one value must be specified');
    }
    this._schema.oneOf = values;
    return this;
  },

  not(value) {
    this._schema.not = value;
    return this;
  }
};

module.exports = protoype;
