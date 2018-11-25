function compile(ctx, schema, parent) {
  // TODO: short circuit
  throw 'contains not implemented';
}

const validate = {
  contains: function (ctx, schema, data, i) {
    // TODO: short circuit
    throw 'contains not implemented';
  }
};

module.exports = {
  name: 'contains',
  locations: ['/childInstance/array/-'],
  compile,
  validate
};
