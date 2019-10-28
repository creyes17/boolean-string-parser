const parseString = matchingString => {
  return testStringSet =>
    testStringSet.filter(val => val === matchingString).length > 0;
};

exports.parseString = parseString;
