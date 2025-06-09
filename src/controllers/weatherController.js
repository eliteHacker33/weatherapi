const logger = require('../utils/CustomLogger');
const config = require('../config/index');
const determineTempRangeFeel = require('../utils/determineTempRangeFeel');
const parseRelevantData = require('../utils/parseRelevantData');
const redisClient = require('../caching/redisClient');
const logMethod = 'WeatherController';

module.exports = async (latitude, longitude) => {
  const redisKey = `weatherapi:${latitude}:${longitude}`;

  const existingCacheItem = await redisClient.get(redisKey);
  if (existingCacheItem) {
    logger.log('info', logMethod, 'Cache hit for key:', redisKey);
    return JSON.parse(existingCacheItem);
  }

  const {
    weatherApiKey: appId,
    weatherApiUri,
    weatherApiUnits,
    weatherApiExclude,
    weatherApiLang,
  } = config;

  const uri = `${weatherApiUri}?lat=${latitude}&lon=${longitude}&appid=${appId}&units=${weatherApiUnits}&exclude=${weatherApiExclude}&lang=${weatherApiLang}`;
  logger.log('info', logMethod, 'formattedUri', uri);
  try {
    const weatherApiResponse = await fetch(uri);
    const weatherData = await weatherApiResponse.json();

    if (!weatherApiResponse.ok) {
      logger.error(logMethod, 'Failed openweathermap API fetch', weatherData);
      throw new Error(
        `Fetch failed for lat: ${latitude}, long: ${longitude} with: ${weatherData.message}`
      );
    }

    logger.log('info', logMethod, 'logging parsed response from openweather', weatherData);
    const response = parseRelevantData(weatherData);
    await redisClient.set(redisKey, JSON.stringify(response), { EX: 300 }); // Weather doesn't change that much in 5 minutes, right?
    return response;
  } catch (error) {
    logger.error(logMethod, 'Error fetching weather data', error);
    throw new Error('Failed to fetch weather data: ' + error.message);
  }
};
