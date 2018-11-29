module.exports = {
  name: 'maxItems',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateMaxItems);
  }
};

function validateMaxItems(sctx, fctx, dctx, fragment, data) {
  if (dctx.DATA_LENGTH > fragment.maxItems) {
    throw 'max items error';
  }
}
