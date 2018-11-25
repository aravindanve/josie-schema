// TODO: add more formats
const regex = {
  alpha: /^[a-zA-Z]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^[0-9]+$/,
  // `time` regex source: https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
  time: /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::(?:[0-5][0-9]))?)$/,
  // `email` regex source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  // hostname: /(?:)/,
  // ipv4: /(?:)/,
  // ipv6: /(?:)/,
  // uri: /(?:)/,
  // 'uri-reference': /(?:)/,
  // 'uri-template': /(?:)/,
  // regex: /(?:)/
};

function dateTime(value) {
  try {
    return (new Date(value)).toISOString() === value;

  } catch {
    return false;
  }
}

function date(value) {
  try {
    return (new Date(`${value}T00:00:00.000Z`)).toISOString() === `${value}T00:00:00.000Z`;

  } catch {
    return false;
  }
}

module.exports = {
  alpha: value => !!String.prototype.match.call(value, regex.alpha),
  alphanumeric: value => !!String.prototype.match.call(value, regex.alphanumeric),
  numeric: value => !!String.prototype.match.call(value, regex.numeric),
  'date-time': dateTime,
  date: date,
  time: value => !!String.prototype.match.call(value, regex.time),
  email: value => !!String.prototype.match.call(value, regex.email)
};
