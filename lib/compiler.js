const url = require('url');
const remotes = require('./remotes');
const keywords = require('./keywords');
const jewel = require('./utils/jewel');

const keywordsLength = keywords.length;

module.exports = {
  compile(schema, refBucket) {
    // handle boolean schemas
    if (!(schema && schema.JEWEL === jewel)) {
      return schema;
    }

    // handle compiled schemas
    if (schema.IS_COMPILED) {
      return schema;
    }

    // handle bad edge
    if (schema.IS_ARRAY) {
      throw new Error(`Schema must be an object`);
    }

    // set compiled
    schema.IS_COMPILED = true;

    // get base id
    let baseId;
    let current = schema;

    // find last parent with base id
    while (true) {
      if (!current.PARENT) {
        baseId = current.BASE_ID || '';
        break;

      } else if (current.PARENT.BASE_ID !== undefined) {
        baseId = current.PARENT.BASE_ID;
        break;
      }

      // set current edge
      current = current.PARENT;
    }

    // get entries
    const entries = schema.ENTRIES;

    // resolve $id
    // OPTIMIZE: check ENTRY_KEYS.indexOf('$id') ?
    if ('$id' in entries) {
      schema.BASE_ID = url.resolve(baseId, entries.$id);

      // register remote
      remotes.registerRemote(schema.BASE_ID, schema);

    } else {
      schema.BASE_ID = baseId;
    }

    // resolve $ref
    if ('$ref' in entries) {
      // resolve relative ref against base id
      schema.REF = url.resolve(schema.BASE_ID, entries.$ref);

      // push schema to ref bucket
      refBucket.push(schema);

      // compile no further
      return schema;
    }

    // process keywords in schema
    for (let i = 0; i < keywordsLength; i++) {
      const keyword = keywords[i];

      // compile keyword
      if (keyword.name in entries) {
        keyword.compile.call(this, schema, refBucket);
      }
    }

    // return schema
    return schema;
  }
};
