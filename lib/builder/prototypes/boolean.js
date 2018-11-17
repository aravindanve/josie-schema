const TypeString = require('../../constants/TypeString');

const booleanBuilderPrototype = {
  boolean() {
    return this.type(TypeString.BOOLEAN);
  }
};

module.exports = booleanBuilderPrototype;
