const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.string()', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().string()),
      JSON.stringify({ type: 'string' }));
  });
});

describe('builder.format(value)', () => {
  it('must set `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().format('email')),
      JSON.stringify({ format: 'email' }));
  });
});

describe('builder.pattern(value)', () => {
  it('must set correct `pattern` on string value', () => {
    assert.strictEqual(
      JSON.stringify(Builder().pattern('^[a-bA-B0-9]{1,25}$')),
      JSON.stringify({ pattern: '^[a-bA-B0-9]{1,25}$' }));
  });

  it('must set correct `pattern` on regex value', () => {
    assert.strictEqual(
      JSON.stringify(Builder().pattern(/^[a-bA-B0-9]{1,25}$/)),
      JSON.stringify({ pattern: '^[a-bA-B0-9]{1,25}$' }));
  });
});

describe('builder.dateTime()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().dateTime()),
      JSON.stringify({ format: 'date-time' }));
  });
});

describe('builder.date()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().date()),
      JSON.stringify({ format: 'date' }));
  });
});

describe('builder.time()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().time()),
      JSON.stringify({ format: 'time' }));
  });
});

describe('builder.email()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().email()),
      JSON.stringify({ format: 'email' }));
  });
});

describe('builder.idnEmail()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().idnEmail()),
      JSON.stringify({ format: 'idn-email' }));
  });
});

describe('builder.hostname()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().hostname()),
      JSON.stringify({ format: 'hostname' }));
  });
});

describe('builder.idnHostname()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().idnHostname()),
      JSON.stringify({ format: 'idn-hostname' }));
  });
});

describe('builder.ipv4()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().ipv4()),
      JSON.stringify({ format: 'ipv4' }));
  });
});

describe('builder.ipv6()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().ipv6()),
      JSON.stringify({ format: 'ipv6' }));
  });
});

describe('builder.uri()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().uri()),
      JSON.stringify({ format: 'uri' }));
  });
});

describe('builder.uriReference()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().uriReference()),
      JSON.stringify({ format: 'uri-reference' }));
  });
});

describe('builder.iri()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().iri()),
      JSON.stringify({ format: 'iri' }));
  });
});

describe('builder.iriReference()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().iriReference()),
      JSON.stringify({ format: 'iri-reference' }));
  });
});

describe('builder.uriTemplate()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().uriTemplate()),
      JSON.stringify({ format: 'uri-template' }));
  });
});

describe('builder.jsonPointer()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().jsonPointer()),
      JSON.stringify({ format: 'json-pointer' }));
  });
});

describe('builder.relativeJsonPointer()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().relativeJsonPointer()),
      JSON.stringify({ format: 'relative-json-pointer' }));
  });
});

describe('builder.regex()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().regex()),
      JSON.stringify({ format: 'regex' }));
  });
});

describe('builder.content(encoding, mediaType)', () => {
  it('must set `contentEncoding` and `contentMediaType`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().content('base64', 'image/png')),
      JSON.stringify({
        contentEncoding: 'base64',
        contentMediaType: 'image/png'
      }));
  });
});

describe('builder.string()...', () => {
  it('must produce valid schema on chaining', () => {
    assert.strictEqual(
      JSON.stringify(Builder()
        .string()
        .email()
        .pattern(/^[a-z][a-z0-9\.]{2,}@/)),
      JSON.stringify({
        type: 'string',
        format: 'email',
        pattern: '^[a-z][a-z0-9\\.]{2,}@'
      }));
  });
});
