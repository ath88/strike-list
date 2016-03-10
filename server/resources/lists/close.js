module.exports = function closeList(req, res) {
    if(!req.list.open) {
        req.log.error("List already closed");
        return res.status(400).send({
            code: "InvalidRequest",
            reason: "List already closed"
        });
    }

    req.list.open = false;
    req.list.save().then((list) => {
        req.log.info("Closed list");
        res.status(200).send({ list: list });
    }).catch((error) => {
        req.log.error(error, "Could not close list");
        return res.status(500).send("Could not close list");
    });
};
