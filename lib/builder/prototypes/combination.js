const protoype = {
  allOf(...values) {
    this._schema.allOf = values;
    return this;
  },

  anyOf(...values) {
    this._schema.anyOf = values;
    return this;
  },

  oneOf(...values) {
    this._schema.oneOf = values;
    return this;
  },

  not(value) {
    this._schema.not = value;
    return this;
  }
};

module.exports = protoype;
