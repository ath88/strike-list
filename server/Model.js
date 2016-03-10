var Sequelize = require("sequelize");
var async = require("async");

var defineDomains = require("./models/domains.js");
var defineUsers = require("./models/users.js");
var defineLists = require("./models/lists.js");
var defineItems = require("./models/items.js");
var definePurchases = require("./models/purchases.js");
var defineRelations = require("./models/relations.js");

var Model = function(config, log, callback) {
    var db = new Sequelize("postgres://postgres:password@localhost/strike-list", {
        logging: false
    });

    async.parallel([
        (callback) => defineUsers(db, callback),
        (callback) => defineItems(db, callback),
        (callback) => defineLists(db, callback),
        (callback) => definePurchases(db, callback),
        (callback) => defineDomains(db, callback)
    ], (error) => {
        if(error) {
            log.error(error, "Could not create definitions");
            return callback(error);
        }

        defineRelations(db, () => {
            db.sync().then(() => {
                callback(null, db);
            });
        });
    });
};

module.exports = Model;
