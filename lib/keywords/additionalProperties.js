module.exports = {
  name: 'additionalProperties',
  compile(sctx, fctx, fragment) {
    // compile subfragment
    this.compile(sctx, fragment, 'additionalProperties');

    // push validator
    fctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validateAdditionalProperty);
  }
};

function validateAdditionalProperty(sctx, fctx, dctx, fragment, data, property) {
  // execute only if property is additional
  if (dctx.IS_ADDITIONAL) {
    this.validate(sctx, fragment.additionalProperties, data[property]);
  }
}
