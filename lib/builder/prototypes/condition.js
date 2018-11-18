const protoype = {
  if(value) {
    this._schema.if = value;
    return this;
  },

  then(value) {
    this._schema.then = value;
    return this;
  },

  else(value) {
    this._schema.else = value;
    return this;
  }
};

module.exports = protoype;
