module.exports = function walk(root, onNode) {
  const seen = new WeakMap();

  return (function _walk(parent, key) {
    const node = parent[key];

    onNode && onNode(node, parent, key);




  })({ root }, 'root');
}

walk({
  a: {
    b: {
      c: false
    }
  }

}, (node, parent, key) => {

  return {};
});
