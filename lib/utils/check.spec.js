const check = require('./check');
const { assert } = require('chai');

describe('check.isUndefined(value)', () => {
  it('must return `true` for `undefined`', () => {
    assert.strictEqual(check.isUndefined(undefined), true);
  });

  it('must return `false` for non undefined values', () => {
    assert.strictEqual(check.isUndefined(null), false);
    assert.strictEqual(check.isUndefined(true), false);
    assert.strictEqual(check.isUndefined(false), false);
    assert.strictEqual(check.isUndefined(0), false);
    assert.strictEqual(check.isUndefined(1), false);
    assert.strictEqual(check.isUndefined(-10), false);
    assert.strictEqual(check.isUndefined('Hello sailor!'), false);
    assert.strictEqual(check.isUndefined({}), false);
    assert.strictEqual(check.isUndefined([]), false);
  });
});

describe('check.isNull(value)', () => {
  it('must return `true` for `null`', () => {
    assert.strictEqual(check.isNull(null), true);
  });

  it('must return `false` for non null values', () => {
    assert.strictEqual(check.isNull(undefined), false);
    assert.strictEqual(check.isNull(true), false);
    assert.strictEqual(check.isNull(false), false);
    assert.strictEqual(check.isNull(0), false);
    assert.strictEqual(check.isNull(1), false);
    assert.strictEqual(check.isNull(-10), false);
    assert.strictEqual(check.isNull('Hello sailor!'), false);
    assert.strictEqual(check.isNull({}), false);
    assert.strictEqual(check.isNull([]), false);
  });
});

describe('check.isBoolean(value)', () => {
  it('must return `true` for boolean values', () => {
    assert.strictEqual(check.isBoolean(true), true);
    assert.strictEqual(check.isBoolean(false), true);
  });

  it('must return `false` for non boolean values', () => {
    assert.strictEqual(check.isBoolean(undefined), false);
    assert.strictEqual(check.isBoolean(null), false);
    assert.strictEqual(check.isBoolean(0), false);
    assert.strictEqual(check.isBoolean(1), false);
    assert.strictEqual(check.isBoolean(-10), false);
    assert.strictEqual(check.isBoolean('true'), false);
    assert.strictEqual(check.isBoolean('false'), false);
    assert.strictEqual(check.isBoolean({}), false);
    assert.strictEqual(check.isBoolean([]), false);
  });
});

describe('check.isNumber(value)', () => {
  it('must return `true` for numeric values', () => {
    assert.strictEqual(check.isNumber(0), true);
    assert.strictEqual(check.isNumber(-10), true);
    assert.strictEqual(check.isNumber(42.424), true);
  });

  it('must return `false` for non numeric values', () => {
    assert.strictEqual(check.isNumber(undefined), false);
    assert.strictEqual(check.isNumber(null), false);
    assert.strictEqual(check.isNumber(true), false);
    assert.strictEqual(check.isNumber(false), false);
    assert.strictEqual(check.isNumber('0'), false);
    assert.strictEqual(check.isNumber('-10'), false);
    assert.strictEqual(check.isNumber('42.424'), false);
    assert.strictEqual(check.isNumber({}), false);
    assert.strictEqual(check.isNumber([]), false);
  });
});

describe('check.isNonZeroNumber(value)', () => {
  it('must return `true` for non zero numeric values', () => {
    assert.strictEqual(check.isNonZeroNumber(-10), true);
    assert.strictEqual(check.isNonZeroNumber(42.424), true);
  });

  it('must return `false` for `0` or non numeric values', () => {
    assert.strictEqual(check.isNonZeroNumber(0), false);
    assert.strictEqual(check.isNonZeroNumber(undefined), false);
    assert.strictEqual(check.isNonZeroNumber(null), false);
    assert.strictEqual(check.isNonZeroNumber(true), false);
    assert.strictEqual(check.isNonZeroNumber(false), false);
    assert.strictEqual(check.isNonZeroNumber('0'), false);
    assert.strictEqual(check.isNonZeroNumber('-10'), false);
    assert.strictEqual(check.isNonZeroNumber('42.424'), false);
    assert.strictEqual(check.isNonZeroNumber({}), false);
    assert.strictEqual(check.isNonZeroNumber([]), false);
  });
});

