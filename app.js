var express = require('express');
var expressMetrics = require('express-metrics');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('front-end'));

// TODO: inject config / environment variable
var serverPort = 8000;
var metricsPort = 8091;

// start a metrics server
app.use(expressMetrics({
  port: metricsPort
}));

connection.init();
routes.configure(app);

var server = app.listen(serverPort, function() {
  console.log('Server listening on port ' + server.address().port);
});
