module.exports = {
  name: 'dependencies',
  compile(gctx, sctx, schema) {
    // define dependency type map
    sctx.DEPENDENCY_TYPE_MAP = new Map();

    // compile subschemas
    const dependentProperties = Object.keys(schema.dependencies);
    for (const dependentProperty of dependentProperties) {
      // check if required or schema dependency
      if (Array.isArray(schema.dependencies[dependentProperty])) {
        // handle required depencency
        sctx.DEPENDENCY_TYPE_MAP.set(dependentProperty, 1);

      } else {
        // handle schema dependency
        sctx.DEPENDENCY_TYPE_MAP.set(dependentProperty, 2);
        this.compile(gctx, schema.dependencies, dependentProperty);
      }
    }

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validateDependencies);
  }
};

function validateDependencies(gctx, sctx, dctx, schema, data, property) {
  const dependencyType = sctx.DEPENDENCY_TYPE_MAP.get(property);

  switch (dependencyType) {
    case undefined: break;
    case 1:
      // required dependency
      const required = schema.dependencies[property];
      if (dctx.DATA_LENGTH < required.length) {
        throw 'required dependency error';
      }

      // check if data has all required properties
      for (const _required of required) {
        if (!Object.prototype.propertyIsEnumerable.call(data, _required)) {
          throw 'required dependency error';
        }
      }
      break;

    case 2:
      // schema dependency
      this.validate(gctx, schema.dependencies[property], data);
      break;
  }
}
