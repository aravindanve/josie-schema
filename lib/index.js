/*
 * Josie Schema
 * JSON Schema Tools
 * https://github.com/aravindanve
 *
 * based on json-schema/draft-07
 * see SUPPORT.md for additional information
 *
 */

const validator = require('./validator');
const Builder = require('./builder');

Builder.compile = function (schema) {
  return validator(schema);
}

module.exports = Builder;
