/* NOTE: THE ORDER OF KEYWORDS IS IMPORTANT!
 * because this is the order they will be executed in.
 * for example keywords such as `additionalItems` must
 * come after `properties` and `patternProperties`
 */
module.exports = [
  require('./const'),
  require('./enum'),
  require('./type'),
  require('./not'),
  require('./allOf'),
  require('./anyOf'),
  require('./oneOf'),
  require('./if'),
  require('./multipleOf'),
  require('./maximum'),
  require('./exclusiveMaximum'),
  require('./minimum'),
  require('./exclusiveMinimum'),
  require('./maxLength'),
  require('./minLength'),
  require('./pattern'),
  require('./format'),
  require('./maxItems'),
  require('./minItems'),
  require('./contains'),
  require('./maxProperties'),
  require('./minProperties'),
  require('./required'),
  require('./uniqueItems'),
  require('./items'),
  require('./dependencies'),
  require('./propertyNames'),
  require('./properties'),
  require('./patternProperties'),
  require('./additionalProperties')
];
