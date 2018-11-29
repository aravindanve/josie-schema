module.exports = function clone(root) {
  // weak map for already cloned nodes
  const clones = new WeakMap();

  // recursive clone
  return (function _clone(node, parent, key) {
    // call toJSON() if exists
    let _node;
    if (node && node.toJSON && typeof node.toJSON === 'function') {
      _node = node;
      node = node.toJSON();
    }

    // handle primitives
    if (typeof node !== 'object' || node === null) {
      if (_node) {
        // set clone for _node
        clones.set(_node, node);
      }

      return node;
    }

    // check if clone exists
    if (clones.has(node)) {
      return clones.get(node);
    }

    // handle arrays
    if (Array.isArray(node)) {
      const nodeClone = [];

      // set clone
      clones.set(_node || node, nodeClone);

      // clone items
      for (let i = 0; i < node.length; i++) {
        nodeClone.push(_clone(node[i]));
      }

      // return clone
      return nodeClone;

    } else {
      const nodeClone = {};

      // set clone
      clones.set(_node || node, nodeClone);

      // clone properties
      for (const key of Object.keys(node)) {
        nodeClone[key] = _clone(node[key]);
      }

      // return clone
      return nodeClone;
    }

  })(root, null, null);
}
