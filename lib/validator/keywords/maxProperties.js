function compile(ctx, schema, parent) {
  if (typeof schema.maxProperties === 'number') {
    // use `maxProperties`
    return 'maxProperties';
  }

  // skip validation
  return false;
}

const validate = {
  maxProperties: function (ctx, schema, data) {
    if (ctx.dataLength > schema.maxProperties) {
      throw 'max properties error';
    }
  }
};

module.exports = {
  name: 'maxProperties',
  locations: ['/typeful/object/-'],
  compile,
  validate
};
