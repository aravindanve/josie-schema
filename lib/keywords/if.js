module.exports = {
  name: 'if',
  compile(rctx, sctx, schema) {
    let validator;
    let variant = 0;

    // compile if subschema
    this.compile(rctx, schema, 'if');

    // compile then subschema
    if ('then' in schema) {
      variant += 1;
      this.compile(rctx, schema, 'then');
    }

    // compile else subschema
    if ('else' in schema) {
      variant += 2;
      this.compile(rctx, schema, 'else');
    }

    // select validator
    switch (variant) {
      case 3:
        validator = validateIfThenElse;
        break;

      case 2:
        validator = validateIfElse;
        break;

      case 1:
        validator = validateIfThen;
        break;
    }

    if (validator) {
      // push validator
      sctx.GET_VALIDATORS_FOR_TYPE['null']
        .push(validator);
      sctx.GET_VALIDATORS_FOR_TYPE['boolean']
        .push(validator);
      sctx.GET_VALIDATORS_FOR_TYPE['number']
        .push(validator);
      sctx.GET_VALIDATORS_FOR_TYPE['integer']
        .push(validator);
      sctx.GET_VALIDATORS_FOR_TYPE['string']
        .push(validator);
      sctx.GET_VALIDATORS_FOR_TYPE['array']
        .push(validator);
      sctx.GET_VALIDATORS_FOR_TYPE['object']
        .push(validator);
    }
  }
};

function validateIfThen(rctx, sctx, dctx, schema, data) {
  try {
    this.validate(rctx, schema.if, data);

  } catch (err) {
    return;
  }

  // then condition
  this.validate(rctx, schema.then, data);
}

function validateIfElse(rctx, sctx, dctx, schema, data) {
  try {
    this.validate(rctx, schema.if, data);

  } catch (err) {
    // else condition
    this.validate(rctx, schema.else, data);
  }
}

function validateIfThenElse(rctx, sctx, dctx, schema, data) {
  try {
    this.validate(rctx, schema.if, data);

  } catch (err) {
    // else condition
    this.validate(rctx, schema.else, data);
    return;
  }

  // then condition
  this.validate(rctx, schema.then, data);
}
