module.exports = {
  multipleOf: function (ctx, schema, data) {
    if (data % schema.multipleOf !== 0) {
      throw 'multiple of error';
    }
  },

  maximum: function (ctx, schema, data) {
    if (data > schema.maximum) {
      throw 'maximum error';
    }
  },

  exclusivemMaximum: function (ctx, schema, data) {
    if (data >= schema.exclusivemMaximum) {
      throw 'exclusive maximum error';
    }
  },

  minimum: function (ctx, schema, data) {
    if (data < schema.minimum) {
      throw 'minimum error';
    }
  },

  exclusiveMinimum: function (ctx, schema, data) {
    if (data <= schema.exclusiveMinimum) {
      throw 'exclusive minimum error';
    }
  }
};
