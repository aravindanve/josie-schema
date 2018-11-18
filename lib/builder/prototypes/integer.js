const TypeString = require('../../constants/TypeString');

const prototype = {
  integer() {
    return this.type(TypeString.INTEGER);
  }
};

module.exports = prototype;
