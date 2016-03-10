var express = require("express");

var bodyParser = require("body-parser");
var cors = require("cors");

var Model = require("./Model.js");

var logMiddleware = require("./middleware/log.js");
var modelMiddleware = require("./middleware/model.js");

var DomainsResource = require("./resources/Domains.js");
var UsersResource = require("./resources/Users.js");
var ListsResource = require("./resources/Lists.js");
var ItemsResource = require("./resources/Items.js");

var resetEndpoint = require("./endpoints/reset.js");

module.exports = function(config, log, callback) {
    var app = express();
    app.use(bodyParser.json());
    app.use(cors());

    Model(config, log, (error, db) => {
        if(error) {
            throw error;
        }

        app.use("/", logMiddleware(log));
        app.use("/", modelMiddleware(db));

        app.use("/domains", new DomainsResource());
        app.use("/users",   new UsersResource());
        app.use("/lists",   new ListsResource());

        app.get("/", (req, res) => { res.send({ status: "alive" }); });

        if(config.util.getEnv("NODE_ENV") === "development") {
            app.post("/reset", resetEndpoint);
        }

        callback(null, app);
    });
};
