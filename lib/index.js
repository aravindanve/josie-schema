/*
 * Josie Schema
 * JSON Schema Tools
 * https://github.com/aravindanve
 *
 */

const validator = require('./validator');
const Builder = require('./builder');

Builder.compile = function (schema) {
  return validator(schema);
}

module.exports = Builder;
