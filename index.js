const parseString = matchingString => {
  const orValues = matchingString.split('|');

  return testStringValues => {
    const testStringSet = new Set(testStringValues);

    const matchingOrGroups = orValues.filter(orValue => {
      const andValues = orValue.split('&');
      const matchingAndGroups = andValues.filter(andValue => {
        if (andValue && andValue.length > 1 && andValue[0] === '^') {
          return !testStringSet.has(andValue.substr(1));
        }
        return testStringSet.has(andValue);
      });

      return matchingAndGroups.length === andValues.length;
    });

    return matchingOrGroups.length > 0;
  };
};

exports.parseString = parseString;
