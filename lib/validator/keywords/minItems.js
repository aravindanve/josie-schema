function compile(path, schema) {
  if (typeof schema.minItems === 'number') {
    // use `minItems`
    return 'minItems';
  }

  // skip validation
  return false;
}

const validate = {
  minItems: function (ctx, schema, data) {
    if (ctx.dataLength < schema.minItems) {
      throw 'min items error';
    }
  }
};

module.exports = {
  name: 'minItems',
  locations: ['/typeful/array'],
  compile,
  validate
};
