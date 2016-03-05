var express = require("express");
var serverApplication = require("../server/application.js");

function Service(config, log) {
    this.config = config;
    this.log = log;

    var app = express();

    serverApplication(config, log, (error, serverApp) => {
        app.use("/apiv1/", serverApp);

        this.app = app;
    });
}

Service.prototype.start = function() {
    if(this.app){
        this.log.info("Service is running at http://" + this.config.host + ":" + this.config.port);
        return this.app.listen(this.config.port, this.config.host);
    }
    this.log.info("Waiting for app to be ready..");
    setTimeout(this.start.bind(this), 100);
};

module.exports = Service;
