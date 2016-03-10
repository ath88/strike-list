module.exports = function addBalanceToUser(req, res) {
    var amount = req.body.amount;
    if(amount < 0) {
        req.log.error("Amount must be positive");
        return res.status(400).send({
            code: "Invalid Argument",
            reason: "Amount must be positive"
        });
    }

    req.user.balance = (req.user.balance + amount) + "";
        // string is needed due to wierd validation behaviour
        // https://github.com/sequelize/sequelize/issues/5365

    req.user.save().then(() => {
        req.log.info("Added balance to user " + amount);
        res.status(200).send({ user: req.user });
    }).catch((error) => {
        req.log.error(error, "Could not add balance to user");
        return res.status(500).send("Could not add balance to user");
    });
};
