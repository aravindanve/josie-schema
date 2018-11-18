const TypeString = require('../../constants/TypeString');

const prototype = {
  null() {
    return this.type(TypeString.NULL);
  }
};

module.exports = prototype;
