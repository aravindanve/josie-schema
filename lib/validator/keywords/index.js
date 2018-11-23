/* NOTE:
 * The order of keywords is IMPORTANT!
 * This is the order they will be executed in. For example
 * keywords such as `additionalItems` must come after
 * `properties` and `patternProperties`
 */
const keywords = [
  require('./const'),
  require('./enum'),
  require('./type'),
  require('./multipleOf'),
  require('./maximum'),
  require('./exclusiveMaximum'),
  require('./minimum'),
  require('./exclusiveMinimum'),
  require('./maxItems'),
  require('./minItems'),
  require('./maxProperties'),
  require('./minProperties'),
  require('./required'),
  require('./uniqueItems'),
  require('./items'),
  require('./contains'),
  require('./propertyNames'),
  require('./properties'),
  require('./patternProperties'),
  require('./additionalProperties')
];

module.exports = keywords.reduce((acc, keyword) => (
  acc.names.push(keyword.name),
  acc.locationsOf[keyword.name] = keyword.locations,
  acc.compile[keyword.name] = keyword.compile,
  Object.assign(acc.validate, keyword.validate),
  acc), {
    names: [],
    locationsOf: {},
    compile: Object.create(null),
    validate: Object.create(null)
  });
