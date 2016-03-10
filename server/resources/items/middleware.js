module.exports = function itemMiddleware(req, res, next) {
    var itemId = req.params.itemId;

    req.models.items.findById(itemId).then((item) => {
        if(!item) {
            req.log.warn("Could not find item: " + itemId);
            return res.status(404).send({
                code: "NotFound",
                reason: "Could not find item: " + itemId
            });
        }
        req.log = req.log.child({ itemId: itemId });
        req.itemId = itemId;
        req.item = item;
        return next();
    }).catch((error) => {
        req.log.error(error, "Could not get item");
        return res.status(500).send("Could not get item: " + itemId);
    });
};
