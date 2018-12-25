const yaml = require('js-yaml');
const fs = require('fs');

let config = null;
try {
  config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
} catch (e) {
  console.log("Failed to load configuration file (config.yaml). Did you make one?");
  process.exit();
}

console.log(config);