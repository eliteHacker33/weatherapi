const tempRangeMap = new Map([
  ['cold', { min: Number.MIN_SAFE_INTEGER, max: 39 }],
  ['cool', { min: 40, max: 59 }],
  ['warm', { min: 60, max: 79 }],
  ['hot', { min: 80, max: Number.MAX_SAFE_INTEGER }],
]);

module.exports = (temp) => {
  if (!temp || typeof temp !== 'number') {
    return `Unable to provide custom feel insight for invalid temp: ${temp}`;
  }
  for (const [range, { min, max }] of tempRangeMap.entries()) {
    if (temp >= min && temp <= max) {
      return `By our indications, it feels ${range} outside`;
    }
  }
  return `Unable to provide custom feel insight for temp: ${temp}`;
};
