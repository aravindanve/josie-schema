function compile(ctx, schema, parent) {
  if (typeof schema.exclusiveMinimum === 'number') {
    // use `exclusiveMinimum`
    return 'exclusiveMinimum';
  }

  // skip validation
  return false;
}

const validate = {
  exclusiveMinimum: function (ctx, schema, data) {
    if (data <= schema.exclusiveMinimum) {
      throw 'exclusive minimum error';
    }
  }
};

module.exports = {
  name: 'exclusiveMinimum',
  locations: ['/typeful/number/-', '/typeful/integer/-'],
  compile,
  validate
};
