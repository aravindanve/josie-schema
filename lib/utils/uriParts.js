module.exports = function uriParts(uri) {
  const parts = uri.split(/#\//);

  parts[1] = parts[1] || '';
  parts[1] = '#/' + parts[1];

  return parts;
}
