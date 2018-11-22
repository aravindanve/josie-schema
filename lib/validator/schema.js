module.exports = {
  always() {},

  never() {
    throw 'never error';
  },

  validate(ctx, schema, data) {
    ctx.dataType = typeof data;

    // probe further is type is object
    if (ctx.dataType === 'object') {
      if (data === null) {
        ctx.dataType = 'null';

      } else if (Array.isArray(data)) {
        ctx.dataType = 'array';
      }
    }

    if (schema._keywords.typeless) {
      // iterate through pre-compiled keywords
      for (const keyword of schema._keywords.typeless) {
        validateKeyword[keyword](ctx, schema, data);
      }
    }

    if (schema._keywords.typeful &&
        schema._keywords.typeful[ctx.dataType]) {

      // iterate through pre-compiled keywords for data type
      for (const keyword of schema._keywords.typeful[ctx.dataType]) {
        validateKeyword[keyword](ctx, schema, data);
      }
    }

    if (schema._keywords.loopChildren &&
        schema._keywords.loopChildren[ctx.dataType]) {

      // set data length and data keys if object
      if (ctx.dataType === 'array') {
        ctx.dataLength = data.length;

      } else {
        ctx.dataKeys = Object.keys(data);
        ctx.dataLength = ctx.dataKeys.length;
      }

      // initialize ctx vars
      if (schema.uniqueItems === true) {
        ctx.uniqueItemMap = {};
      }
      if (typeof schema.additionalProperties === 'object' ||
          schema.additionalProperties === true) {
        ctx.additional = true;
      }

      // iterate through object or array children
      for (let childId = 0; childId < ctx.dataLength; childId++) {
        const loopChildren = schema._keywords.loopChildren;
        // iterate through pre-compiled keywords for child
        for (const keyword of loopChildren[ctx.dataType]) {
          validateKeyword[keyword](
            ctx, schema, data[childId], childId);
        }
      }
    }
  }
};
