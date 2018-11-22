module.exports = {
  maxItems: function (ctx, schema, data) {
    if (data.length > schema.maxItems) {
      throw 'max items error';
    }
  },

  minItems: function (ctx, schema, data) {
    if (data.length < schema.minItems) {
      throw 'min items error';
    }
  }
};
