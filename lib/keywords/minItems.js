module.exports = {
  name: 'minItems',
  compile(rctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateMinItems);
  }
};

function validateMinItems(rctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH < schema.minItems) {
    throw 'min items error';
  }
}
