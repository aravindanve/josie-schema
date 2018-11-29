module.exports = {
  name: 'oneOf',
  compile(rctx, sctx, schema) {
    // compile subschemas
    for (let i = 0, l = schema.oneOf.length; i < l; i++) {
      this.compile(rctx, schema.oneOf, i);
    }

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateOneOf);
    sctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateOneOf);
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateOneOf);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateOneOf);
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateOneOf);
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateOneOf);
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateOneOf);
  }
};

function validateOneOf(rctx, sctx, dctx, schema, data) {
  let matched = 0;
  loop:
  for (let i = 0, l = schema.oneOf.length; i < l; i++) {
    try {
      this.validate(rctx, schema.oneOf[i], data);

    } catch (err) {
      continue loop;
    }

    // more than one match
    if (++matched > 1) {
      throw 'one of error';
    }
  }

  // exactly one did not match
  if (matched !== 1) {
    throw 'one of error';
  }
}
