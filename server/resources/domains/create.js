module.exports = function createDomain(req, res) {
    var newDomain = {
        name: req.domainName,
        minBalance: req.body.minBalance
    };

    req.models.domains.create(newDomain).then((domain) => {
        req.log.info("Domain created");
        res.status(200).send({ domain: domain });
    })
    .catch((error) => {
        if(error.name === "SequelizeValidationError") {
            req.log.warn("Validation error: " + error.message );
            return res.status(400).send({ reason: "Validation error: " + error.message });
        }
        req.log.error(error, "Could not create domain");
        return res.status(500).send({ reason: "Could not create domain" });
    });
};
