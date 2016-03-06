var Moonboots = require("moonboots-express");
var express = require("express");

module.exports = function(config, log, callback) {
    var app = express();

    new Moonboots({
        moonboots: {
            main: "./client/application.js",
            developmentMode: config.util.getEnv("NODE_ENV") === "development"
        },
        server: app
    });

    callback(null, app);
};
