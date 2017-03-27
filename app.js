var express = require('express');
var expressMetrics = require('express-metrics');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('front-end'));

var serverPort = process.env.SERVER_PORT || 8000;
var metricsPort = process.env.METRICS_PORT || 8091;

app.use(expressMetrics({
  port: metricsPort
}));

var error = function(msg) {
  throw msg;
};

var dbHost = process.env.DB_HOST || error("Missing configuration: DB_HOST");
var dbPort = process.env.DB_PORT || error("Missing configuration: DB_PORT");
var dbUser = process.env.DB_USER || error("Missing configuration: DB_USER");
var dbPassword = process.env.DB_PASSWORD || error("Missing configuration: DB_PASSWORD");
var dbName = process.env.DB_NAME || error("Missing configuration: DB_NAME");

connection.init(dbHost, dbPort, dbUser, dbPassword, dbName);
routes.configure(app);

var server = app.listen(serverPort, function() {
  console.log('Server listening on port ' + server.address().port);
});
