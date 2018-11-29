module.exports = {
  name: 'exclusiveMaximum',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateExclusiveMaximum);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateExclusiveMaximum);
  }
};

function validateExclusiveMaximum(sctx, fctx, dctx, fragment, data) {
  if (data >= fragment.exclusiveMaximum) {
    throw 'exclusive maximum error';
  }
}
