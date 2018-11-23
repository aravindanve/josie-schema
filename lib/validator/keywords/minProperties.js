function compile(path, schema) {
  if (typeof schema.minProperties === 'number') {
    // use `minProperties`
    return 'minProperties';
  }

  // skip validation
  return false;
}

const validate = {
  minProperties: function (ctx, schema, data) {
    if (ctx.dataLength < schema.minProperties) {
      throw 'min properties error';
    }
  }
};

module.exports = {
  name: 'minProperties',
  locations: ['/typeful/object'],
  compile,
  validate
};
