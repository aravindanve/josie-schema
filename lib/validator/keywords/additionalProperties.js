function compile(ctx, schema, parent) {
  const result = this.compile(ctx, schema, 'additionalProperties');

  if (result === false) {
    // use `additionalPropertiesNever`
    return 'additionalPropertiesNever';

  } else if (typeof result === 'object') {
    // use `additionalProperties`
    return 'additionalProperties';
  }

  // skip validation
  return false;
}

const validate = {
  additionalPropertiesNever: function (ctx) {
    // execute only if property is additional
    if (ctx.additional) {
      // never succeeds
      throw 'additional properties never error';
    }
  },

  additionalProperties: function (ctx, schema, data, i) {
    // execute only if property is additional
    if (ctx.additional) {
      // validate data against additional properties schema
      this.validate(schema.additionalProperties, data);
    }
  }
};

module.exports = {
  name: 'additionalProperties',
  locations: ['/childInstance/object/-'],
  compile,
  validate
};
