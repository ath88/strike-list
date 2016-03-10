var Sequelize = require("sequelize");

module.exports = function users(db, callback) {
    db.define("users", {
        userId:  { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name:    { type: Sequelize.TEXT, allowNull: false },
        balance: { type: Sequelize.FLOAT, defaultValue: 0, validate: { min: 0 } },
        active:  { type: Sequelize.BOOLEAN, defaultValue: true }
    });

    callback();
};
