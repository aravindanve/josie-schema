const TypeString = require('../../constants/TypeString');

const nullBuilderPrototype = {
  null() {
    return this.type(TypeString.NULL);
  }
};

module.exports = nullBuilderPrototype;
