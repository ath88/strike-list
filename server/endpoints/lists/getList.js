module.exports = function getListEndpoint(req, res) {
    req.list.getPurchases().then((purchases) => {
        req.log.info("List retrieved");
        res.status(200).send({ list: req.list, purchases: purchases });
    });
};
