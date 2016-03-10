module.exports = function deactivateUserEndpoint(req, res) {
    req.user.destroy().then(() => {
        req.log.info("Deleted user");
        res.status(200).send({ user: req.user });
    }).catch((error) => {
        req.log.error(error, "Could not delete user");
        res.status(500).send("Could not delete user");
    });
};
