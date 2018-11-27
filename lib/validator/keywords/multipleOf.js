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
    // NOTE: mod `%` doesn't work due to floating point precision
    // TODO: allow precision to be configured?
    const result = data / schema.multipleOf;
    if (result !== parseInt(result)) {
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
