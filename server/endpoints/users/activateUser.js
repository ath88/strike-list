module.exports = function activateUserEndpoint (req, res) {
    if(req.user.active) {
        req.log.error("User already activated");
        return res.status(400).send({
            code: "InvalidRequest",
            reason: "User already activated"
        });
    }

    req.user.active = true;
    req.user.save().then(() => {
        req.log.info("Activated user");
        res.status(200).send({ user: req.user });
    }).catch((error) => {
        req.log.error(error, "Could not activate user");
        res.status(500).send({
            code: "InternalError",
            reaseon: "Could not activate user"
        });
    });
};
