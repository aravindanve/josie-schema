function compile(ctx, schema, parent) {
  if (Array.isArray(schema.required) &&
      schema.required.length) {
    // use `required`
    return 'required';
  }

  // skip validation
  return false;
}

const validate = {
  required: function (ctx, schema, data) {
    // check if data has less properties than required
    if (ctx.dataKeys.length < schema.required) {
      throw 'required error';
    }
    // check if data has all required properties
    for (const property of schema.required) {
      if (!Object.prototype.propertyIsEnumerable
            .call(data, property)) {

        throw 'required error';
      }
    }
  }
};

module.exports = {
  name: 'required',
  locations: ['/typeful/object/-'],
  compile,
  validate
};
