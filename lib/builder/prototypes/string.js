const TypeString = require('../../constants/TypeString');
const FormatString = require('../../constants/FormatString');

const prototype = {
  string() {
    return this.type(TypeString.STRING);
  },

  format(value) {
    if (!this.hasType(TypeString.STRING)) {
      this.type(TypeString.STRING);
    }
    this._schema.format = value;
    return this;
  },

  pattern(value) {
    if (!this.hasType(TypeString.STRING)) {
      this.type(TypeString.STRING);
    }
    this._schema.pattern = value instanceof RegExp
      ? value.source : value;
    return this;
  },

  content(encoding, mediaType) {
    if (!this.hasType(TypeString.STRING)) {
      this.type(TypeString.STRING);
    }
    this._schema.contentEncoding = encoding;
    this._schema.contentMediaType = mediaType;
    return this;
  },

  dateTime() {
    return this.format(FormatString.DATE_TIME);
  },

  date() {
    return this.format(FormatString.DATE);
  },

  time() {
    return this.format(FormatString.TIME);
  },

  email() {
    return this.format(FormatString.EMAIL);
  },

  idnEmail() {
    return this.format(FormatString.IDN_EMAIL);
  },

  hostname() {
    return this.format(FormatString.HOSTNAME);
  },

  idnHostname() {
    return this.format(FormatString.IDN_HOSTNAME);
  },

  ipv4() {
    return this.format(FormatString.IPV4);
  },

  ipv6() {
    return this.format(FormatString.IPV6);
  },

  uri() {
    return this.format(FormatString.URI);
  },

  uriReference() {
    return this.format(FormatString.URI_REFERENCE);
  },

  iri() {
    return this.format(FormatString.IRI);
  },

  iriReference() {
    return this.format(FormatString.IRI_REFERENCE);
  },

  uriTemplate() {
    return this.format(FormatString.URI_TEMPLATE);
  },

  jsonPointer() {
    return this.format(FormatString.JSON_POINTER);
  },

  relativeJsonPointer() {
    return this.format(FormatString.RELATIVE_JSON_POINTER);
  },

  regex() {
    return this.format(FormatString.REGEX);
  }
};

module.exports = prototype;
