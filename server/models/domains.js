var Sequelize = require("sequelize");

module.exports = function domains(db, callback) {
    db.define("domains", {
        domainId:   { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name:       { type: Sequelize.STRING,  allowNull: false, unique: true },
        minBalance: { type: Sequelize.FLOAT,   allowNull: true,  defaultValue: null }
    });

    callback();
};
