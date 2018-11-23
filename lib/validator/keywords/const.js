const keyString = require('../../utils/keyString');

function compile(path, schema) {
  if (schema.const !== undefined) {
    // pre-compile const
    schema._const = keyString.from(schema.const);
    schema._defineDataKeyString = true;

    // use `const`
    return 'const';
  }

  // skip validation
  return false;
}

const validate = {
  const: function (ctx, schema, data) {
    if (ctx.dataKeyString !== schema._const) {
      throw 'const error';
    }
  }
};

module.exports = {
  name: 'const',
  locations: ['/typeless'],
  compile,
  validate
};
