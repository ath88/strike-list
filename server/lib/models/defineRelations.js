function defineRelations(db, callback) {
    db.models.purchases.belongsTo(db.models.users, { foreignKey: "userId" });
    db.models.purchases.belongsTo(db.models.lists, { foreignKey: "listId" });
    db.models.purchases.belongsTo(db.models.items, { foreignKey: "itemId" });
    db.models.lists.hasMany(db.models.purchases, { foreignKey: "listId" });

    callback();
}

module.exports = defineRelations;
