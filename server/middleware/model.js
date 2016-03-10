function modelMiddleware(db, req, res, next) {
    req.db = db;
    req.models = db.models;
    return next();
}

module.exports = (db) => {
    return modelMiddleware.bind(null, db);
};
