const utils = require('../utils');

module.exports = {
  const: function (ctx, schema, data) {
    // TODO: implement object and array comparison
    if (data !== schema.const) {
      throw 'const error';
    }
  },

  type: function (ctx, schema, data) {
    if (ctx.dataType !== schema.type) {
      throw 'type error';
    }
  },

  typeMap: function (ctx, schema, data) {
    if (!schema._typeMap[ctx.dataType]) {
      throw 'type map error';
    }
  },

  enumMap: function (ctx, schema, data) {
    if (!schema._enumMap[utils.asKeyString(data)]) {
      throw 'enum map error';
    }
  }
};
