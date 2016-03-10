var app = require("ampersand-app");
var Router = require("ampersand-router");
var StrikeLists = require("./pages/StrikeLists.js");

module.exports = Router.extend({
    routes: {
        "": "strikelists",
        "(*path)": "catchAll"
    },

    strikelists: function() {
        app.trigger("page", new StrikeLists({
            collection: app.lists
        }));
    },

    catchAll: function(path) {
        console.log("Didn't find path: " + path);
        this.redirectTo("");
    }
});
