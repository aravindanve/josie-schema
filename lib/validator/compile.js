const context = require('./context');
const pointer = require('../utils/pointer');
const objectUtil = require('../utils/object');

// this ~ { _names, _locationsOf, multipleOf, maximum, exclus... }
module.exports = function compile(ctx, parent = null, key, schema) {
  // TODO: optimize boolean schemas with `always` and `never` functions

  // coerce schema if not set
  schema = schema !== undefined ? schema : parent[key];

  // skip boolean schemas
  if (typeof schema === 'boolean') return schema;

  // swap empty schemas with `true`
  if (parent && !Object.keys(schema).length) {
    parent[key] = true;
    return true;
  }

  // set metadata
  const escapedKey = pointer.escapeSegment(key);
  objectUtil.definePropertiesSimpile(schema, {
    _parent: parent,
    _key: key,
    _path: parent ? `${parent._path}/${escapedKey}` : escapedKey,
    _keywords: Object.create(null)
  });

  // add path reference to context
  context.setPath(ctx, schema._path, schema);

  // evaluate `$ref`
  if (typeof schema.$ref === 'string') {
    context.pushRef(ctx, parent, key, schema.$ref);
    return;
  }

  for (const keyword of this._names) {
    if (schema[keyword] !== undefined) {
      const validator = this[keyword](ctx, schema, parent);

      // continue if no validator is returned
      if (!validator) continue;

      // set validator at locations
      for (const location of this._locationsOf[keyword]) {
        pointer.set(schema._keywords, location, validator);
      }
    }
  }

  return schema;
}
