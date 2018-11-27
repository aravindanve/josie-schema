const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  const dependantProperties = Object.keys(schema.dependencies);

  if (dependantProperties.length) {
    // HACK: set metadata for `patternProperties`
    objectUtil.definePropertiesSimpile(schema.dependencies, {
      _parent: schema,
      _key: 'dependencies',
      _path: `${schema._path}/dependencies`
    });

    // HACK: add path reference to context
    ctx.paths[schema.dependencies._path] = schema.dependencies;

    for (const dependantProperty of dependantProperties) {
      const value = dependantProperties[dependantProperty];

      if (Array.isArray(value)) {
        if (!value.length) {
          // HACK: delete empty required dependency
          delete dependantProperties[dependantProperty];
        }

      } else {
        // compile schema dependency
        this.compile(ctx, schema.dependencies, dependantProperty);
      }
    }

    // use `dependencies`
    return 'dependencies'
  }

  // skip validation
  return false;
}

const validate = {
  dependencies: function (ctx, schema, data) {
    // OPTIMIZE: move to in-loop, requires access to parent data

    for (const property of ctx.dataKeys) {
      if (property in schema.dependencies) {
        if (Array.isArray(schema.dependencies[property])) {
          for (const dependency of schema.dependencies[property]) {
            if (!(dependency in data)) {
              throw 'required dependency error';
            }
          }

        } else {
          this.validate(schema.dependencies[property], data);
        }
      }
    }
  }
};

module.exports = {
  name: 'dependencies',
  locations: ['/typeful/object/-'],
  compile,
  validate
};
