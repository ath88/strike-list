var async = require("async");
var express = require("express");
var serverApplication = require("../server/server.js");
var clientApplication = require("../client/client.js");

var Service = function(config, log) {
    this.config = config;
    this.log = log;
};

Service.prototype.start = function() {
    var app = express();

    async.parallel({
        server: async.apply(serverApplication, this.config, this.log),
        client: async.apply(clientApplication, this.config, this.log)
    }, (error, results)  => {
        app.use("/apiv1/", results.server);
        app.use("/", results.client);
        app.listen(this.config.port, this.config.host);

        this.log.info("Service is running at http://" + this.config.host + ":" + this.config.port);
    });
};


module.exports = Service;
