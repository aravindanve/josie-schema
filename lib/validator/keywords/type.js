function compile(path, schema) {
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
      throw 'type map error';
    }
  },

  type: function (ctx, schema, data) {
    if (ctx.dataType !== schema.type) {
      throw 'type error';
    }
  }
};

module.exports = {
  name: 'type',
  locations: ['/typeless'],
  compile,
  validate
};
