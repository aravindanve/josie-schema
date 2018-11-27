const pointer = require('../utils/pointer');

function create() {
  return {
    refs: [],
    paths: Object.create(null)
  };
}

function setPath(ctx, path, schema) {
  ctx.paths[path] = schema;
}

function pushRef(ctx, parent, key, ref) {
  ctx.refs.push({
    parent,
    key,
    path: ref
  })
}

function resolve(ctx) {
  // TODO: detect cyclic dependencies
  const root = ctx.paths['#'];

  // NOTE: json schema test suite specifies a test
  // like this `{ $ref: '#/definitions/a', definitions: [{ a: ... }]}`
  // and http://json-schema.org/draft-07/json-schema-core.html#rfc.section.8.3
  // states: `All other properties in a "$ref" object MUST be ignored.`
  // not sure how to handle this. so leaving it as is for now.

  // resolve only if root exists
  if (root) {
    // replace $ref schemas with object references
    for (const ref of ctx.refs) {
      if (ref.path in ctx.paths) {
        ref.parent[ref.key] = ctx.paths[ref.path];

      } else if (ref.path.match(/definitions/g)) {
        // OPTIMIZE: memoize seen paths or partial paths
        const reffed = pointer.get(root, ref.path);

        if (reffed !== undefined) {
          ref.parent[ref.key] = reffed;

        } else {
          console.log('1991', { ref });
          throw 'invalid $ref error';
        }

      } else {
        console.log('1995', { ref });
        throw 'invalid $ref error';
      }
    }
  }

  delete ctx.refs;
  delete ctx.paths;
}

module.exports = {
  create,
  setPath,
  pushRef,
  resolve
};
