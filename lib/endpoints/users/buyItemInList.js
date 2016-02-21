module.exports = function buyItemInList (req, res) {
    var amount = req.body.amount;
    if(!amount || amount < 0) {
        req.log.error("Amount must be positive");
        return res.status(400).send({
            code: "Invalid Argument",
            reason: "Amount must be positive"
        });
    }

    var newPurchase = {
        userId: req.params.userId,
        itemId: req.params.itemId,
        listId: req.params.listId,
        amount: amount
    };

    req.model.items.findById(req.params.itemId).then((item) => {
        if (!item) {
            throw "no item";
        }
        req.user.balance = (req.user.balance - amount * item.price) + "";
            // string is needed due to wierd validation behaviour
            // https://github.com/sequelize/sequelize/issues/5365

        return req.user.save();
    }).then(() => {
        return req.model.purchases.create(newPurchase);
    }).then((purchase) => {
        req.log.info("Purchase made");
        res.status(200).send({ user: req.user, purchase: purchase });
    }).catch((error) => {
        if(error === "no item") {
            req.log.error("Could not find item");
            return res.status(404).send("Could not find item");
        }
        if(error.name === "SequelizeValidationError") {
            req.log.error("Balance too low");
            return res.status(400).send("Balance too low");
        }
        req.log.error(error, "Could not make purchase");
        return res.status(500).send("Could not make purchase");
    });
/*
    if(error) {
    }
*/

};
