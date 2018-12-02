const remotes = require('./remotes');
const compiler = require('./compiler');
const pointer = require('./utils/pointer');
const uriParts = require('./utils/uriParts');

module.exports = {
  deref(root) {
    const dereffed = [];
    let refBucket = [];

    // compile known from root
    compiler.compile(root, refBucket);

    // set ref bucket length
    let refBucketLength = refBucket.length;

    // deref
    while (refBucketLength) {
      const nextRefBucket = [];

      for (let i = 0; i < refBucketLength; i++) {
        const schema = refBucket[i];

        // split uri into parts
        const [baseId, ptr] = uriParts(schema.REF);

        // find remote reference
        const remote = remotes.getRemote(baseId);

        // find pointer reference
        const reffed = pointer.find(remote, ptr);

        // compile ref if not compiled
        if (!reffed.IS_COMPILED) {
          compiler.compile(reffed, nextRefBucket);
        }

        // deref
        schema.REFFED = reffed;

        // add to dereffed bucket
        dereffed.push(schema);
      }

      // break if deref complete
      if (!nextRefBucket.length) break;

      // set next ref bucket
      refBucket = nextRefBucket;
      refBucketLength = nextRefBucket.length;
    }

    // return if none dereffed
    if (!dereffed.length) {
      return root;
    }

    // shrink reffed chain
    const dereffedLength = dereffed.length;

    for (let i = 0; i < dereffedLength; i++) {
      const schema = dereffed[i];

      // check circular ref
      if (schema === schema.REFFED) {
        throw new Error(`Circular reference ${schema.REF}`);
      }

      while (schema.REFFED.REFFED) {
        // check circular ref
        if (schema === schema.REFFED.REFFED) {
          throw new Error(`Circular reference ${schema.REF}`);
        }

        // shrink ref
        schema.REFFED = schema.REFFED.REFFED;
      }
    }

    return root;
  }
};
