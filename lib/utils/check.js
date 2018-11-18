function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isNonZeroNumber(value) {
  return value !== 0 && isNumber(value);
}

function isPositiveNumber(value) {
  return isNumber(value) && value > 0;
}

function isNegativeNumber(value) {
  return isNumber(value) && value < 0;
}

function isInteger(value) {
  return typeof value === 'number' && value % 1 === 0;
}

function isNonZeroInteger(value) {
  return value !== 0 && isInteger(value);
}

function isPositiveInteger(value) {
  return isInteger(value) && value > 0;
}

function isNegativeInteger(value) {
  return isInteger(value) && value < 0;
}

function isString(value) {
  return typeof value === 'string';
}

function isNonEmptyString(value) {
  return isString(value) && value.length > 0;
}

function isArray(value) {
  return Array.isArray(value);
}

function isNonEmptyArray(value) {
  return isArray(value) && value.length > 0;
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function isNonEmptyObject(value) {
  return isObject(value) && Object.keys(value).length > 0;
}

module.exports = {
  isUndefined,
  isNull,
  isBoolean,
  isNumber,
  isNonZeroNumber,
  isPositiveNumber,
  isNegativeNumber,
  isInteger,
  isNonZeroInteger,
  isPositiveInteger,
  isNegativeInteger,
  isString,
  isNonEmptyString,
  isArray,
  isNonEmptyArray,
  isObject,
  isNonEmptyObject
};
