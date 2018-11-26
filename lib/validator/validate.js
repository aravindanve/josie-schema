const stringify = require('../utils/stringify');

// this ~ { multipleOf, maximum, exclus... }
module.exports = function validate(schema, data) {
  // handle boolean schemas
  if (schema === false) {
    throw 'false error';
  }
  if (schema === true) {
    return;
  }

  // create location context
  const ctx = Object.create(null);

  // set data type
  ctx.dataType = typeof data;

  // resolve `object` and `number` type
  if (ctx.dataType === 'object') {
    if (data === null) {
      ctx.dataType = 'null';

    } else if (Array.isArray(data)) {
      ctx.dataType = 'array';
      ctx.dataLength = data.length;

    } else {
      ctx.dataKeys = Object.keys(data);
      ctx.dataLength = ctx.dataKeys.length;
    }

  } else if (ctx.dataType === 'number') {
    if (Number.isInteger(data)) {
      ctx.dataType = 'integer';
    }
  }

  // OPTIMIZE: define setters in stack from compile
  // define data key string
  if (schema._defineDataString) {
    ctx.dataString = stringify(data);
  }

  // OPTIMIZE: merge the three loops into one or at least two?
  if (schema._keywords.typeless) {
    // iterate through pre-compiled keywords
    for (const keyword of schema._keywords.typeless) {
      this[keyword](ctx, schema, data);
    }
  }

  if (schema._keywords.typeful &&
      schema._keywords.typeful[ctx.dataType]) {

    // iterate through pre-compiled keywords for data type
    for (const keyword of schema._keywords.typeful[ctx.dataType]) {
      this[keyword](ctx, schema, data);
    }
  }

  if (schema._keywords.childInstance &&
      schema._keywords.childInstance[ctx.dataType]) {

    // initialize ctx vars
    if (schema.uniqueItems === true) {
      ctx.uniqueItemMap = Object.create(null);
    }

    // iterate through object or array children
    for (let i = 0; i < ctx.dataLength; i++) {
      const childInstance = schema._keywords.childInstance;
      const key = ctx.dataKeys ? ctx.dataKeys[i] : i;

      // set additional flag for this iteration
      ctx.additional = true;

      // iterate through pre-compiled keywords for child
      for (const keyword of childInstance[ctx.dataType]) {
        this[keyword](ctx, schema, data[key], key);
      }
    }
  }
}
