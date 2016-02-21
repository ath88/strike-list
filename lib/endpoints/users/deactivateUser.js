module.exports = function deactivateUserEndpoint (req, res) {
    if(!req.user.active) {
        req.log.error("User already deactivated");
        return res.status(400).send({
            code: "InvalidRequest",
            reason: "User already deactivated"
        });
    }

    req.user.active = false;
    req.user.save().then(() => {
        req.log.info("Deactivated user");
        res.status(200).send({ user: req.user });
    }).catch((error) => {
        req.log.error(error, "Could not deactivate user");
        res.status(500).send({
            code: "InternalError",
            reaseon: "Could not deactivate user"
        });
    });
};
