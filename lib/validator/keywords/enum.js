const keyString = require('../../utils/keyString');

function compile(path, schema) {
  if (Array.isArray(schema.enum)) {
    // pre-compile enum map
    schema._enumMap = Object.create(null);
    schema._defineDataKeyString = true;
    for (const _enum of schema.enum) {
      schema._enumMap[keyString.from(_enum)] = true;
    }

    // use `enumMap`
    return 'enumMap';
  }

  // skip validation
  return false;
}

const validate = {
  enumMap: function (ctx, schema, data) {
    if (!schema._enumMap[ctx.dataKeyString]) {
      throw 'enum map error';
    }
  }
};

module.exports = {
  name: 'enum',
  locations: ['/typeless'],
  compile,
  validate
};
