function compile(ctx, schema, parent) {
  if (typeof schema.minLength === 'number') {
    // use `minLength`
    return 'minLength';
  }

  // skip validation
  return false;
}

const validate = {
  minLength: function (ctx, schema, data) {
    if (data.length < schema.minLength) {
      throw 'min length error';
    }
  }
};

module.exports = {
  name: 'minLength',
  locations: ['/typeful/string/-'],
  compile,
  validate
};
