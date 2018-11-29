module.exports = {
  name: 'multipleOf',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateMultipleOf);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateMultipleOf);
  }
};

function validateMultipleOf(sctx, fctx, dctx, fragment, data) {
  // NOTE: mod `%` doesn't work properly due to floating point precision
  const result = data / fragment.multipleOf;

  if (result !== parseInt(result)) {
    throw 'multiple of error';
  }
}