describe('check.isPositiveNumber(value)', () => {
  it('must return `true` for positive numeric values', () => {
    assert.strictEqual(check.isPositiveNumber(10), true);
    assert.strictEqual(check.isPositiveNumber(42.424), true);
  });

  it('must return `false` for non positive numeric values', () => {
    assert.strictEqual(check.isPositiveNumber(0), false);
    assert.strictEqual(check.isPositiveNumber(-10), false);
    assert.strictEqual(check.isPositiveNumber(undefined), false);
    assert.strictEqual(check.isPositiveNumber(null), false);
    assert.strictEqual(check.isPositiveNumber(true), false);
    assert.strictEqual(check.isPositiveNumber(false), false);
    assert.strictEqual(check.isPositiveNumber('0'), false);
    assert.strictEqual(check.isPositiveNumber('-10'), false);
    assert.strictEqual(check.isPositiveNumber('42.424'), false);
    assert.strictEqual(check.isPositiveNumber({}), false);
    assert.strictEqual(check.isPositiveNumber([]), false);
  });
});

describe('check.isNegativeNumber(value)', () => {
  it('must return `true` for negative numeric values', () => {
    assert.strictEqual(check.isNegativeNumber(-10), true);
    assert.strictEqual(check.isNegativeNumber(-42.424), true);
  });

  it('must return `false` for non negative numeric values', () => {
    assert.strictEqual(check.isNegativeNumber(0), false);
    assert.strictEqual(check.isNegativeNumber(10), false);
    assert.strictEqual(check.isNegativeNumber(undefined), false);
    assert.strictEqual(check.isNegativeNumber(null), false);
    assert.strictEqual(check.isNegativeNumber(true), false);
    assert.strictEqual(check.isNegativeNumber(false), false);
    assert.strictEqual(check.isNegativeNumber('0'), false);
    assert.strictEqual(check.isNegativeNumber('-10'), false);
    assert.strictEqual(check.isNegativeNumber('42.424'), false);
    assert.strictEqual(check.isNegativeNumber({}), false);
    assert.strictEqual(check.isNegativeNumber([]), false);
  });
});

describe('check.isInteger(value)', () => {
  it('must return `true` for integer values', () => {
    assert.strictEqual(check.isInteger(0), true);
    assert.strictEqual(check.isInteger(-10), true);
    assert.strictEqual(check.isInteger(42), true);
  });

  it('must return `false` for non integer values', () => {
    assert.strictEqual(check.isInteger(0.325), false);
    assert.strictEqual(check.isInteger(-0.8), false);
    assert.strictEqual(check.isInteger(-10.5), false);
    assert.strictEqual(check.isInteger(42.1), false);
    assert.strictEqual(check.isInteger(undefined), false);
    assert.strictEqual(check.isInteger(null), false);
    assert.strictEqual(check.isInteger(true), false);
    assert.strictEqual(check.isInteger(false), false);
    assert.strictEqual(check.isInteger('0'), false);
    assert.strictEqual(check.isInteger('-10'), false);
    assert.strictEqual(check.isInteger('42.424'), false);
    assert.strictEqual(check.isInteger({}), false);
    assert.strictEqual(check.isInteger([]), false);
  });
});

