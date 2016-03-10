module.exports = function createUserEndpoint(req, res) {
    var newUser = {
        name: req.body.name
    };

    req.model.users.create(newUser).then((user) => {
        req.log.info("User created");
        res.status(200).send({ user: user });
    })
    .catch((error) => {
        if(error.name === "SequelizeValidationError") {
            req.log.warn("Validation error: " + error.message );
            return res.status(400).send({
                code: "InvalidArgument",
                reason: "Validation error: " + error.message
            });
        }
        req.log.error(error, "Could not create user");
        return res.status(500).send({
            code: "InternalError",
            reason: "Could not create user"
        });
    });
};
