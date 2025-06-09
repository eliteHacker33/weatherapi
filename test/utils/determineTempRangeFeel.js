const { assert } = require('chai');
const determineTempRange = require('../../src/utils/determineTempRangeFeel');

describe('Determine Temperature Range', () => {
  const baseString = (feel) => `By our indications, it feels ${feel} outside`;
  const baseInvalidString = (temp) =>
    `Unable to provide custom feel insight for invalid temp: ${temp}`;
  it('Returns "cold" for temperatures below 40', async () => {
    assert.strictEqual(await determineTempRange(-10), baseString('cold'));
    assert.strictEqual(await determineTempRange(39), baseString('cold'));
  });

  it('Returns "cool" for temperatures between 40 and 59', async () => {
    assert.strictEqual(await determineTempRange(40), baseString('cool'));
    assert.strictEqual(await determineTempRange(59), baseString('cool'));
  });

  it('Returns "warm" for temperatures between 60 and 79', async () => {
    assert.strictEqual(await determineTempRange(60), baseString('warm'));
    assert.strictEqual(await determineTempRange(79), baseString('warm'));
  });

  it('Returns "hot" for temperatures 80 and above', async () => {
    assert.strictEqual(await determineTempRange(80), baseString('hot'));
    assert.strictEqual(await determineTempRange(100), baseString('hot'));
  });

  it('Returns "unknown" for temperatures outside defined ranges', async () => {
    assert.strictEqual(await determineTempRange(null), baseInvalidString(null));
    assert.strictEqual(await determineTempRange(undefined), baseInvalidString(undefined));
    assert.strictEqual(await determineTempRange('string'), baseInvalidString('string'));
  });
});
