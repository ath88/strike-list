var express = require("express");

var bodyParser = require("body-parser");
var cors = require("cors");

var Model = require("./Model.js");

var logMiddleware = require("./middleware/log.js");
var modelMiddleware = require("./middleware/model.js");

var DomainsResource = require("./resources/Domains.js");
var UsersResource = require("./resources/Users.js");

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

        app.use(   "/lists/:listId",                        require("./middleware/lists.js"));

        app.post(  "/lists",                                require("./endpoints/lists/createList.js"));
        app.get(   "/lists/",                               require("./endpoints/lists/getLists.js"));
        app.get(   "/lists/:listId",                        require("./endpoints/lists/getList.js"));
        app.post(  "/lists/:listId/close",                  require("./endpoints/lists/closeList.js"));

        app.use(   "/items/:itemId",                        require("./middleware/items.js"));

        app.post(  "/items",                                require("./endpoints/items/createItem.js"));
        app.get(   "/items",                                require("./endpoints/items/getItems.js"));
        app.get(   "/items/:itemId",                        require("./endpoints/items/getItem.js"));

        app.use("/domains", new DomainsResource());
        app.use("/users",   new UsersResource());

        app.get("/", (req, res) => { res.send({ status: "alive" }); });

        if(config.util.getEnv("NODE_ENV") === "development") {
            app.post("/reset", resetEndpoint);
        }

        callback(null, app);
    });
};
