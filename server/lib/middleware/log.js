function logMiddleware (log, req, res, next) {
    log.info(req.method + " " + req.url);
    req.log = log;
    return next();
}

module.exports = (log) => {
    return logMiddleware.bind(null, log);
};
