const pointer = require('../utils/pointer');

// this ~ { _names, _locationsOf, multipleOf, maximum, exclus... }
module.exports = function compile(path, schema) {
  // TODO: always and never optimizations, removal of default behaviour
  //       always and never for loop children may be tricky because of additionals
  // TODO: handle and optimize boolean schemas

  // set path meta
  schema._path = path;

  // set schema keywords meta
  schema._keywords = Object.create(null);

  for (const keyword of this._names) {
    if (schema[keyword] !== undefined) {
      const validator = this[keyword](path, schema);

      // continue if no validator is returned
      if (!validator) continue;

      // set validator at locations
      for (const location of this._locationsOf[keyword]) {
        pointer.set(schema._keywords, location, validator);
      }
    }
  }
}
