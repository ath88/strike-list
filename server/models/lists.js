var Sequelize = require("sequelize");

module.exports = function lists(db, callback) {
    db.define("lists", {
        listId:   { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        open:     { type: Sequelize.BOOLEAN, defaultValue: true },
        domainId: { type: Sequelize.INTEGER, allowNull: false }
    });

    callback();
};
