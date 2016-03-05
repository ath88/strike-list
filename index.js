var log = require("bunyan").createLogger({ name: "strike-list", src: true });

var config = require("config");
log.info("Current environment is '" + config.util.getEnv("NODE_ENV") + "'");

var Application = require("./server/lib/Application.js");

var appliation = new Application(config, log);

appliation.start();
