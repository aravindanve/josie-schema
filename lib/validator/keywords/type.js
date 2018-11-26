function compile(ctx, schema, parent) {
  if (Array.isArray(schema.type)) {
    // pre-compile type map
    schema._typeMap = Object.create(null);
    for (const type of schema.type) {
      schema._typeMap[type] = true;
    }

    // use `typeMap`
    return 'typeMap';

  } else if (typeof schema.type === 'string') {
    // use `type`
    return 'type';
  }

  // skip validation
  return false;
}

const validate = {
  typeMap: function (ctx, schema, data) {
    if (!schema._typeMap[ctx.dataType]) {
      // special case: an integer is a number
      if (ctx.dataType === 'integer' &&
          schema._typeMap['number']) {
        return;
      }
      throw 'type map error';
    }
  },

  type: function (ctx, schema, data) {
    if (ctx.dataType !== schema.type) {
      // special case: an integer is a number
      if (ctx.dataType === 'integer' &&
          schema.type === 'number') {
        return;
      }
      throw 'type error';
    }
  }
};

module.exports = {
  name: 'type',
  locations: ['/typeless/-'],
  compile,
  validate
};
