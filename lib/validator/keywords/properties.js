const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  // HACK: set metadata for `properties`
  objectUtil.definePropertiesSimpile(schema.properties, {
    _parent: schema,
    _key: 'properties',
    _path: `${schema._path}/properties`
  });

  // HACK: add path reference to context
  ctx.paths[schema.properties._path] = schema.properties;

  // compile subschemas
  for (const property of Object.keys(schema.properties)) {
    this.compile(ctx, schema.properties, property);
  }

  // use `properties`
  return 'properties';
}

const validate = {
  properties: function (ctx, schema, data, property) {
    // check if property is defined in schema
    if (schema.properties[property] !== undefined) {
      // set additional flag to false
      ctx.additional = false;
      this.validate(schema.properties[property], data);
    }
  }
};

module.exports = {
  name: 'properties',
  locations: ['/childInstance/object/-'],
  compile,
  validate
};
