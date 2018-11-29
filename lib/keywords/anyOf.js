module.exports = {
  name: 'anyOf',
  compile(sctx, fctx, fragment) {
    // compile subfragments
    for (let i = 0, l = fragment.anyOf.length; i < l; i++) {
      this.compile(sctx, fragment.anyOf, i);
    }

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateAnyOf);
    fctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateAnyOf);
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateAnyOf);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateAnyOf);
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateAnyOf);
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateAnyOf);
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateAnyOf);
  }
};

function validateAnyOf(sctx, fctx, dctx, fragment, data) {
  for (let i = 0, l = fragment.anyOf.length; i < l; i++) {
    try {
      this.validate(sctx, fragment.anyOf[i], data);

      // one match, return
      return;

    } catch (err) {}
  }

  // none matched
  throw 'any of error';
}
