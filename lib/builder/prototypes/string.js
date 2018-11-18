const TypeString = require('../../constants/TypeString');
const FormatString = require('../../constants/FormatString');

const prototype = {
  string() {
    return this.type(TypeString.STRING);
  },

  maxLength(value) {
    if (!this.hasType(TypeString.STRING)) {
      this.type(TypeString.STRING);
    }
    this._schema.maxLength = value;
    return this;
  },

  minLength(value) {
    if (!this.hasType(TypeString.STRING)) {
      this.type(TypeString.STRING);
    }
    this._schema.minLength = value;
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

  format(value) {
    if (!this.hasType(TypeString.STRING)) {
      this.type(TypeString.STRING);
    }
    this._schema.format = value;
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

  hostname() {
    return this.format(FormatString.HOSTNAME);
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

  uriTemplate() {
    return this.format(FormatString.URI_TEMPLATE);
  },

  regex() {
    return this.format(FormatString.REGEX);
  }
};

module.exports = prototype;