describe('check.isNonZeroInteger(value)', () => {
  it('must return `true` for non zero integer values', () => {
    assert.strictEqual(check.isNonZeroInteger(-10), true);
    assert.strictEqual(check.isNonZeroInteger(42), true);
  });

  it('must return `false` for `0` or non integer values', () => {
    assert.strictEqual(check.isNonZeroInteger(0), false);
    assert.strictEqual(check.isNonZeroInteger(0.325), false);
    assert.strictEqual(check.isNonZeroInteger(-0.8), false);
    assert.strictEqual(check.isNonZeroInteger(-10.5), false);
    assert.strictEqual(check.isNonZeroInteger(42.1), false);
    assert.strictEqual(check.isNonZeroInteger(undefined), false);
    assert.strictEqual(check.isNonZeroInteger(null), false);
    assert.strictEqual(check.isNonZeroInteger(true), false);
    assert.strictEqual(check.isNonZeroInteger(false), false);
    assert.strictEqual(check.isNonZeroInteger('0'), false);
    assert.strictEqual(check.isNonZeroInteger('-10'), false);
    assert.strictEqual(check.isNonZeroInteger('42.424'), false);
    assert.strictEqual(check.isNonZeroInteger({}), false);
    assert.strictEqual(check.isNonZeroInteger([]), false);
  });
});

describe('check.isPositiveInteger(value)', () => {
  it('must return `true` for positive integer values', () => {
    assert.strictEqual(check.isPositiveInteger(10), true);
    assert.strictEqual(check.isPositiveInteger(42), true);
  });

  it('must return `false` for non positive integer values', () => {
    assert.strictEqual(check.isPositiveInteger(0), false);
    assert.strictEqual(check.isPositiveInteger(-10), false);
    assert.strictEqual(check.isPositiveInteger(0.325), false);
    assert.strictEqual(check.isPositiveInteger(-0.8), false);
    assert.strictEqual(check.isPositiveInteger(-10.5), false);
    assert.strictEqual(check.isPositiveInteger(42.1), false);
    assert.strictEqual(check.isPositiveInteger(undefined), false);
    assert.strictEqual(check.isPositiveInteger(null), false);
    assert.strictEqual(check.isPositiveInteger(true), false);
    assert.strictEqual(check.isPositiveInteger(false), false);
    assert.strictEqual(check.isPositiveInteger('0'), false);
    assert.strictEqual(check.isPositiveInteger('-10'), false);
    assert.strictEqual(check.isPositiveInteger('42.424'), false);
    assert.strictEqual(check.isPositiveInteger({}), false);
    assert.strictEqual(check.isPositiveInteger([]), false);
  });
});

describe('check.isNegativeInteger(value)', () => {
  it('must return `true` for negative integer values', () => {
    assert.strictEqual(check.isNegativeInteger(-10), true);
    assert.strictEqual(check.isNegativeInteger(-42), true);
  });

  it('must return `false` for non negative integer values', () => {
    assert.strictEqual(check.isNegativeInteger(0), false);
    assert.strictEqual(check.isNegativeInteger(42), false);
    assert.strictEqual(check.isNegativeInteger(0.325), false);
    assert.strictEqual(check.isNegativeInteger(-0.8), false);
    assert.strictEqual(check.isNegativeInteger(-10.5), false);
    assert.strictEqual(check.isNegativeInteger(42.1), false);
    assert.strictEqual(check.isNegativeInteger(undefined), false);
    assert.strictEqual(check.isNegativeInteger(null), false);
    assert.strictEqual(check.isNegativeInteger(true), false);
    assert.strictEqual(check.isNegativeInteger(false), false);
    assert.strictEqual(check.isNegativeInteger('0'), false);
    assert.strictEqual(check.isNegativeInteger('-10'), false);
    assert.strictEqual(check.isNegativeInteger('42.424'), false);
    assert.strictEqual(check.isNegativeInteger({}), false);
    assert.strictEqual(check.isNegativeInteger([]), false);
  });
});

describe('check.isString(value)', () => {
  it('must return `true` for string values', () => {
    assert.strictEqual(check.isString(''), true);
    assert.strictEqual(check.isString('hello'), true);
    assert.strictEqual(check.isString('Hello sailor!'), true);
    assert.strictEqual(check.isString('42.424'), true);
  });

  it('must return `false` for non string values', () => {
    assert.strictEqual(check.isString(undefined), false);
    assert.strictEqual(check.isString(null), false);
    assert.strictEqual(check.isString(true), false);
    assert.strictEqual(check.isString(false), false);
    assert.strictEqual(check.isString(0), false);
    assert.strictEqual(check.isString(1), false);
    assert.strictEqual(check.isString(-10), false);
    assert.strictEqual(check.isString({}), false);
    assert.strictEqual(check.isString([]), false);
  });
});

