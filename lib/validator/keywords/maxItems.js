function compile(path, schema) {
  if (typeof schema.maxItems === 'number') {
    // use `maxItems`
    return 'maxItems';
  }

  // skip validation
  return false;
}

const validate = {
  maxItems: function (ctx, schema, data) {
    if (ctx.dataLength > schema.maxItems) {
      throw 'max items error';
    }
  }
};

module.exports = {
  name: 'maxItems',
  locations: ['/typeful/array'],
  compile,
  validate
};
