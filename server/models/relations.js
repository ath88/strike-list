module.exports = function relations(db, callback) {
    db.models.purchases.belongsTo(db.models.users, { foreignKey: "userId" });
    db.models.purchases.belongsTo(db.models.lists, { foreignKey: "listId" });
    db.models.purchases.belongsTo(db.models.items, { foreignKey: "itemId" });

    db.models.lists.hasMany(db.models.purchases, { foreignKey: "listId" });

    db.models.domains.hasMany(db.models.users, { foreignKey: "domainName" });
    db.models.domains.hasMany(db.models.lists, { foreignKey: "domainName" });
    db.models.domains.hasMany(db.models.items, { foreignKey: "domainName" });

    callback();
};
