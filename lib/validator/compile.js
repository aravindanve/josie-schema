const context = require('./context');
const pointer = require('../utils/pointer');

// this ~ { _names, _locationsOf, multipleOf, maximum, exclus... }
module.exports = function compile(ctx, parent = null, key, schema) {
  // TODO: always and never optimizations, removal of default behaviour
  //       always and never for loop children may be tricky because of additionals
  // TODO: handle and optimize boolean schemas

  // coerce schema if not set
  schema = schema || parent[key];

  // set metadata
  schema._parent = parent;
  schema._key = key;
  schema._path = parent ? `${parent._path}/${key}` : key;

  // add path reference to context
  context.setPath(ctx, schema._path, schema);

  // set schema keywords
  schema._keywords = Object.create(null);

  // evaluate `$ref`
  if (typeof schema.$ref === 'string') {
    context.pushRef(ctx, parent, key, ref);
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
}
