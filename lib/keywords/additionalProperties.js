module.exports = {
  name: 'additionalProperties',
  compile(rctx, sctx, schema) {
    // compile subschema
    this.compile(rctx, schema, 'additionalProperties');

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validateAdditionalProperty);
  }
};

function validateAdditionalProperty(rctx, sctx, dctx, schema, data, property) {
  // execute only if property is additional
  if (dctx.IS_ADDITIONAL) {
    this.validate(rctx, schema.additionalProperties, data[property]);
  }
}
