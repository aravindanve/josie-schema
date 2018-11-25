function compile(ctx, schema, parent) {
  // TODO: handle empty properties object
  if (typeof schema.properties === 'object') {
    // HACK: set metadata for `properties`
    schema.properties._parent = schema;
    schema.properties._key = 'properties';
    schema.properties._path = `${schema._path}/properties`;

    // HACK: add path reference to context
    ctx.paths[schema.properties._path] = schema.properties;

    // compile subschemas
    for (const property of Object.keys(schema.properties)) {
      // add segment to path and compile subschema
      this.compile(ctx, schema.properties, property);
    }

    // use `properties`
    return 'properties';
  }

  // skip validation
  return false;
}

const validate = {
  properties: function (ctx, schema, data, property) {
    // check if property is defined in schema
    if (schema.properties[property]) {
      // set additional flag to false
      ctx.additional = false;

      // validate data against property schema
      this.validate(schema.properties[property], data);
    }
  }
};

module.exports = {
  name: 'properties',
  locations: ['/childInstance/object/-'],
  compile,
  validate
};
