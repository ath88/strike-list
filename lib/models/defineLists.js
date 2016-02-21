var Sequelize = require("sequelize");

function defineLists(db, callback) {
    db.define("lists", {
        listId:  { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        open:  { type: Sequelize.BOOLEAN, defaultValue: true }
    });

    callback();
}

module.exports = defineLists;
