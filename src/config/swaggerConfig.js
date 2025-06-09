const path = require('path');
const YAML = require('js-yaml');
const fs = require('fs');

const getSwaggerDocument = (port) => {
  // Load the base YAML definition
  const yamlFilePath = path.resolve(path.join(__dirname, 'openapi.yaml'));
  const swaggerDocument = YAML.load(fs.readFileSync(yamlFilePath, 'utf8'));

  // Dynamically update the server URL in the loaded document
  if (swaggerDocument.servers && swaggerDocument.servers.length > 0) {
    swaggerDocument.servers[0].url = `http://localhost:${port}`;
  }

  return swaggerDocument;
};

module.exports = getSwaggerDocument;
