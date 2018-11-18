const prototype = {
  nullOrLiteral(value) {
    return this.null().literal(value);
  },

  nullOrBoolean() {
    return this.boolean().null();
  },

  nullOrNumber() {
    return this.number().null();
  },

  nullOrInteger() {
    return this.integer().null();
  },

  nullOrString() {
    return this.string().null();
  },

  nullOrPattern(value) {
    return this.null().pattern(value);
  },

  nullOrFormat(value) {
    return this.null().format(value);
  },

  nullOrContent(encoding, mediaType) {
    return this.null().content(encoding, mediaType);
  },

  nullOrDateTime() {
    return this.dateTime().null();
  },

  nullOrDate() {
    return this.date().null();
  },

  nullOrTime() {
    return this.time().null();
  },

  nullOrEmail() {
    return this.email().null();
  },

  nullOrHostname() {
    return this.hostname().null();
  },

  nullOrIpv4() {
    return this.ipv4().null();
  },

  nullOrIpv6() {
    return this.ipv6().null();
  },

  nullOrUri() {
    return this.uri().null();
  },

  nullOrUriReference() {
    return this.uriReference().null();
  },

  nullOrUriTemplate() {
    return this.uriTemplate().null();
  },

  nullOrRegex() {
    return this.regex().null();
  },

  nullOrArray(items) {
    return this.null().array(items);
  },

  nullOrObject(properties) {
    return this.null().object(properties);
  }
};

module.exports = prototype;
