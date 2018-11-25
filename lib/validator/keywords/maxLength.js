function compile(ctx, schema, parent) {
  if (typeof schema.maxLength === 'number') {
    // use `maxLength`
    return 'maxLength';
  }

  // skip validation
  return false;
}

const validate = {
  maxLength: function (ctx, schema, data) {
    if (data.length > schema.maxLength) {
      throw 'max length error';
    }
  }
};

module.exports = {
  name: 'maxLength',
  locations: ['/typeful/string/-'],
  compile,
  validate
};
