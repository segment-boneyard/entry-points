
# entry-points

  Find a node module's possible entry points, like it's `main` script and bin
  scripts.

## Example

```js
var find = require('entry-points');

find(require('./package.json'));
// ['index.js', 'bin/foo']
```

## Installation

```bash
$ npm install entry-points
```

## License

  MIT