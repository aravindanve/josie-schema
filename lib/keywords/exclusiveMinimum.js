module.exports = {
  name: 'exclusiveMinimum',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateExclusiveMinimum);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateExclusiveMinimum);
  }
};

function validateExclusiveMinimum(sctx, fctx, dctx, fragment, data) {
  if (data <= fragment.exclusiveMinimum) {
    throw 'exclusive minimum error';
  }
}
