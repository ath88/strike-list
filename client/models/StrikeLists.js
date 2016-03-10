var Collection = require("ampersand-rest-collection");
var StrikeList = require("./StrikeList.js");

module.exports = Collection.extend({
    model: StrikeList,
    url: "/apiv1/lists",
    parse: function(response) {
        return response.lists;
    }
});
