var express = require("express");

var bodyParser = require("body-parser");
var cors = require("cors");

var Model = require("./Model.js");

var logMiddleware = require("./middleware/log.js");
var modelMiddleware = require("./middleware/model.js");

var DomainsResource = require("./resources/Domains.js");

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

        app.use(   "/users/:userId",                        require("./middleware/users.js"));

        app.post(  "/users",                                require("./endpoints/users/createUser.js"));
        app.get(   "/users",                                require("./endpoints/users/getUsers.js"));
        app.get(   "/users/:userId",                        require("./endpoints/users/getUser.js"));
        app.delete("/users/:userId",                        require("./endpoints/users/deleteUser.js"));
        app.post(  "/users/:userId/activate",               require("./endpoints/users/activateUser.js"));
        app.post(  "/users/:userId/deactivate",             require("./endpoints/users/deactivateUser.js"));
        app.post(  "/users/:userId/addBalance",             require("./endpoints/users/addBalance.js"));
        app.post(  "/users/:userId/buy/:itemId/in/:listId", require("./endpoints/users/buyItemInList.js"));

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

        app.get("/", (req, res) => { res.send({ status: "alive" }); });

        if(config.util.getEnv("NODE_ENV") === "development") {
            app.post("/reset", resetEndpoint);
        }

        callback(null, app);
    });
};
