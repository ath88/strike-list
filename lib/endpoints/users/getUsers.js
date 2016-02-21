module.exports = function getUsersEndpoint (req, res) {
    req.model.users.findAll({ where: req.query }).then((users) => {
        req.log.info("Users retrieved");
        res.status(200).send({ users: users });
    }).catch((error) => {
        req.log.error(error, "Could not retrieve users");
        return res.status(500).send("Could not retrieve users");
    });

};
