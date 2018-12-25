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

  source.subscribe(config.source.topic, function (err) {
    if (err) {
      console.log("Failed to subscribe to source topic");
    } else {
      console.log("Successfully subscribed to source topic");
    }
  })
});

destination.on('connect', function () {
  console.log("Successfully connected to destination broker");
});

source.on('message', function (topic, message) {
  // message is Buffer
  var messageString = message.toString();

  if (config.log === "true") {
    console.log(topic + ": " + messageString + " => " + config.destination.topic);
  }

  destination.publish(config.destination.topic, messageString, function(err) {
    if (err) {
      console.log("Failed to publish: " + messageString);
    }
  });
});

if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function () {
  //graceful shutdown
  console.log("Shutting down");
  source.end();
  destination.end();
  process.exit();
});