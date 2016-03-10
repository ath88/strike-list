module.exports = function listMiddleware(req, res, next) {
    var listId = req.params.listId;

    req.models.lists.findById(listId).then((list) => {
        if(!list) {
            req.log.warn("Could not find list: " + listId);
            return res.status(404).send({
                code: "NotFound",
                reason: "Could not find list: " + listId
            });
        }
        req.log = req.log.child({ listId: listId });
        req.listId = listId;
        req.list = list;
        return next();
    }).catch((error) => {
        req.log.error(error, "Could not get list");
        return res.status(500).send("Could not get list: " + listId);
    });
};
