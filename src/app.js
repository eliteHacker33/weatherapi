const express = require('express');
const swaggerUi = require('swagger-ui-express');
const getSwaggerDocument = require('./config/swaggerConfig');
const weatherRoutes = require('./routes/weather');
const logger = require('./utils/CustomLogger');

const app = express();
const port = 3000;
const method = 'app.js';

app.use(express.json());

app.use('/weather', weatherRoutes);

const swaggerDocument = getSwaggerDocument(port);

// Serve Swagger UI directly with the loaded YAML document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  logger.log('info', method, 'Server started on port:', port);
  logger.log('info', method, 'Swagger UI available at: http://localhost:' + port + '/api-docs', {});
});
