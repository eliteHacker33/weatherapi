const logger = require('./CustomLogger');
const method = 'convertUtcDates';
module.exports = (utcTimestamp) => {
  if (!utcTimestamp || typeof utcTimestamp !== 'number') {
    return null;
  }
  try {
    const date = new Date(utcTimestamp * 1000); // Convert seconds to milliseconds
    return date.toISOString();
  } catch (error) {
    logger.error(method, `Error converting UTC timestamp ${utcTimestamp}:`, error);
    return utcTimestamp; // Return original from api if conversion fails
  }
};
