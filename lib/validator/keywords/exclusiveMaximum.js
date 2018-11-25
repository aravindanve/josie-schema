function compile(ctx, schema, parent) {
  if (typeof schema.exclusiveMaximum === 'number') {
    // use `exclusiveMaximum`
    return 'exclusiveMaximum';
  }

  // skip validation
  return false;
}

const validate = {
  exclusiveMaximum: function (ctx, schema, data) {
    if (data >= schema.exclusiveMaximum) {
      throw 'exclusive maximum error';
    }
  }
};

module.exports = {
  name: 'exclusiveMaximum',
  locations: ['/typeful/number/-', '/typeful/integer/-'],
  compile,
  validate
};
