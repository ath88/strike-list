var Sequelize = require("sequelize");

module.exports = function items(db, callback) {
    db.define("items", {
        itemId:     { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name:       { type: Sequelize.TEXT, allowNull: false },
        price:      { type: Sequelize.FLOAT, allowNull: false, validation: { min: 0 } },
        active:     { type: Sequelize.BOOLEAN, defaultValue: true },
        domainName: { type: Sequelize.STRING, allowNull: false }
    });

    callback();
};
