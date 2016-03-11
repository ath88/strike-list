var express = require("express");

module.exports = function() {
    var app = express();

    app.post("/", require("./domains/create.js"));
    app.get( "/", require("./domains/get.js"));

    return app;
};
