module.exports = function clone(root, onChildNode = undefined) {
  // weak map for already cloned nodes
  const clones = new WeakMap();

  // recursive clone
  return (function _clone(node, parent, key) {
    // handle primitives
    if (typeof node !== 'object' || node === null) {
      return node;
    }

    // check if clone exists
    if (clones.has(node)) {
      return clones.get(node);
    }

    // call toJSON() if exists
    let _node;
    // if (typeof node.toJSON === 'function') {
    //   _node = node;
    //   node = node.toJSON();
    // }

    // handle arrays
    if (Array.isArray(node)) {
      const nodeClone = [];

      // set clones
      clones.set(_node || node, nodeClone);

      // clone items
      for (let i = 0; i < node.length; i++) {
        const itemClone = _clone(node[i]);

        // push item clone
        nodeClone.push(itemClone);

        // call child node listener
        onChildNode && onChildNode(itemClone, {
          parentOriginal: _node || node,
          parent: nodeClone,
          key: i
        });
      }

      // return clone
      return nodeClone;

    } else {
      const nodeClone = {};

      // set clones
      clones.set(_node || node, nodeClone);

      // clone properties
      for (const key of Object.keys(node)) {
        const propClone = _clone(node[key]);

        // set property clone
        nodeClone[key] = propClone;

        // call child node listener
        onChildNode && onChildNode(propClone, {
          parentOriginal: _node || node,
          parent: nodeClone,
          key
        });
      }

      // return clone
      return nodeClone;
    }

  })(root, null, null);
}
