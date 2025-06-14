const express = require('express');
const { validationResult, param, matchedData } = require('express-validator');
const weatherController = require('../controllers/weatherController');
const logger = require('../utils/CustomLogger');

const router = express.Router();
const method = 'weather-routes';

router.get(
  '/:latitude/:longitude',
  [
    param('latitude')
      .exists()
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude is required and must be between -90 and 90 degrees'),
  ],
  [
    param('longitude')
      .exists()
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude is required and must be between -180 and 180 degrees'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { latitude, longitude } = matchedData(req);
      const weatherResults = await weatherController(latitude, longitude);
      return res.json(weatherResults);
    } catch (error) {
      logger.error(method, 'Error fetching weather data', error);
      return res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
  }
);
module.exports = router;
