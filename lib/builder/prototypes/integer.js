const TypeString = require('../../constants/TypeString');

const integerBuilderPrototype = {
  integer() {
    return this.type(TypeString.INTEGER);
  }
};

module.exports = integerBuilderPrototype;
