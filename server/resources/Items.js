var express = require("express");

module.exports = function() {
    var app = express();

    app.use( "/:itemId", require("./items/middleware.js"));

    app.post("/",        require("./items/create.js"));
    app.get( "/",        require("./items/search.js"));
    app.get( "/:itemId", require("./items/get.js"));

    return app;
};
