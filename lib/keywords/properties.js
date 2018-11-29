module.exports = {
  name: 'properties',
  compile(rctx, sctx, schema) {
    // compile subschemas
    const properties = Object.keys(schema.properties);
    for (const property of properties) {
      this.compile(rctx, schema.properties, property);
    }

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validateProperty);
  }
};

function validateProperty(rctx, sctx, dctx, schema, data, property) {
  if (property in schema.properties) {
    dctx.IS_ADDITIONAL = false;
    this.validate(rctx, schema.properties[property], data[property]);
  }
}
