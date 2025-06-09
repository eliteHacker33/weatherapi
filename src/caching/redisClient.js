const { createClient } = require('redis');
const config = require('../../../weatherapi-backup/config/index');
const logger = require('../../../weatherapi-backup/utils/CustomLogger');

const method = 'redisClient';
const { redisHost, redisPort } = config;

const redisUrl = `redis://${redisHost}:${redisPort}`;
const client = createClient({
  url: redisUrl,
});

client.on('connect', () => {
  logger.log('info', method, 'Connected to Redis', {});
});

client.on('error', (err) => {
  logger.error(method, 'Redis Client Error', err);
});

// Connect to Redis when this module is first imported
async function connectRedis() {
  if (!client.isOpen) {
    try {
      await client.connect();
    } catch (err) {
      logger.error(method, 'Failed to connect to Redis during initial connection:', err);
    }
  }
}

connectRedis();

module.exports = client;
