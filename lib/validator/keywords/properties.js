function compile(path, schema) {
  // TODO: handle empty properties object
  if (typeof schema.properties === 'object') {
    // compile subschemas
    for (const property of Object.keys(schema.properties)) {
      // add segment to path and compile subschema
      this.compile(`${path}/properties/${property}`,
        schema.properties[property]);
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
  locations: ['/childInstance/object'],
  compile,
  validate
};
