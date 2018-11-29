module.exports = {
  name: 'allOf',
  compile(sctx, fctx, fragment) {
    // compile subfragments
    for (let i = 0, l = fragment.allOf.length; i < l; i++) {
      this.compile(sctx, fragment.allOf, i);
    }

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateAllOf);
    fctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateAllOf);
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateAllOf);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateAllOf);
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateAllOf);
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateAllOf);
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateAllOf);
  }
};

function validateAllOf(sctx, fctx, dctx, fragment, data) {
  for (let i = 0, l = fragment.allOf.length; i < l; i++) {
    this.validate(sctx, fragment.allOf[i], data);
  }
}
