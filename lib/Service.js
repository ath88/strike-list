var async = require("async");
var express = require("express");
var serverApplication = require("../server/server.js");
var clientApplication = require("../client/client.js");

function Service(config, log) {
    this.config = config;
    this.log = log;

    var app = express();

    async.parallel({
        server: serverApplication.bind(null, config, log),
        client: clientApplication.bind(null, config, log)
    }, (error, results)  => {
        app.use("/apiv1/", results.server);
        app.use("/", results.client);
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
