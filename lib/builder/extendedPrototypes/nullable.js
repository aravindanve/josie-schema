const prototype = {
  nullOrLiteral(value) {
    return this.null().literal(value);
  },

  booleanOrNull() {
    return this.boolean().null();
  },

  numberOrNull() {
    return this.number().null();
  },

  integerOrNull() {
    return this.integer().null();
  },

  stringOrNull() {
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

  dateTimeOrNull() {
    return this.dateTime().null();
  },

  dateOrNull() {
    return this.date().null();
  },

  timeOrNull() {
    return this.time().null();
  },

  emailOrNull() {
    return this.email().null();
  },

  hostnameOrNull() {
    return this.hostname().null();
  },

  ipv4OrNull() {
    return this.ipv4().null();
  },

  ipv6OrNull() {
    return this.ipv6().null();
  },

  uriOrNull() {
    return this.uri().null();
  },

  uriReferenceOrNull() {
    return this.uriReference().null();
  },

  uriTemplateOrNull() {
    return this.uriTemplate().null();
  },

  regexOrNull() {
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
