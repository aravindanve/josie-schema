const url = require('url');

function resolveUri(from, to) {
  return url.resolve(from, to);
}

function resolveBaseUris(parentUris, key, $id) {
  const uris = [];

  for (let i = 0, l = parentUris.length; i < l; i++) {
    const parentUri = parentUris[i];

    if (/#)
    const uri = `${parentUri}/${key}`; // add #/?

    uris.push(uri);
  }

  if ($id) {
    const uri = resolveURI(uris[i - 1]);

    uris.push(uri);
  }

  return uris;
}
