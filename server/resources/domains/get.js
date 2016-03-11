module.exports = function get(req, res) {
    req.log.info("Domain retrieved");
    res.status(200).send({ domain: req.contextDomain });
};
