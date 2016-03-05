module.exports = function resetEndpoint (req, res) {
    req.db.drop().then(() => {
        req.db.sync().then(() => {
            req.log.warn("ORM reset");
            res.status(200).send();
        });
    });
};
