function modelMiddleware (db, req, res, next) {
    req.db = db;
    req.model = db.models;
    return next();
}

module.exports = (db) => {
    return modelMiddleware.bind(null, db);
};
