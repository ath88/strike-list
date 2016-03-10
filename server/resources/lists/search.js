module.exports = function searchForLists(req, res) {
    req.models.lists.findAll({ where: req.query }).then((lists) => {
        req.log.info("Lists retrieved");
        res.status(200).send({ lists: lists });
    }).catch((error) => {
        req.log.error(error, "Could not retrieve lists");
        return res.status(500).send("Could not retrieve lists");
    });

};
