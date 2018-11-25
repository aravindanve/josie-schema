function compile(ctx, schema, parent) {
  if (typeof schema.minimum === 'number') {
    // use `minimum`
    return 'minimum';
  }

  // skip validation
  return false;
}

const validate = {
  minimum: function (ctx, schema, data) {
    if (data < schema.minimum) {
      throw 'minimum error';
    }
  }
};

module.exports = {
  name: 'minimum',
  locations: ['/typeful/number/-', '/typeful/integer/-'],
  compile,
  validate
};
