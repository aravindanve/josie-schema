const compile = require('./compile');
const validate = require('./validate');
const keywords = require('./keywords');

const vtor = {
  compile,
  validate,
  ...keywords
};

class CompiledSchema {
  constructor(schema) {
    Object.defineProperties(this, {
      _schema: {
        configurable: false,
        writable: false,
        value: schema
      }
    });
  }

  validate(data) {
    vtor.validate(this._schema, data);
  }
}

module.exports = function compiledSchemaFactory(schema) {
  // TODO: validate schema against meta-schema
  const schemaClone = JSON.parse(JSON.stringify(schema));
  const compiledSchema = vtor.compile(schemaClone);

  return new CompiledSchema(compiledSchema);
}
