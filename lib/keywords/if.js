module.exports = {
  name: 'if',
  compile(sctx, fctx, fragment) {
    let validator;
    let variant = 0;

    // compile if subfragment
    this.compile(sctx, fragment, 'if');

    // compile then subfragment
    if ('then' in fragment) {
      variant += 1;
      this.compile(sctx, fragment, 'then');
    }

    // compile else subfragment
    if ('else' in fragment) {
      variant += 2;
      this.compile(sctx, fragment, 'else');
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
      fctx.GET_VALIDATORS_FOR_TYPE['null']
        .push(validator);
      fctx.GET_VALIDATORS_FOR_TYPE['boolean']
        .push(validator);
      fctx.GET_VALIDATORS_FOR_TYPE['number']
        .push(validator);
      fctx.GET_VALIDATORS_FOR_TYPE['integer']
        .push(validator);
      fctx.GET_VALIDATORS_FOR_TYPE['string']
        .push(validator);
      fctx.GET_VALIDATORS_FOR_TYPE['array']
        .push(validator);
      fctx.GET_VALIDATORS_FOR_TYPE['object']
        .push(validator);
    }
  }
};

function validateIfThen(sctx, fctx, dctx, fragment, data) {
  try {
    this.validate(sctx, fragment.if, data);

  } catch (err) {
    return;
  }

  // then condition
  this.validate(sctx, fragment.then, data);
}

function validateIfElse(sctx, fctx, dctx, fragment, data) {
  try {
    this.validate(sctx, fragment.if, data);

  } catch (err) {
    // else condition
    this.validate(sctx, fragment.else, data);
  }
}

function validateIfThenElse(sctx, fctx, dctx, fragment, data) {
  try {
    this.validate(sctx, fragment.if, data);

  } catch (err) {
    // else condition
    this.validate(sctx, fragment.else, data);
    return;
  }

  // then condition
  this.validate(sctx, fragment.then, data);
}
