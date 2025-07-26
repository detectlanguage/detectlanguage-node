Detect Language API Node.js Client
===

[![npm version](https://badge.fury.io/js/detectlanguage.svg)](https://badge.fury.io/js/detectlanguage)
[![Build Status](https://github.com/detectlanguage/detectlanguage-node/actions/workflows/main.yml/badge.svg)](https://github.com/detectlanguage/detectlanguage-node/actions)

Node.js client for the [Detect Language API](https://detectlanguage.com/).

## Installation

```
npm install detectlanguage [--save]
```

## Configuration

Before using Detect Language API client you have to setup your personal API key.
You can get it by signing up at [detectlanguage.com](https://detectlanguage.com)

```javascript
var DetectLanguage = require('detectlanguage');

var detectlanguage = new DetectLanguage('YOUR API KEY');
```

## Usage

### Language Detection

Takes a text string and returns a list of detections.

```javascript
var text = "Hello! How are you?";

detectlanguage.detect(text).then(function(result) {
  console.log(JSON.stringify(result));
});
```

#### Response

```javascript
[{"language":"en","score":0.9955}]
```

### Batch Detection (recommended)

Takes an array of texts and returns a list of detections.
It is much faster than doing request for each text individually.

```javascript
var texts = ['šešios žąsys', 'Strč prst skrz krk'];

detectlanguage.detectBatch(texts).then(function(result) {
  console.log(JSON.stringify(result));
});
```

#### Response

```javascript
[
  [
    {
      "language": "lt",
      "score": 0.8696
    }
  ],
  [
    {
      "language": "cs",
      "score": 0.3653
    },
    ...
  ]
]
```

### Language Code Detection

Returns first detected language code.

```javascript
var text = "Hello! How are you?";

detectlanguage.detectCode(text).then(function(result) {
  console.log(JSON.stringify(result));
});
```

#### Response

```javascript
"en"
```

### Supported Languages

Returns the list of supported languages.

```javascript
detectlanguage.languages().then(function(result) {
  console.log(JSON.stringify(result));
});
```

#### Response

```javascript
[
  {
    "code": "aa",
    "name": "Afar"
  },
  {
    "code": "ab",
    "name": "Abkhazian"
  },
  ...
]
```

### Account Status

Returns information about your account and it's status.

```javascript
detectlanguage.accountStatus().then(function(result) {
  console.log(JSON.stringify(result));
});
```

#### Response

```javascript
{
  date: "2020-01-01",
  requests: 31,
  bytes: 429,
  plan: "FREE",
  plan_expires: null,
  daily_requests_limit: 1000,
  daily_bytes_limit: 1048576,
  status: "ACTIVE"
}
```

## Author

Laurynas Butkus ([GitHub](https://github.com/laurynas))

## License

Licensed under the MIT License: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
