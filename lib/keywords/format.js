const formats = require('../utils/formats');

module.exports = {
  name: 'format',
  compile(sctx, fctx, fragment) {
    // check if known format
    if (!(fragment.format in formats)) {
      throw new Error(`Unknown format ${fragment.format}`);
    }

    // define format tester
    fctx.IS_FORMAT = formats[fragment.format];

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateFormat);
  }
};

function validateFormat(sctx, fctx, dctx, fragment, data) {
  if (!fctx.IS_FORMAT(data)) {
    throw 'format error';
  }
}
