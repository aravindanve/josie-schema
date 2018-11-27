const stringify = require('../../utils/stringify');
const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  if (Array.isArray(schema.enum)) {
    // pre-compile enum map
    objectUtil.definePropertiesSimpile(schema, {
      _enumMap: Object.create(null),
      ...!schema._defineDataString && { _defineDataString: true }
    });
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
