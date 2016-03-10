module.exports = function getUser(req, res) {
    req.log.info("User retrieved");
    res.status(200).send({ user: req.user });
};
