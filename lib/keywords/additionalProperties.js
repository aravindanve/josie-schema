module.exports = {
  name: 'additionalProperties',
  compile(gctx, sctx, schema) {
    // compile subschema
    this.compile(gctx, schema, 'additionalProperties');

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validateAdditionalProperty);
  }
};

function validateAdditionalProperty(gctx, sctx, dctx, schema, data, property) {
  // execute only if property is additional
  if (dctx.IS_ADDITIONAL) {
    this.validate(gctx, schema.additionalProperties, data[property]);
  }
}
