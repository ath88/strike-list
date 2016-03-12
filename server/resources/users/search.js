module.exports = function searchForUsers(req, res) {
    req.query.domainName = req.domainName;
    req.models.users.findAll({ where: req.query }).then((users) => {
        req.log.info("Users retrieved");
        res.status(200).send({ users: users });
    }).catch((error) => {
        req.log.error(error, "Could not retrieve users");
        return res.status(500).send("Could not retrieve users");
    });

};
