# boolean-string-parser

Parses a string containing boolean matching logic into a function to test matches against a set of strings.

Created to be used in a solution for tagging tests. For example, we might tag one test with `['p0', 'fast']` and another with `['fast', 'flaky']`. We might then want to run only the `fast` tests, or only tests that are not `flaky`, or only `p0` tests that are `fast` and not `flaky`.

# Usage

```javascript
const BooleanStringParser = require('@creyes17/boolean-string-parser');

const matcher = BooleanStringParser.parseString('vegetable');

matcher(['fruit', 'vegetable']); // true
matcher(['cheese']); // false
```
