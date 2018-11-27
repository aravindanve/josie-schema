const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  let useConditional = 0;
  if (schema.then !== undefined) {
    useConditional += 1;

    // HACK: set metadata for `then`
    objectUtil.definePropertiesSimpile(schema.then, {
      _parent: schema,
      _key: 'then',
      _path: `${schema._path}/then`
    });

    // HACK: add path reference to context
    ctx.paths[schema.then._path] = schema.then;

    // compile then schema
    this.compile(ctx, schema, 'then');
  }

  if (schema.else !== undefined) {
    useConditional += 2;

    // HACK: set metadata for `else`
    objectUtil.definePropertiesSimpile(schema.else, {
      _parent: schema,
      _key: 'else',
      _path: `${schema._path}/else`
    });

    // HACK: add path reference to context
    ctx.paths[schema.else._path] = schema.else;

    // compile else schema
    this.compile(ctx, schema, 'else');
  }

  if (useConditional) {
    // HACK: set metadata for `if`
    objectUtil.definePropertiesSimpile(schema.if, {
      _parent: schema,
      _key: 'if',
      _path: `${schema._path}/if`
    });

    // HACK: add path reference to context
    ctx.paths[schema.if._path] = schema.if;

    // compile if schema
    this.compile(ctx, schema, 'if');
  }

  switch (useConditional) {
    case 3:
      // use `ifThenElse`
      return 'ifThenElse';

    case 2:
      // use `ifElse`
      return 'ifElse';

    case 1:
      // use `ifThen`
      return 'ifThen';

    default:
      // skip validation
      return false;
  }
}

const validate = {
  ifThen: function (ctx, schema, data) {
    try {
      this.validate(schema.if, data);

    } catch (err) {
      return;
    }

    // then condition
    this.validate(schema.then, data);
  },

  ifElse: function (ctx, schema, data) {
    try {
      this.validate(schema.if, data);

    } catch (err) {
      // else condition
      this.validate(schema.else, data);
    }
  },

  ifThenElse: function (ctx, schema, data) {
    try {
      this.validate(schema.if, data);

    } catch (err) {
      // else condition
      this.validate(schema.else, data);
      return;
    }

    // then condition
    this.validate(schema.then, data);
  }
};

module.exports = {
  name: 'if',
  locations: ['/typeless/-'],
  compile,
  validate
};
