var log = require("bunyan").createLogger({ name: "strike-list", src: true });
var config = require("config");
var Service = require("./lib/Service.js");

log.info("Current environment is '" + config.util.getEnv("NODE_ENV") + "'");

new Service(config, log).start();
