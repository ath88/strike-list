var View = require("ampersand-view");
var StrikeListView = require("../views/StrikeListView.js");


module.exports = View.extend({
    pageTitle: "Strike Lists",
    template: "<div><h3>Strike lists</h3><ul><main data-hook=\"strike-lists\"></main></ul></div>",
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, StrikeListView, this.queryByHook("strike-lists"));
        if (!this.collection.length) {
            this.collection.fetch();
        }
    }
});
