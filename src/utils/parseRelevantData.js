const normalizeDate = require('./convertUtcDates');
const determineTempRangeFeel = require('./determineTempRangeFeel');

module.exports = (weatherData) => {
  const {
    current: {
      dt,
      sunrise,
      sunset,
      temp,
      feels_like: realFeel,
      humidity,
      dew_point: dewPoint,
      uvi,
      visibility,
      wind_speed: windSpeed,
      wind_gust: windGust,
      rain,
      snow,
      weather = [],
    } = {},
    alerts = [],
  } = weatherData;

  const customFeel = determineTempRangeFeel(temp);

  const { main: summary, description } = weather.length > 0 ? weather[0] : {};
  return {
    dt: normalizeDate(dt),
    sunrise: normalizeDate(sunrise),
    sunset: normalizeDate(sunset),
    temp,
    realFeel,
    customFeel,
    rain: rain ? rain['1h'] : null,
    snow: snow ? snow['1h'] : null,
    humidity,
    dewPoint,
    uvi,
    visibility,
    windSpeed,
    windGust,
    summary,
    description,
    alerts: alerts.map((alert) => ({
      event: alert.event,
      start: normalizeDate(alert.start),
      end: normalizeDate(alert.end),
      description: alert.description,
      tags: alert.tags || [],
    })),
  };
};
