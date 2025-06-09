require('dotenv').config();

module.exports = {
  //process env configurations
  weatherApiKey: process.env.WEATHER_API_KEY,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,

  //User defined configurations
  weatherApiUri: 'https://api.openweathermap.org/data/3.0/onecall',
  weatherApiUnits: 'imperial',
  weatherApiExclude: 'hourly,daily,minutely', // comma-separated list of data to exclude
  weatherApiLang: 'en',
};
