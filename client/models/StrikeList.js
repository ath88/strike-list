var AmpersandModel = require("ampersand-model");
var moment = require("moment");

module.exports = AmpersandModel.extend({
    props: {
        id: "any",
        open: ["boolean", true, true],
        createdAt: ["string", true]
    },
    parse: function(attrs) {
        if(attrs.list) {
            attrs = attrs.list;
        }
        attrs.id = attrs.listId;
        delete attrs.listId;

        return attrs;
    },
    derived: {
        name: {
            deps: ["createdAt"],
            fn: function() {
                return moment(this.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
            }
        }
    }
});
