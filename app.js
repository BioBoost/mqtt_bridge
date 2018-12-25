const yaml = require('js-yaml');
const fs = require('fs');
const mqtt = require('mqtt');

let config = null;
try {
  config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
} catch (e) {
  console.log("Failed to load configuration file (config.yaml). Did you make one?");
  process.exit();
}

let source  = mqtt.connect(config.source.connection, {
  username: config.source.username,
  password: config.source.password
});

let destination  = mqtt.connect(config.destination.connection, {
  username: config.destination.username,
  password: config.destination.password
});

source.on('connect', function () {
  console.log("Successfully connected to source broker");
});

destination.on('connect', function () {
  console.log("Successfully connected to destination broker");
});