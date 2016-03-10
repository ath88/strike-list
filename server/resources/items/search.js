module.exports = function searchForItems(req, res) {
    req.models.items.findAll({ where: req.query }).then((items) => {
        req.log.info("Items retrieved");
        res.status(200).send({ items: items });
    }).catch((error) => {
        req.log.error(error, "Could not retrieve items");
        return res.status(500).send("Could not retrieve items");
    });

};