describe('check.isNonEmptyString(value)', () => {
  it('must return `true` for non empty string values', () => {
    assert.strictEqual(check.isNonEmptyString('hello'), true);
    assert.strictEqual(check.isNonEmptyString('Hello sailor!'), true);
    assert.strictEqual(check.isNonEmptyString('42.424'), true);
  });

  it('must return `false` for empty or non string values', () => {
    assert.strictEqual(check.isNonEmptyString(''), false);
    assert.strictEqual(check.isNonEmptyString(undefined), false);
    assert.strictEqual(check.isNonEmptyString(null), false);
    assert.strictEqual(check.isNonEmptyString(true), false);
    assert.strictEqual(check.isNonEmptyString(false), false);
    assert.strictEqual(check.isNonEmptyString(0), false);
    assert.strictEqual(check.isNonEmptyString(1), false);
    assert.strictEqual(check.isNonEmptyString(-10), false);
    assert.strictEqual(check.isNonEmptyString({}), false);
    assert.strictEqual(check.isNonEmptyString([]), false);
  });
});

describe('check.isArray(value)', () => {
  it('must return `true` for array values', () => {
    assert.strictEqual(check.isArray([]), true);
    assert.strictEqual(check.isArray(['hello']), true);
    assert.strictEqual(check.isArray([1, 2, 3]), true);
    assert.strictEqual(check.isArray([{}]), true);
  });

  it('must return `false` for non array values', () => {
    assert.strictEqual(check.isArray(undefined), false);
    assert.strictEqual(check.isArray(null), false);
    assert.strictEqual(check.isArray(true), false);
    assert.strictEqual(check.isArray(false), false);
    assert.strictEqual(check.isArray(0), false);
    assert.strictEqual(check.isArray(1), false);
    assert.strictEqual(check.isArray(-10), false);
    assert.strictEqual(check.isArray('hello'), false);
    assert.strictEqual(check.isArray('42.424'), false);
    assert.strictEqual(check.isArray({}), false);
  });
});

describe('check.isNonEmptyArray(value)', () => {
  it('must return `true` for non empty array values', () => {
    assert.strictEqual(check.isNonEmptyArray(['hello']), true);
    assert.strictEqual(check.isNonEmptyArray([1, 2, 3]), true);
    assert.strictEqual(check.isNonEmptyArray([{}]), true);
  });

  it('must return `false` for empty or non array values', () => {
    assert.strictEqual(check.isNonEmptyArray([]), false);
    assert.strictEqual(check.isNonEmptyArray(undefined), false);
    assert.strictEqual(check.isNonEmptyArray(null), false);
    assert.strictEqual(check.isNonEmptyArray(true), false);
    assert.strictEqual(check.isNonEmptyArray(false), false);
    assert.strictEqual(check.isNonEmptyArray(0), false);
    assert.strictEqual(check.isNonEmptyArray(1), false);
    assert.strictEqual(check.isNonEmptyArray(-10), false);
    assert.strictEqual(check.isNonEmptyArray('hello'), false);
    assert.strictEqual(check.isNonEmptyArray('42.424'), false);
    assert.strictEqual(check.isNonEmptyArray({}), false);
  });
});

