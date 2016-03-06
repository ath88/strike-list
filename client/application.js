var app = require("ampersand-app");
var _ = require("lodash");
var Router = require("./router.js");
var MainView = require("./views/MainView.js");
var StrikeLists = require("./models/StrikeLists.js");
var domReady = require("domready");

window.app = app;

app.extend({
    lists: new StrikeLists(),

    router: new Router(),

    init: function() {
        this.mainView = new MainView({
            el: document.body
        });

        this.router.history.start({ pushState: true });
    },

    navigate: function(page) {
        var url = page;
        if(page.charAt(0) === "/") {
            url = page.slice(1);
        }

        this.router.history.navigate(url, {
            trigger: true
        });
    }
});

domReady(_.bind(app.init, app));
