module.exports = function getItemEndpoint (req, res) {
    req.log.info("Item retrieved");
    res.status(200).send({ item: req.item });
};
