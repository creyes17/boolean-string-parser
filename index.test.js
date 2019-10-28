const BooleanStringParser = require('./index.js');

describe('parseString', () => {
  it('exists', () => {
    expect(BooleanStringParser.parseString).toBeDefined();
  });

  describe('can parse a single value', () => {
    const stringToParse = 'potato';
    const matcher = BooleanStringParser.parseString(stringToParse);

    it('and match that same value', () => {
      expect(matcher([stringToParse])).toBeTruthy();
    });

    it('and not match a single different value', () => {
      const stringsToTest = ['lemon'];
      expect(matcher(stringsToTest)).toBeFalsy();
    });

    it('and not match multiple different values', () => {
      const stringsToTest = ['fruit', 'lemon'];
      expect(matcher(stringsToTest)).toBeFalsy();
    });

    it('and match a set with extra values', () => {
      const stringsToTest = ['potato', 'vegetable'];
      expect(matcher(stringsToTest)).toBeTruthy();
    });
  });

  describe('can parse two values joined by ampersand', () => {
    const stringToParse = 'vehicle&car';
    const matcher = BooleanStringParser.parseString(stringToParse);

    it('and match an exact set', () => {
      const matchingSet = ['vehicle', 'car'];
      expect(matcher(matchingSet)).toBeTruthy();
    });

    it('and match a set with extra values', () => {
      const matchingSet = ['vehicle', 'car', 'sedan'];
      expect(matcher(matchingSet)).toBeTruthy();
    });

    it('and does not match set with missing values', () => {
      const failingSet1 = ['vehicle'];
      expect(matcher(failingSet1)).toBeFalsy();

      const failingSet2 = ['car'];
      expect(matcher(failingSet2)).toBeFalsy();

      const failingSet3 = ['vehicle', 'sedan'];
      expect(matcher(failingSet3)).toBeFalsy();

      const failingSet4 = ['car', 'sedan'];
      expect(matcher(failingSet4)).toBeFalsy();
    });
  });

  describe('can parse more than two values joined by ampersand', () => {
    const stringToParse = 'animal&mammal&fluffy';
    const matcher = BooleanStringParser.parseString(stringToParse);

    it('and match an exact set', () => {
      const matchingSet = ['animal', 'mammal', 'fluffy'];
      expect(matcher(matchingSet)).toBeTruthy();
    });

    it('and match a set with extra values', () => {
      const matchingSet = ['animal', 'mammal', 'fluffy', 'canine'];
      expect(matcher(matchingSet)).toBeTruthy();
    });

    it('and does not match set with missing values', () => {
      const failingSet1 = ['animal'];
      expect(matcher(failingSet1)).toBeFalsy();

      const failingSet2 = ['animal', 'mammal'];
      expect(matcher(failingSet2)).toBeFalsy();

      const failingSet3 = ['animal', 'fluffy'];
      expect(matcher(failingSet3)).toBeFalsy();

      const failingSet4 = ['mammal', 'fluffy', 'mammoth'];
      expect(matcher(failingSet4)).toBeFalsy();
    });
  });

  describe('can parse two values joined by a pipe', () => {
    const stringToParse = 'wood|metal';
    const matcher = BooleanStringParser.parseString(stringToParse);

    it('and match if either value present', () => {
      const matchingSet1 = ['wood'];
      expect(matcher(matchingSet1)).toBeTruthy();

      const matchingSet2 = ['metal'];
      expect(matcher(matchingSet2)).toBeTruthy();
    });

    it('and match if both values present', () => {
      const matchingSet = ['wood', 'metal'];
      expect(matcher(matchingSet)).toBeTruthy();
    });

    it('and match if either value present even if extra values', () => {
      const matchingSet1 = ['wood', 'oak'];
      expect(matcher(matchingSet1)).toBeTruthy();

      const matchingSet2 = ['metal', 'steel'];
      expect(matcher(matchingSet2)).toBeTruthy();

      const matchingSet3 = ['metal', 'steel', 'wood', 'oak'];
      expect(matcher(matchingSet3)).toBeTruthy();
    });

    it('and not match if neither value present', () => {
      const failingSet1 = [];
      expect(matcher(failingSet1)).toBeFalsy();

      const failingSet2 = ['oak'];
      expect(matcher(failingSet2)).toBeFalsy();

      const failingSet3 = ['steel', 'oak'];
      expect(matcher(failingSet3)).toBeFalsy();
    });
  });

  describe('can parse a single value prefixed by a carat', () => {
    const matcher = BooleanStringParser.parseString('^flaky');

    it('and matches the empty set', () => {
      const matchingSet = [];
      expect(matcher(matchingSet)).toBeTruthy();
    });

    it('and does not match sets containing that value', () => {
      const failingSet1 = ['flaky'];
      expect(matcher(failingSet1)).toBeFalsy();

      const failingSet2 = ['p0', 'flaky'];
      expect(matcher(failingSet2)).toBeFalsy();

      const failingSet3 = [
        'flaky',
        'notflaky',
        'and',
        'many',
        'other',
        'values',
      ];
      expect(matcher(failingSet3)).toBeFalsy();
    });

    it('and matches sets containing other values', () => {
      const matchingSet1 = ['p0'];
      expect(matcher(matchingSet1)).toBeTruthy();

      const matchingSet2 = ['p0', 'and', 'many', 'other', 'values'];
      expect(matcher(matchingSet2)).toBeTruthy();

      const matchingSet3 = ['f', 'fl', 'fla', 'flak', 'notflaky', 'flaky2'];
      expect(matcher(matchingSet3)).toBeTruthy();
    });
  });

  describe('can parse two values joined by an ampersand, one of which negated with a carat', () => {
    const matcher = BooleanStringParser.parseString('p0&^flaky');
    const reversedMatcher = BooleanStringParser.parseString('^flaky&p0');

    it('and match sets that exclude the negated value and have the other value', () => {
      const matchingSet1 = ['p0'];
      expect(matcher(matchingSet1)).toBeTruthy();
      expect(reversedMatcher(matchingSet1)).toBeTruthy();

      const matchingSet2 = ['p0', 'and', 'many', 'other', 'values'];
      expect(matcher(matchingSet2)).toBeTruthy();
      expect(reversedMatcher(matchingSet2)).toBeTruthy();
    });

    it('and does not match sets that are missing the required value', () => {
      const failingSet1 = [];
      expect(matcher(failingSet1)).toBeFalsy();
      expect(reversedMatcher(failingSet1)).toBeFalsy();

      const failingSet2 = ['priority'];
      expect(matcher(failingSet2)).toBeFalsy();
      expect(reversedMatcher(failingSet2)).toBeFalsy();

      const failingSet3 = ['urgent', 'priority'];
      expect(matcher(failingSet3)).toBeFalsy();
      expect(reversedMatcher(failingSet3)).toBeFalsy();
    });

    it('and does not match sets that contain the negated value', () => {
      const failingSet1 = ['flaky'];
      expect(matcher(failingSet1)).toBeFalsy();
      expect(reversedMatcher(failingSet1)).toBeFalsy();

      const failingSet2 = ['p0', 'flaky'];
      expect(matcher(failingSet2)).toBeFalsy();
      expect(reversedMatcher(failingSet2)).toBeFalsy();
    });
  });

  describe('can parse two values joined by a pipe, one of which negated with a carat', () => {
    const matcher = BooleanStringParser.parseString('^fruit|tomato');
    const reversedMatcher = BooleanStringParser.parseString('tomato|^fruit');

    it('and match sets that exclude the negated value or have the other value', () => {
      const matchingSet1 = ['vegetable'];
      expect(matcher(matchingSet1)).toBeTruthy();
      expect(reversedMatcher(matchingSet1)).toBeTruthy();

      const matchingSet2 = ['tomato'];
      expect(matcher(matchingSet2)).toBeTruthy();
      expect(reversedMatcher(matchingSet2)).toBeTruthy();

      const matchingSet3 = ['vegetable', 'root'];
      expect(matcher(matchingSet3)).toBeTruthy();
      expect(reversedMatcher(matchingSet3)).toBeTruthy();

      const matchingSet4 = ['tomato', 'fruit'];
      expect(matcher(matchingSet4)).toBeTruthy();
      expect(reversedMatcher(matchingSet4)).toBeTruthy();
    });

    it('and does not match sets include the negated value but do not contain the requested value', () => {
      const failingSet1 = ['fruit', 'banana'];
      expect(matcher(failingSet1)).toBeFalsy();
      expect(reversedMatcher(failingSet1)).toBeFalsy();

      const failingSet2 = ['fruit'];
      expect(matcher(failingSet2)).toBeFalsy();
      expect(reversedMatcher(failingSet2)).toBeFalsy();
    });
  });

  describe('can parse three values joined by ampersand and pipe', () => {
    // Operator precedence should not care about the order in which arguments are specified.
    // AND operations should always take precedence over OR operations.
    const matcher = BooleanStringParser.parseString('one&two|three');
    const equivalentMatcher1 = BooleanStringParser.parseString('two&one|three');
    const equivalentMatcher2 = BooleanStringParser.parseString('three|one&two');
    const equivalentMatcher3 = BooleanStringParser.parseString('three|two&one');

    it('and matches sets that contain both values joined by ampersand', () => {
      expect(matcher(['one', 'two'])).toBeTruthy();
      expect(equivalentMatcher1(['one', 'two'])).toBeTruthy();
      expect(equivalentMatcher2(['one', 'two'])).toBeTruthy();
      expect(equivalentMatcher3(['one', 'two'])).toBeTruthy();
    });

    it('and does not match sets only containing one of the values joined by ampersand', () => {
      expect(matcher(['one'])).toBeFalsy();
      expect(equivalentMatcher1(['one'])).toBeFalsy();
      expect(equivalentMatcher2(['one'])).toBeFalsy();
      expect(equivalentMatcher3(['one'])).toBeFalsy();

      expect(matcher(['two'])).toBeFalsy();
      expect(equivalentMatcher1(['two'])).toBeFalsy();
      expect(equivalentMatcher2(['two'])).toBeFalsy();
      expect(equivalentMatcher3(['two'])).toBeFalsy();
    });

    it('and matches sets that only contain the lone value joined by the pipe', () => {
      expect(matcher(['three'])).toBeTruthy();
      expect(equivalentMatcher1(['three'])).toBeTruthy();
      expect(equivalentMatcher2(['three'])).toBeTruthy();
      expect(equivalentMatcher3(['three'])).toBeTruthy();
    });
  });
});
