module.exports = {
  name: 'propertyNames',
  compile(gctx, sctx, schema) {
    // compile subschema
    this.compile(gctx, schema, 'propertyNames');

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validatePropertyNames);
  }
};

function validatePropertyNames(gctx, sctx, dctx, schema, data, property) {
  this.validate(gctx, schema.propertyNames, property);
}
