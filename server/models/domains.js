var Sequelize = require("sequelize");

module.exports = function domains(db, callback) {
    db.define("domains", {
        name:       { type: Sequelize.STRING, primaryKey: true },
        minBalance: { type: Sequelize.FLOAT,   allowNull: true,  defaultValue: null }
    });

    callback();
};
