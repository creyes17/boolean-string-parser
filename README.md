# boolean-string-parser

Parses a string containing boolean matching logic into a function to test matches against a set of strings.

Created to be used in a solution for tagging tests. For example, we might tag one test with `['p0', 'fast']` and another with `['fast', 'flaky']`. We might then want to run only the `fast` tests, or only tests that are not `flaky`, or only `p0` tests that are `fast` and not `flaky`.

# Usage

Create a matching function by passing a boolean statement in [Disjunctive Normal Form](https://en.wikipedia.org/wiki/Disjunctive_normal_form) using the `&` (ampersand) character to signify "AND", `|` (pipe) character to signify "OR", and the `^` (carat) character as a prefix to signify NOT.

```javascript
const BooleanStringParser = require('@creyes17/boolean-string-parser');

const potatoMatcher = BooleanStringParser.parseString('potato');
veggieMatcher(['potato']); // true
veggieMatcher(['lemon']); // false

const fluffyMammalAnimalMatcher = BooleanStringParser.parseString(
  'animal&mammal&fluffy',
);

fluffyMammalAnimalMatcher(['animal', 'mammal', 'fluffy']); // true
fluffyMammalAnimalMatcher(['mammal', 'fluffy', 'mammoth']); // false
fluffyMammalAnimalMatcher(['animal', 'mammal']); // false

const notFlakyMatcher = BooleanStringParser.parseString('^flaky');
notFlakyMatcher([]); // true
notFlakyMatcher(['flaky']); // false
notFlakyMatcher(['p0']); // true
notFlakyMatcher(['p0', 'fast']); // true
notFlakyMatcher(['p0', 'fast', 'flaky']); // false
```
