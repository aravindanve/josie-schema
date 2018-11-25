function compile(ctx, schema, parent) {
  // TODO: handle empty property names schema
  if (schema.propertyNames === false) {
    // use `propertyNamesNever`
    return 'propertyNamesNever';

  } else if (typeof schema.propertyNames === 'object') {
    // add segment to path and compile subschema
    this.compile(ctx, schema, 'propertyNames');

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
