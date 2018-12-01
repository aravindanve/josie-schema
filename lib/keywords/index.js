module.exports = [
  {
    name: 'definitions',
    compile(schema, refBucket) {
      const entries = schema.ENTRIES.definitions.ENTRIES;
      const keys = Object.keys(entries);
      const length = keys.length;

      // compile subschemas
      for (let i = 0; i < length; i++) {
        this.compile(entries[keys[i]], refBucket);
      }
    }
  },
  {
    name: 'items',
    compile(schema, refBucket) {
      const entries = schema.ENTRIES.items.ENTRIES;

      if (schema.ENTRIES.items.IS_ARRAY) {
        let length = entries.length;

        // compile subschemas
        for (let i = 0; i < length; i++) {
          this.compile(entries[i], refBucket);
        }

      } else {
        // compile subschema
        this.compile(entries, refBucket);
      }
    }
  },
  {
    name: 'properties',
    compile(schema, refBucket) {
      const entries = schema.ENTRIES.properties.ENTRIES;
      const keys = Object.keys(entries);
      const length = keys.length;

      // compile subschemas
      for (let i = 0; i < length; i++) {
        this.compile(entries[keys[i]], refBucket);
      }
    }
  }
];
