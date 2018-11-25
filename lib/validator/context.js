function create() {
  return {
    refs: Object.create(null),
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
  // replace $ref schemas with object references
  for (const ref of ctx.refs) {
    if (ref.path in ctx.paths) {
      ref.parent[ref.key] = ctx.paths[ref.path];

    } else {
      throw 'invalid $ref error';
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
