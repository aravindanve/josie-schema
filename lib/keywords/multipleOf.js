module.exports = {
  name: 'multipleOf',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateMultipleOf);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateMultipleOf);
  }
};

function validateMultipleOf(gctx, sctx, dctx, schema, data) {
  // NOTE: mod `%` doesn't work properly due to floating point precision
  const result = data / schema.multipleOf;

  if (result !== parseInt(result)) {
    throw 'multiple of error';
  }
}
