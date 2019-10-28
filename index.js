const parseString = matchingString => {
  const orValues = matchingString.split('|');

  return testStringValues => {
    const testStringSet = new Set(testStringValues);

    const matchingOrGroups = orValues.filter(orValue => {
      const andValues = orValue.split('&');
      const matchingAndGroups = andValues.filter(andValue =>
        testStringSet.has(andValue),
      );

      return matchingAndGroups.length === andValues.length;
    });

    return matchingOrGroups.length > 0;
  };
};

exports.parseString = parseString;
