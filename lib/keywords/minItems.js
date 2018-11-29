module.exports = {
  name: 'minItems',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateMinItems);
  }
};

function validateMinItems(sctx, fctx, dctx, fragment, data) {
  if (dctx.DATA_LENGTH < fragment.minItems) {
    throw 'min items error';
  }
}
