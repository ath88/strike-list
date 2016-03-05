var Sequelize = require("sequelize");

function definePurchases(db, callback) {
    db.define("purchases", {
        purchaseId:  { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        amount: { type: Sequelize.INTEGER, allowNull: false, validation: { min: 1 } }
    });

    callback();
}

module.exports = definePurchases;
