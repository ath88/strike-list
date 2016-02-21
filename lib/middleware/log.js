function logMiddleware (log, req, res, next) {
    req.log = log;
    return next();
}

module.exports = (log) => {
    return logMiddleware.bind(null, log);
};
