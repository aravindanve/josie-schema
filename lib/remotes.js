module.exports = {
  remoteMap: new Map(),
  registerRemote(uri, schema) {
    if (this.remoteMap.has(uri)) {
      throw new Error(`Duplicate URI ${uri}`);
    }

    const root = schema.ROOT;

    // push uri to root
    root.REMOTES = schema.ROOT.REMOTES || [];
    root.ROOT.REMOTES.push(uri);

    // register remote
    this.remoteMap.set(uri, schema);
  },

  getRemote(uri) {
    if (this.remoteMap.has(uri)) {
      return this.remoteMap.get(uri);
    }

    throw new Error(`Unknown reference ${ref}`);
  },

  clearRemotes(schema) {
    const root = schema.ROOT;

    // return if no remotes found
    if (!('REMOTES' in root)) return;

    // remove all remotes
    const remotes = root.REMOTES;
    const length = remotes.length;

    for (let i = 0; i < length; i++) {
      this.remoteMap.delete(remotes[i]);
    }
  }
};
