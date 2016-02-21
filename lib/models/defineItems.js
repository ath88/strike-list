var Sequelize = require("sequelize");

function defineItems(db, callback) {
    db.define("items", {
        itemId:  { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name:    { type: Sequelize.TEXT, allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false, validation: { min: 0 } },
        active:  { type: Sequelize.BOOLEAN, defaultValue: true }
    });

    callback();
}

module.exports = defineItems;
