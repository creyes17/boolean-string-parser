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
});
