const assert = require('chai').assert;
const sinon = require('sinon');
const convertUtcDates = require('../../src/utils/convertUtcDates');
const logger = require('../../src/utils/CustomLogger'); 

describe('convertUtcDates', () => {
  let errorLoggerStub;

  beforeEach(() => {
    // Stub the logger.error method to prevent actual logging during tests
    errorLoggerStub = sinon.stub(logger, 'error');
  });

  afterEach(() => {
    // Restore the original logger.error method after each test
    sinon.restore();
  });

  it('should convert a valid UTC Unix timestamp to an ISO date string', () => {
    const utcTimestamp = 1678886400; // March 15, 2023 12:00:00 PM UTC
    const expectedIsoString = '2023-03-15T13:20:00.000Z';
    const result = convertUtcDates(utcTimestamp);
    assert.strictEqual(result, expectedIsoString);
    assert.isFalse(errorLoggerStub.called, 'Error logger should not have been called');
  });

  it('should return null for a null or undefined input', () => {
    assert.isNull(convertUtcDates(null));
    assert.isNull(convertUtcDates(undefined));
    assert.isFalse(errorLoggerStub.called, 'Error logger should not have been called');
  });

  it('should return null for a non-number input', () => {
    assert.isNull(convertUtcDates('abc'));
    assert.isNull(convertUtcDates({}));
    assert.isNull(convertUtcDates([]));
    assert.isFalse(errorLoggerStub.called, 'Error logger should not have been called');
  });

  it('should handle timestamps that result in a future date', () => {
    const futureTimestamp = 1893456000; // January 1, 2030 12:00:00 PM UTC
    const expectedIsoString = '2030-01-01T00:00:00.000Z';
    const result = convertUtcDates(futureTimestamp);
    assert.strictEqual(result, expectedIsoString);
    assert.isFalse(errorLoggerStub.called, 'Error logger should not have been called');
  });

  it('should return null for invalid dates', () => {
    const pastTimestamp = 0; // January 1, 1970 12:00:00 AM UTC (Unix Epoch)
    const result = convertUtcDates(pastTimestamp);
    assert.isNull(result);
    assert.isFalse(errorLoggerStub.called, 'Error logger should not have been called');
  });

  it('should return the original timestamp and log an error if Date object creation fails', () => {
    // Intentionally pass a value that would cause Date to be invalid (e.g., extremely large number)
    const invalidTimestamp = Number.MAX_SAFE_INTEGER + 1000;
    const result = convertUtcDates(invalidTimestamp);

    assert.strictEqual(result, invalidTimestamp);
    assert.isTrue(errorLoggerStub.calledOnce, 'Error logger should have been called once');
    assert.strictEqual(errorLoggerStub.firstCall.args[0], 'convertUtcDates');
    assert.include(
      errorLoggerStub.firstCall.args[1],
      `Error converting UTC timestamp ${invalidTimestamp}:`
    );
    assert.instanceOf(
      errorLoggerStub.firstCall.args[2],
      Error,
      'Third argument should be an Error instance'
    );
  });
});
