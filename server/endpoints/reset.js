module.exports = function resetEndpoint(req, res) {
    req.db.drop().then(() => {
        return req.db.sync();
    }).then(() => {
        var newDomain = {
            name: "",
            minBalance: 0
        };
        return req.model.domains.create(newDomain);
    }).then(() => {
        req.log.warn("Database was reset");
        res.status(200).send({ status: "success" });
    });
};
