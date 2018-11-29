module.exports = {
  name: 'propertyNames',
  compile(rctx, sctx, schema) {
    // compile subschema
    this.compile(rctx, schema, 'propertyNames');

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validatePropertyNames);
  }
};

function validatePropertyNames(rctx, sctx, dctx, schema, data, property) {
  this.validate(rctx, schema.propertyNames, property);
}
