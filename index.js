const parseString = matchingString => {
  return testString => testString === matchingString;
};

exports.parseString = parseString;
