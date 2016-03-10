module.exports = function domainMiddleware(req, res, next) {
    var domainId = req.params.domainId;

    req.models.domains.findById(domainId).then((domain) => {
        if(!domain) {
            req.log.warn("Could not find domain: " + domainId);
            return res.status(404).send({
                code: "NotFound",
                reason: "Could not find domain: " + domainId
            });
        }
        req.log = req.log.child({ itemId: domainId });
        req.domainId = domainId;
        req.item = domain;
        return next();
    }).catch((error) => {
        req.log.error(error, "Could not get domain");
        return res.status(500).send("Could not get domain: " + domainId);
    });
};
