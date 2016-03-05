var Sequelize = require("sequelize");
var async = require("async");

var defineUsers = require("./models/defineUsers.js");
var defineLists = require("./models/defineLists.js");
var defineItems = require("./models/defineItems.js");
var definePurchases = require("./models/definePurchases.js");
var defineRelations = require("./models/defineRelations.js");

var Model = function(config, log, callback) {
    var db = new Sequelize("postgres://postgres:password@localhost/strike-list", {
        logging: false
    });

    async.parallel([
        (callback) => defineUsers(db, callback),
        (callback) => defineItems(db, callback),
        (callback) => defineLists(db, callback),
        (callback) => definePurchases(db, callback)
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
