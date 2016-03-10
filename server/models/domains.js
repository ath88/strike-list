var Sequelize = require("sequelize");

module.exports = function domains(db, callback) {
    db.define("domains", {
        domainId:   { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        domainName: { type: Sequelize.STRING,  allowNull: false, unique: true },
        balance:    { type: Sequelize.FLOAT }
    });

    callback();
};
