module.exports = {
  name: 'required',
  compile(sctx, fctx, fragment) {
    // define required length
    fctx.REQUIRED_LENGTH = fragment.required.length;

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateRequired);
  }
};

function validateRequired(sctx, fctx, dctx, fragment, data) {
  // check if data length is less than required length
  if (dctx.DATA_LENGTH < fctx.REQUIRED_LENGTH) {
    throw 'required error';
  }

  // check if data has all required properties
  for (const property of fragment.required) {
    if (!Object.prototype.propertyIsEnumerable.call(data, property)) {
      throw 'required error';
    }
  }
}
