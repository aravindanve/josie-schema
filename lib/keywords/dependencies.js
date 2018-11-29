module.exports = {
  name: 'dependencies',
  compile(sctx, fctx, fragment) {
    // define dependency type map
    fctx.DEPENDENCY_TYPE_MAP = new Map();

    // compile subfragments
    const dependentProperties = Object.keys(fragment.dependencies);
    for (const dependentProperty of dependentProperties) {
      // check if required or fragment dependency
      if (Array.isArray(fragment.dependencies[dependentProperty])) {
        // handle required depencency
        fctx.DEPENDENCY_TYPE_MAP.set(dependentProperty, 1);

      } else {
        // handle fragment dependency
        fctx.DEPENDENCY_TYPE_MAP.set(dependentProperty, 2);
        this.compile(sctx, fragment.dependencies, dependentProperty);
      }
    }

    // push validator
    fctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validateDependencies);
  }
};

function validateDependencies(sctx, fctx, dctx, fragment, data, property) {
  const dependencyType = fctx.DEPENDENCY_TYPE_MAP.get(property);

  switch (dependencyType) {
    case undefined: break;
    case 1:
      // required dependency
      const required = fragment.dependencies[property];
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
      // fragment dependency
      this.validate(sctx, fragment.dependencies[property], data);
      break;
  }
}
