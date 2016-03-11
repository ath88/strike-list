var express = require("express");

var bodyParser = require("body-parser");
var cors = require("cors");
var logMiddleware = require("./middleware/log.js");
var modelMiddleware = require("./middleware/model.js");
var domainMiddleware = require("./middleware/domain.js");

var Model = require("./Model.js");


var DomainsResource = require("./resources/Domains.js");
var UsersResource = require("./resources/Users.js");
var ListsResource = require("./resources/Lists.js");
var ItemsResource = require("./resources/Items.js");

var resetEndpoint = require("./endpoints/reset.js");

module.exports = function(config, log, callback) {
    var app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.use("/", logMiddleware(log));

    Model(config, log, (error, db) => {
        if(error) {
            throw error;
        }

        app.use("/", modelMiddleware(db));

        if(config.util.getEnv("NODE_ENV") === "development") {
            app.settings["subdomain offset"] = 1;
            app.post("/reset", resetEndpoint);
        }

        app.use("/", domainMiddleware);

        app.use("/",        new DomainsResource());
        app.use("/users",   new UsersResource());
        app.use("/lists",   new ListsResource());
        app.use("/items",   new ItemsResource());

        callback(null, app);
    });
};
