module.exports = {
  name: 'required',
  compile(gctx, sctx, schema) {
    // define required length
    sctx.REQUIRED_LENGTH = schema.required.length;

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateRequired);
  }
};

function validateRequired(gctx, sctx, dctx, schema, data) {
  // check if data length is less than required length
  if (dctx.DATA_LENGTH < sctx.REQUIRED_LENGTH) {
    throw 'required error';
  }

  // check if data has all required properties
  for (const property of schema.required) {
    if (!Object.prototype.propertyIsEnumerable.call(data, property)) {
      throw 'required error';
    }
  }
}
