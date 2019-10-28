const BooleanStringParser = require('./index.js');

describe('Module', () => {
  it('can match single value parsed from a string', () => {
    expect(BooleanStringParser.parseString).toBeDefined();
    const stringToMatch = 'potato';
    const matcher = BooleanStringParser.parseString(stringToMatch);
    expect(matcher(stringToMatch)).toBeTruthy();
  });

  it('can mismatch single value parsed from a string', () => {
    expect(BooleanStringParser.parseString).toBeDefined();
    const stringToMatch = 'potato';
    const stringToTest = 'buttons';
    const matcher = BooleanStringParser.parseString(stringToMatch);
    expect(matcher(stringToTest)).toBeFalsy();
  });
});
