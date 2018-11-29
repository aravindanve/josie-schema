const formats = require('../utils/formats');

module.exports = {
  name: 'format',
  compile(rctx, sctx, schema) {
    // check if known format
    if (!(schema.format in formats)) {
      throw new Error(`Unknown format ${schema.format}`);
    }

    // define format tester
    sctx.IS_FORMAT = formats[schema.format];

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateFormat);
  }
};

function validateFormat(rctx, sctx, dctx, schema, data) {
  if (!sctx.IS_FORMAT(data)) {
    throw 'format error';
  }
}
