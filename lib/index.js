const parser = require('./parser');
const dereffer = require('./dereffer');

const json = {
  "$id": "http://example.com/root.json",
  "somerandom": {
    "notherrando": [
      1,
      {
        "hello": {
          $ref: "t/inner.json"
        }
      }
    ]
  },
  "definitions": {
    "A": { "$id": "#foo" },
    "B": {
      "$id": "other.json",
      "definitions": {
        "X": { "$id": "#bar" },
        "Y": { "$id": "t/inner.json", "type": "integer" },
        "Z": {
          $ref: "http://example.com/other.json#/definitions/X"
        },
        "ZHE": {
          $ref: "root.json#/somerandom/notherrando/1/hello"
        }
      }
    },
    "C": {
      "$id": "urn:uuid:ee564b8a-7a87-4125-8c96-e9f123d6766f"
    },
    "D": {
      "items": [
        {
          "type": "integer"
        },
        {
          "$ref": "#/definitions/D/items/0"
        },
        {
          "type": "string"
        }
      ]
    }
  },
  "properties": {
    "zhe": { $ref: "http://example.com/other.json#/definitions/ZHE" }
  }
};

const result = dereffer.deref(parser.parse(json));

console.log(result);