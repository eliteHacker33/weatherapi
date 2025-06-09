const express = require('express');
const { validationResult, param, matchedData } = require('express-validator');

const router = express.Router();

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
    } else {
      const { latitude, longitude } = matchedData(req);
      //todo: call weatherController to handle logic
      return res.json(weatherResults);
    }
  }
);
module.exports = router;
