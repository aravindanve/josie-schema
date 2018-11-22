const utils = require('./utils');

module.exports = function compile(path, schema) {
  // TODO: always and never optimizations, removal of default behaviour
  // always and never for loop children may be tricky because of additionals

  // set path meta
  schema._path = path;

  // initialize schema keywords meta
  schema._keywords = {};

  // typeless keywords
  const typeless = [];

  // handle `const`
  if (schema.const !== undefined) {
    typeless.push('const');
  }

  // handle `type`
  if (schema.type && !Array.isArray(schema.type)) {
    if (Array.isArray(schema.type)) {
      // pre-compile type map
      schema._typeMap = schema.type
        .reduce((acc, _type) => (acc[_type] = true, acc), {});

      typeless.push('typeMap');

    } else {
      typeless.push('type');
    }
  }

  // handle `enum`
  if (schema.enum) {
      // pre-compile enum map
    schema._enumMap = schema.enum.reduce((acc, _enum) => (
      acc[utils.asKeyString(_enum)] = true, acc), {});

    typeless.push('enumMap');
  }

  // TODO: allOf, anyOf... and dont forget compile subschemas

  // add typeless keywords to meta
  if (typeless.length) {
    schema._keywords.typeless = typeless;
  }

  // typeful keywords
  const typeful = {};

  // typeful numeric keywords
  const typefulNumeric = [];

  // handle `multipleOf`
  if (schema.multipleOf !== undefined) {
    typefulNumeric.push('multipleOf');
  }

  // handle `maximum`
  if (schema.maximum !== undefined) {
    typefulNumeric.push('maximum');
  }

  // handle `exclusiveMaximum`
  if (schema.exclusiveMaximum !== undefined) {
    typefulNumeric.push('exclusiveMaximum');
  }

  // handle `minimum`
  if (schema.minimum !== undefined) {
    typefulNumeric.push('minimum');
  }

  // handle `exclusiveMinimum`
  if (schema.exclusiveMinimum !== undefined) {
    typefulNumeric.push('exclusiveMinimum');
  }

  // set numeric to typeful keywords
  if (typefulNumeric.length) {
    typeful.number = typefulNumeric;
    typeful.integer = typefulNumeric;
  }

  // typeful array keywords
  const typefulArray = [];

  // handle `maxItems`
  if (schema.maxItems !== undefined) {
    typefulArray.push('maxItems');
  }

  // handle `minItems`
  if (schema.minItems !== undefined) {
    typefulArray.push('minItems');
  }

  // set array to typeful keywords
  if (typefulArray.length) {
    typeful.array = typefulArray;
  }

  // add typeful keywords to meta
  if (Object.keys(typeful).length) {
    schema._keywords.typeful = typeful;
  }

  // loop children keywords
  const loopChildren = {};

  // lc array keywords
  const lcArray = [];

  // handle `uniqueItems`
  if (schema.uniqueItems !== undefined) {
    lcArray.push('uniqueItems');
  }

  // handle `items` and `additionalItems`
  if (schema.items !== undefined) {
    if (Array.isArray(schema.items)) {
      // compile subschemas
      for (let i = 0; i < schema.items.length; i++) {
        // add segment to path and compile subschema
        compile(`${path}/items/${i}`, schema.items[i]);
      }

      // handle `additionalItems`
      if (schema.additionalItems !== undefined &&
          schema.additionalItems !== true) {
        // add segment to path and compile subschema
        compile(`${path}/additionalItems`, schema.additionalItems);

        lcArray.push('itemsArrayWithAdditionalItems');

      } else {
        lcArray.push('itemsArray');
      }

    } else {
      // add segment to path and compile subschema
      compile(`${path}/items`, schema.items);

      lcArray.push('items');
    }
  }

  // handle `contains`
  if (schema.contains !== undefined) {
    // add segment to path and compile subschema
    compile(`${path}/contains`, schema.contains);

    lcArray.push('contains');
  }

  // set array to loop children keywords
  if (lcArray.length) {
    loopChildren.array = lcArray;
  }

  // lc object keywords
  const lcObject = [];

  // handle `propertyNames`
  if (schema.propertyNames !== undefined) {
    // add segment to path and compile subschema
    compile(`${path}/propertyNames`, schema.propertyNames);

    lcObject.push('propertyNames');
  }

  // handle `properties`
  if (schema.properties !== undefined) {
    // compile subschemas
    for (const property of Object.keys(schema.properties)) {
      // add segment to path and compile subschema
      compile(`${path}/properties/${property}`,
        schema.properties[property]);
    }

    lcObject.push('properties');
  }

  // handle `patternProperties`
  if (schema.patternProperties !== undefined) {
      schema._regexPatternProperties = [];

    // compile subschemas
    for (const pattern of Object.keys(schema.patternProperties)) {
      // add segment to path and compile subschema
      compile(`${path}/patternProperties/${pattern}`,
        schema.patternProperties[pattern]);

      // pre-compile array of regexp objects for matching
      schema._regexPatternProperties.push(RegExp(pattern, 'g'));
    }

    lcObject.push('patternProperties');
  }

  // handle `additionalProperties`
  if (schema.additionalProperties !== undefined &&
      schema.additionalProperties !== true) {

      // add segment to path and compile subschema
      compile(`${path}/additionalProperties`,
        schema.additionalProperties);

    lcObject.push('additionalProperties');
  }

  // set object to loop children keywords
  if (lcObject.length) {
    loopChildren.object = lcObject;
  }

  // add loop children keywords to meta
  if (Object.keys(loopChildren).length) {
    schema._keywords.loopChildren = loopChildren;
  }
}
