module.exports = function createItemEndpoint(req, res) {
    var newItem = {
        name: req.body.name,
        price: req.body.price
    };

    req.model.items.create(newItem).then((item) => {
        req.log.info("Item created");
        res.status(200).send({ item: item });
    })
    .catch((error) => {
        if(error.name === "SequelizeValidationError") {
            req.log.warn("Validation error: " + error.message );
            return res.status(400).send({ reason: "Validation error: " + error.message });
        }
        req.log.error(error, "Could not create item");
        return res.status(500).send({ reason: "Could not create item" });
    });
};
