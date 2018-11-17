const literalBuilderPrototype = {
  literal(value) {
    return this.const(value);
  }
};

module.exports = literalBuilderPrototype;
