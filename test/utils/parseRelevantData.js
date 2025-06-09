const { assert } = require('chai');
const sinon = require('sinon');
const parseRelevantData = require('../../src/utils/parseRelevantData');

describe('parseRelevantData', () => {
  let apiResponse;

  beforeEach(() => {
    // Arrange: Mock API response
    apiResponse = {
      lat: 33.44,
      lon: -94.04,
      timezone: 'America/Chicago',
      timezone_offset: -18000,
      current: {
        dt: 1684929490,
        sunrise: 1684926645,
        sunset: 1684977332,
        temp: 292.55,
        feels_like: 292.87,
        pressure: 1014,
        humidity: 89,
        dew_point: 290.69,
        uvi: 0.16,
        clouds: 53,
        visibility: 10000,
        wind_speed: 3.13,
        wind_deg: 93,
        wind_gust: 6.71,
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d',
          },
        ],
      },
      alerts: [
        {
          sender_name:
            'NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)',
          event: 'Small Craft Advisory',
          start: 1684952747,
          end: 1684988747,
          description:
            '...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.',
          tags: [],
        },
      ],
    };
  });

  it('should correctly parse several fields', () => {
    // Act: Call the function
    const result = parseRelevantData(apiResponse);

    // Assert: Validate parsed data
    assert.strictEqual(result.temp, apiResponse.current.temp);
    assert.strictEqual(result.realFeel, apiResponse.current.feels_like);
    assert.strictEqual(result.visibility, apiResponse.current.visibility);
  });

  it('should correctly parse current weather details', () => {
    // Act: Call the function
    const result = parseRelevantData(apiResponse);

    // Assert: Validate parsed data
    assert.strictEqual(result.temp, 292.55);
    assert.strictEqual(result.humidity, 89);
    assert.strictEqual(result.description, 'broken clouds');
  });

  it('should correctly parse alerts', () => {
    // Act: Call the function
    const result = parseRelevantData(apiResponse);

    // Assert: Validate parsed data
    assert.strictEqual(result.alerts[0].event, 'Small Craft Advisory');
    assert.strictEqual(result.alerts[0].description.includes('SMALL CRAFT ADVISORY'), true);
  });
});
