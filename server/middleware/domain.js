module.exports = function modelMiddleware(req, res, next) {
    if(req.subdomains.length > 1) {
        res.status(400).send({
            code: "InvalidArgument",
            reason: "Too many subdomains"
        });
    }

    var domainName = req.subdomains[0];
    if(!domainName) {
        domainName = "";
    }

    req.models.domains.findById(domainName).then((domain) => {
        if(!domain && (req.method !== "POST" && req.path !== "/")) {
            req.log.warn("Could not find domain: " + domainName);
            return res.status(404).send({
                code: "NotFound",
                reason: "Could not find domain: " + domainName
            });
        }
        req.log = req.log.child({ domainId: domainName });
        req.domainName = domainName;
        req.contextDomain = domain;
        return next();
    }).catch((error) => {
        req.log.error(error, "Could not get domain");
        return res.status(500).send("Could not get domain: " + domainName);
    });
};
