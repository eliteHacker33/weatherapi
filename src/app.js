const express = require('express');
const weatherRoutes = require('./routes/weather');
const logger = require('./utils/CustomLogger');

const app = express();
const port = 3000;
const method = 'app.js';

app.use(express.json());

app.use('/weather', weatherRoutes);

app.listen(port, () => {
  logger.log('info', method, 'Server started on port:', port);
});
