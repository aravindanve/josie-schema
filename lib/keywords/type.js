module.exports = {
  name: 'type',
  compile(sctx, fctx, fragment) {
    let validator;

    // check if type is an array
    if (Array.isArray(fragment.type)) {
      // define type map
      fctx.TYPE_MAP = new Map();

      // set types
      for (let i = 0, l = fragment.type.length; i < l; i++) {
        fctx.TYPE_MAP.set(fragment.type[i], true);
      }

      // select type map validator
      validator = validateTypeMap;

    } else {
      // select type validator
      validator = validateType;
    }

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
};

function validateType(sctx, fctx, dctx, fragment, data) {
  if (dctx.DATA_TYPE === fragment.type) {
    return;

  } else if (dctx.DATA_TYPE === 'integer' &&
      fragment.type === 'number') {
    return;
  }

  throw 'type error';
}

function validateTypeMap(sctx, fctx, dctx, fragment, data) {
  if (fctx.TYPE_MAP.has(dctx.DATA_TYPE)) {
    return;

  } else if (dctx.DATA_TYPE === 'integer' &&
      fctx.TYPE_MAP.has('number')) {
    return;
  }

  throw 'type map error';
}
