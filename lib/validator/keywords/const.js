const stringify = require('../../utils/stringify');

function compile(ctx, schema, parent) {
  if (schema.const !== undefined) {
    // pre-compile const
    schema._const = stringify(schema.const);
    schema._defineDataString = true;

    // use `const`
    return 'const';
  }

  // skip validation
  return false;
}

const validate = {
  const: function (ctx, schema, data) {
    if (ctx.dataString !== schema._const) {
      throw 'const error';
    }
  }
};

module.exports = {
  name: 'const',
  locations: ['/typeless/-'],
  compile,
  validate
};
