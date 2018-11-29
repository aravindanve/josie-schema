module.exports = {
  name: 'oneOf',
  compile(sctx, fctx, fragment) {
    // compile subfragments
    for (let i = 0, l = fragment.oneOf.length; i < l; i++) {
      this.compile(sctx, fragment.oneOf, i);
    }

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateOneOf);
    fctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateOneOf);
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateOneOf);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateOneOf);
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateOneOf);
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateOneOf);
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateOneOf);
  }
};

function validateOneOf(sctx, fctx, dctx, fragment, data) {
  let matched = 0;
  loop:
  for (let i = 0, l = fragment.oneOf.length; i < l; i++) {
    try {
      this.validate(sctx, fragment.oneOf[i], data);

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
