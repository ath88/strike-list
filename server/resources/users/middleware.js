module.exports = function userMiddleware(req, res, next) {
    var userId = req.params.userId;

    req.models.users.findById(userId).then((user) => {
        if(!user) {
            req.log.warn("Could not find user: " + userId);
            return res.status(404).send({
                code: "NotFound",
                reason: "Could not find user: " + userId
            });
        }
        req.log = req.log.child({ userId: userId });
        req.userId = userId;
        req.user = user;
        return next();
    }).catch((error) => {
        req.log.error(error, "Could not get user");
        return res.status(500).send("Could not get user: " + userId);
    });
};
