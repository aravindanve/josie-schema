const TypeString = require('../../constants/TypeString');

const prototype = {
  boolean() {
    return this.type(TypeString.BOOLEAN);
  }
};

module.exports = prototype;
