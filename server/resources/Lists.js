var express = require("express");

module.exports = function() {
    var app = express();

    app.use( "/:listId",       require("./lists/middleware.js"));

    app.post("/",              require("./lists/create.js"));
    app.get( "/",              require("./lists/search.js"));
    app.get( "/:listId",       require("./lists/get.js"));
    app.post("/:listId/close", require("./lists/close.js"));

    return app;
};
