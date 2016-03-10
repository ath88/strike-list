var express = require("express");

module.exports = function() {
    var app = express();

    app.use( "/:domainId", require("./domains/middleware.js"));

    app.post("/",          require("./domains/create.js"));
    app.get( "/",          require("./domains/search.js"));
    app.get( "/:domainId", require("./domains/get.js"));

    return app;
};
