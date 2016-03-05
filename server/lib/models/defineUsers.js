var Sequelize = require("sequelize");

function defineUsers(db, callback) {
    db.define("users", {
        userId:  { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name:    { type: Sequelize.TEXT, allowNull: false },
        balance: { type: Sequelize.FLOAT, defaultValue: 0, validate: { min: 0 } },
            // string is needed due to wierd validation behaviour
            // https://github.com/sequelize/sequelize/issues/5365
        active:  { type: Sequelize.BOOLEAN, defaultValue: true }
    });

    callback();
}

module.exports = defineUsers;
