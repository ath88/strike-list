var View = require("ampersand-view");

module.exports = View.extend({
    template: "<li class=\"person list-group-item container\"><a data-hook=\"name\"></a></li>",
    bindings: {
        "model.name": "[data-hook~=name]"
    }
});
