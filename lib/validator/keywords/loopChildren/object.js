// this ~ { validate() }
module.exports = {
  propertyNames(ctx, schema, data, property) {
    if (schema.propertyNames !== false) { // TODO: short circuit
      // validate property against property names schema
      this.validate(schema.propertyNames, property);

    } else {
      // throw error
      throw 'property names error';
    }
  },

  properties: function (ctx, schema, data, property) {
    // check if property is defined in schema
    if (schema.properties[property]) {
      // set additional flag to false
      ctx.additional = false;

      // validate data against property schema
      this.validate(schema.properties[property], data);
    }
  },

  patternProperties: function (ctx, schema, data, property) {
    // loop through pre-compiled regex patterns
    for (const pattern of schema._regexPatternProperties) {
      // check pattern against property
      if (property.match(pattern)) {
        // set additional flag to false
        ctx.additional = false;

        // validate data against pattern property schema
        this.validate(schema.patternProperties[pattern.source], data);
      }
    }
  },

  additionalProperties(ctx, schema, data, property) {
    // execute only if property additional
    if (ctx.additional) {
      // check if additional properties schema is set
      if (schema.additionalProperties !== false) {
        // validate data against additional properties schema
        this.validate(schema.additionalProperties, data);

      } else {
        // throw error
        throw 'additional properties error';
      }
    }
  }
};
