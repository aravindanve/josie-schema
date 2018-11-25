const stringify = require('../../utils/stringify');

function compile(ctx, schema, parent) {
  if (Array.isArray(schema.enum)) {
    // pre-compile enum map
    schema._enumMap = Object.create(null);
    schema._defineDataString = true;
    for (const _enum of schema.enum) {
      schema._enumMap[stringify(_enum)] = true;
    }

    // use `enumMap`
    return 'enumMap';
  }

  // skip validation
  return false;
}

const validate = {
  enumMap: function (ctx, schema, data) {
    if (!schema._enumMap[ctx.dataString]) {
      throw 'enum map error';
    }
  }
};

module.exports = {
  name: 'enum',
  locations: ['/typeless/-'],
  compile,
  validate
};
