const Builder = require('../Builder');
const TypeString = require('../../constants/TypeString');
const FormatString = require('../../constants/FormatString');
const { assert } = require('chai');

describe('builder.string()', () => {
  it('must set correct `type`', () => {
    assert.equal(
      JSON.stringify(Builder().string()),
      JSON.stringify({ type: TypeString.STRING }));
  });
});

describe('builder.format(value)', () => {
  it('must set `format`', () => {
    assert.equal(
      JSON.stringify(Builder().format(FormatString.EMAIL)),
      JSON.stringify({ format: FormatString.EMAIL }));
  });
});

describe('builder.pattern(value)', () => {
  it('must set correct `pattern` on string value', () => {
    assert.equal(
      JSON.stringify(Builder().pattern('^[a-bA-B0-9]{1,25}$')),
      JSON.stringify({ pattern: '^[a-bA-B0-9]{1,25}$' }));
  });

  it('must set correct `pattern` on regex value', () => {
    assert.equal(
      JSON.stringify(Builder().pattern(/^[a-bA-B0-9]{1,25}$/)),
      JSON.stringify({ pattern: '^[a-bA-B0-9]{1,25}$' }));
  });
});

describe('builder.dateTime()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().dateTime()),
      JSON.stringify({ format: FormatString.DATE_TIME }));
  });
});

describe('builder.date()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().date()),
      JSON.stringify({ format: FormatString.DATE }));
  });
});

describe('builder.time()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().time()),
      JSON.stringify({ format: FormatString.TIME }));
  });
});

describe('builder.email()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().email()),
      JSON.stringify({ format: FormatString.EMAIL }));
  });
});

describe('builder.idnEmail()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().idnEmail()),
      JSON.stringify({ format: FormatString.IDN_EMAIL }));
  });
});

describe('builder.hostname()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().hostname()),
      JSON.stringify({ format: FormatString.HOSTNAME }));
  });
});

describe('builder.idnHostname()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().idnHostname()),
      JSON.stringify({ format: FormatString.IDN_HOSTNAME }));
  });
});

describe('builder.ipv4()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().ipv4()),
      JSON.stringify({ format: FormatString.IPV4 }));
  });
});

describe('builder.ipv6()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().ipv6()),
      JSON.stringify({ format: FormatString.IPV6 }));
  });
});

describe('builder.uri()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().uri()),
      JSON.stringify({ format: FormatString.URI }));
  });
});

describe('builder.uriReference()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().uriReference()),
      JSON.stringify({ format: FormatString.URI_REFERENCE }));
  });
});

describe('builder.iri()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().iri()),
      JSON.stringify({ format: FormatString.IRI }));
  });
});

describe('builder.iriReference()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().iriReference()),
      JSON.stringify({ format: FormatString.IRI_REFERENCE }));
  });
});

describe('builder.uriTemplate()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().uriTemplate()),
      JSON.stringify({ format: FormatString.URI_TEMPLATE }));
  });
});

describe('builder.jsonPointer()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().jsonPointer()),
      JSON.stringify({ format: FormatString.JSON_POINTER }));
  });
});

describe('builder.relativeJsonPointer()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().relativeJsonPointer()),
      JSON.stringify({ format: FormatString.RELATIVE_JSON_POINTER }));
  });
});

describe('builder.regex()', () => {
  it('must set correct `format`', () => {
    assert.equal(
      JSON.stringify(Builder().regex()),
      JSON.stringify({ format: FormatString.REGEX }));
  });
});

describe('builder.content(encoding, mediaType)', () => {
  it('must set `contentEncoding` and `contentMediaType`', () => {
    assert.equal(
      JSON.stringify(Builder().content('base64', 'image/png')),
      JSON.stringify({
        contentEncoding: 'base64',
        contentMediaType: 'image/png'
      }));
  });
});

describe('builder.string()...', () => {
  it('must set properties properly on chaining', () => {
    assert.equal(
      JSON.stringify(Builder()
        .string()
        .email()
        .pattern(/^[a-z][a-z0-9\.]{2,}@/)),
      JSON.stringify({
        type: TypeString.STRING,
        format: FormatString.EMAIL,
        pattern: '^[a-z][a-z0-9\\.]{2,}@'
      }));
  });
});
