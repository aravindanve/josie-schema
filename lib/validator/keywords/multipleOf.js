function compile(ctx, schema, parent) {
  if (typeof schema.multipleOf === 'number') {
    // use `multipleOf`
    return 'multipleOf';
  }

  // skip validation
  return false;
}

const validate = {
  multipleOf: function (ctx, schema, data) {
    if (data % schema.multipleOf !== 0) {
      throw 'multiple of error';
    }
  }
};

module.exports = {
  name: 'multipleOf',
  locations: ['/typeful/number/-', '/typeful/integer/-'],
  compile,
  validate
};
