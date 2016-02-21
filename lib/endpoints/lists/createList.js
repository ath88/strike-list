module.exports = function createListEndpoint (req, res) {
    var newList = {
        description: req.body.description,
        date: new Date()
    };

    req.model.lists.create(newList).then((list) => {
        req.log.info("List created");
        res.status(200).send({ list: list });
    }).catch((error) => {
        if(error.name === "SequelizeValidationError") {
            req.log.warn("Validation error: " + error.message );
            return res.status(400).send({ reason: "Validation error: " + error.message });
        }
        req.log.error(error, newList, "Could not create list");
        return res.status(500).send({ reason: "Could not create list" });
    });
};
