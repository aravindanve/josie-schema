function compile(ctx, schema, parent) {
  const result = this.compile(ctx, schema, 'propertyNames');

  if (result === false) {
    // use `propertyNamesNever`
    return 'propertyNamesNever';

  } else if (typeof result === 'object') {
    // use `propertyNames`
    return 'propertyNames';
  }

  // skip validation
  return false;
}

const validate = {
  propertyNamesNever: function () {
    // never succeeds
    throw 'property names never error';
  },

  propertyNames: function (ctx, schema, data, property) {
    // validate against property names schema
    this.validate(schema.propertyNames, property);
  }
};

module.exports = {
  name: 'propertyNames',
  locations: ['/childInstance/object/-'],
  compile,
  validate
};
