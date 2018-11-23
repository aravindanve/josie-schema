function compile(path, schema) {
  if (typeof schema.maximum === 'number') {
    // use `maximum`
    return 'maximum';
  }

  // skip validation
  return false;
}

const validate = {
  maximum: function (ctx, schema, data) {
    if (data > schema.maximum) {
      throw 'maximum error';
    }
  }
};

module.exports = {
  name: 'maximum',
  locations: ['/typeful/number', '/typeful/integer'],
  compile,
  validate
};
