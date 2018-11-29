module.exports = {
  name: 'maxItems',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateMaxItems);
  }
};

function validateMaxItems(gctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH > schema.maxItems) {
    throw 'max items error';
  }
}
