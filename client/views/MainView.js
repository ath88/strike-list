var app = require("ampersand-app");
var View = require("ampersand-view");
var ViewSwitcher = require("ampersand-view-switcher");
var localLinks = require("local-links");

module.exports = View.extend({
    template: "<body><main data-hook=\"page-container\"></main><div><a href=\"test\">Link</a></div></body>",
    autoRender: true,
    initialize: function() {
        this.listenTo(app, "page", this.handleNewPage);
    },
    events: {
        "click a[href]": "handleLinkClick"
    },
    render: function() {
        this.renderWithTemplate(this);
        this.pageSwitcher = new ViewSwitcher(this.queryByHook("page-container"));
        return this;
    },

    handleNewPage: function(view) {
        this.pageSwitcher.set(view);
    },

    handleLinkClick: function(e) {
        var localPath = localLinks.pathname(e);
        if(localPath) {
            e.preventDefault();
            app.navigate(localPath);
        }
    }
});
