const parseRelevantData = require('../../src/utils/parseRelevantData');
const assert = require('chai').assert;

describe('parseRelevantData', () => {
  it('should parse relevant data correctly', () => {
    // Arrange
    const input = {
      key1: 'value1',
      relevantKey: 'relevantValue',
      key3: 'value3',
      anotherRelevantKey: 'anotherRelevantValue',
    };
    const keys = ['relevantKey', 'anotherRelevantKey'];
    const expectedOutput = {
      relevantKey: 'relevantValue',
      anotherRelevantKey: 'anotherRelevantValue',
    };

    // Act
    const actualOutput = parseRelevantData(input, keys);

    // Assert
    assert.deepEqual(
      actualOutput,
      expectedOutput,
      'The parsed data should match the expected data.'
    );
  });

  it('should handle empty input object', () => {
    // Arrange
    const input = {};
    const keys = ['relevantKey'];
    const expectedOutput = {};

    // Act
    const actualOutput = parseRelevantData(input, keys);

    // Assert
    assert.deepEqual(
      actualOutput,
      expectedOutput,
      'Should return an empty object when input is empty.'
    );
  });

  it('should handle empty keys array', () => {
    // Arrange
    const input = { relevantKey: 'relevantValue' };
    const keys = [];
    const expectedOutput = {};

    // Act
    const actualOutput = parseRelevantData(input, keys);

    // Assert
    assert.deepEqual(actualOutput, {}, 'Should return an empty object when keys array is empty.');
  });

  it('should handle missing keys in the input object', () => {
    // Arrange
    const input = { key1: 'value1' };
    const keys = ['relevantKey', 'anotherRelevantKey'];
    const expectedOutput = {};

    // Act
    const actualOutput = parseRelevantData(input, keys);

    // Assert
    assert.deepEqual(
      actualOutput,
      expectedOutput,
      'Should return an empty object when relevant keys are missing.'
    );
  });

  it('should handle null or undefined input', () => {
    // Arrange
    const input = null;
    const keys = ['relevantKey'];
    const expectedOutput = {};

    // Act
    const actualOutput = parseRelevantData(input, keys);

    // Assert
    assert.deepEqual(actualOutput, {}, 'Should return an empty object when input is null.');
  });
});
