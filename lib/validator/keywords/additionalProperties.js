function compile(path, schema) {
  // TODO: handle empty additional properties schema
  if (schema.additionalProperties === false) {
    // use `additionalPropertiesNever`
    return 'additionalPropertiesNever';

  } else if (typeof schema.additionalProperties === 'object') {
    // add segment to path and compile subschema
    this.compile(`${path}/additionalProperties`,
      schema.additionalProperties);

    // use `additionalProperties`
    return 'additionalProperties';
  }

  // skip validation
  return false;
}

const validate = {
  additionalPropertiesNever: function () {
    // never succeeds
    throw 'additional properties never error';
  },

  additionalProperties: function (ctx, schema, data, property) {
    // execute only if property is additional
    if (ctx.additional) {
      // validate data against additional properties schema
      this.validate(schema.additionalProperties, data);
    }
  }
};

module.exports = {
  name: 'additionalProperties',
  locations: ['/childInstance/object'],
  compile,
  validate
};
