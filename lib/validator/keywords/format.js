const objectUtil = require('../../utils/object');
const formats = require('../../utils/formats');

function compile(ctx, schema, parent) {
  // check if known format
  if (schema.format in formats) {
    // use `format`
    return 'format';
  }

  throw `unknown format ${schema.format}`;
}

const validate = {
  format: function (ctx, schema, data) {
    if (!formats[schema.format](data)) {
      throw 'format error';
    }
  }
};

module.exports = {
  name: 'format',
  locations: ['/typeful/string/-'],
  compile,
  validate
};