describe('check.isObject(value)', () => {
  it('must return `true` for object values', () => {
    assert.strictEqual(check.isObject({}), true);
    assert.strictEqual(check.isObject([]), true);
    assert.strictEqual(check.isObject({ name: 'Josie' }), true);
    assert.strictEqual(check.isObject(/[abc]+/), true);
  });

  it('must return `false` for non object values', () => {
    assert.strictEqual(check.isObject(undefined), false);
    assert.strictEqual(check.isObject(null), false);
    assert.strictEqual(check.isObject(true), false);
    assert.strictEqual(check.isObject(false), false);
    assert.strictEqual(check.isObject(0), false);
    assert.strictEqual(check.isObject(1), false);
    assert.strictEqual(check.isObject(-10), false);
    assert.strictEqual(check.isObject('hello'), false);
    assert.strictEqual(check.isObject('42.424'), false);
  });
});

describe('check.isNonEmptyObject(value)', () => {
  it('must return `true` for non empty object values', () => {
    assert.strictEqual(check.isNonEmptyObject({ name: 'Josie' }), true);
  });

  it('must return `false` for empty or non object values', () => {
    assert.strictEqual(check.isNonEmptyObject(/[abc]+/), false);
    assert.strictEqual(check.isNonEmptyObject({}), false);
    assert.strictEqual(check.isNonEmptyObject([]), false);
    assert.strictEqual(check.isNonEmptyObject(undefined), false);
    assert.strictEqual(check.isNonEmptyObject(null), false);
    assert.strictEqual(check.isNonEmptyObject(true), false);
    assert.strictEqual(check.isNonEmptyObject(false), false);
    assert.strictEqual(check.isNonEmptyObject(0), false);
    assert.strictEqual(check.isNonEmptyObject(1), false);
    assert.strictEqual(check.isNonEmptyObject(-10), false);
    assert.strictEqual(check.isNonEmptyObject('hello'), false);
    assert.strictEqual(check.isNonEmptyObject('42.424'), false);
  });
});

describe('check.isTypeString(value)', () => {
  it('must return `true` for valid type strings', () => {
    assert.strictEqual(check.isTypeString('null'), true);
    assert.strictEqual(check.isTypeString('boolean'), true);
    assert.strictEqual(check.isTypeString('number'), true);
    assert.strictEqual(check.isTypeString('integer'), true);
    assert.strictEqual(check.isTypeString('string'), true);
    assert.strictEqual(check.isTypeString('array'), true);
    assert.strictEqual(check.isTypeString('object'), true);
  });

  it('must return `false` for invalid type strings', () => {
    assert.strictEqual(check.isTypeString(null), false);
    assert.strictEqual(check.isTypeString(true), false);
    assert.strictEqual(check.isTypeString(42.34), false);
    assert.strictEqual(check.isTypeString(10), false);
    assert.strictEqual(check.isTypeString('bad-type'), false);
    assert.strictEqual(check.isTypeString([]), false);
    assert.strictEqual(check.isTypeString({}), false);
  });
});

describe('check.isFormatString(value)', () => {
  it('must return `true` for valid type strings', () => {
    assert.strictEqual(check.isFormatString('date-time'), true);
    assert.strictEqual(check.isFormatString('date'), true);
    assert.strictEqual(check.isFormatString('time'), true);
    assert.strictEqual(check.isFormatString('email'), true);
    assert.strictEqual(check.isFormatString('hostname'), true);
    assert.strictEqual(check.isFormatString('ipv4'), true);
    assert.strictEqual(check.isFormatString('ipv6'), true);
    assert.strictEqual(check.isFormatString('uri'), true);
    assert.strictEqual(check.isFormatString('uri-reference'), true);
    assert.strictEqual(check.isFormatString('uri-template'), true);
    assert.strictEqual(check.isFormatString('regex'), true);
  });

  it('must return `false` for invalid type strings', () => {
    assert.strictEqual(check.isFormatString('bad-format'), false);
    assert.strictEqual(check.isFormatString(null), false);
    assert.strictEqual(check.isFormatString(true), false);
    assert.strictEqual(check.isFormatString(42.34), false);
    assert.strictEqual(check.isFormatString(10), false);
    assert.strictEqual(check.isFormatString([]), false);
    assert.strictEqual(check.isFormatString({}), false);
  });
});
