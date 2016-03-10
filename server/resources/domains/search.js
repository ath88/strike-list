module.exports = function searchForDomains(req, res) {
    req.models.domains.findAll({ where: req.query }).then((domains) => {
        req.log.info("Domains retrieved");
        res.status(200).send({ domains: domains });
    }).catch((error) => {
        req.log.error(error, "Could not retrieve domains");
        return res.status(500).send("Could not retrieve domains");
    });

};
