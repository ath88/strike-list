var express = require("express");

module.exports = function() {
    var app = express();

    app.use(   "/:userId",                        require("./users/middleware.js"));

    app.post(  "/",                               require("./users/create.js"));
    app.get(   "/",                               require("./users/search.js"));
    app.get(   "/:userId",                        require("./users/get.js"));
    app.delete("/:userId",                        require("./users/delete.js"));
    app.post(  "/:userId/activate",               require("./users/activate.js"));
    app.post(  "/:userId/deactivate",             require("./users/deactivate.js"));
    app.post(  "/:userId/addBalance",             require("./users/addBalance.js"));
    app.post(  "/:userId/buy/:itemId/in/:listId", require("./users/buyItemInList.js"));

    return app;
};
