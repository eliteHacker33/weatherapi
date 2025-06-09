const logger = require('../utils/CustomLogger');
const config = require('../config/index');
const logMethod = 'WeatherController';

module.exports = async (latitude, longitude) => {
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
    return weatherData;
  } catch (error) {
    logger.error(logMethod, 'Error fetching weather data', error);
    throw new Error('Failed to fetch weather data: ' + error.message);
  }
};
