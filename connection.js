var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function(host, port, user, password, database) {
    // Could also use connection string URL, e.g.:
    // var connection = mysql.createConnection('mysql://user:pass@host/db?debug=true');
    if (this.pool !== null) {
      throw "Already initialised";
    }
    console.log("Connecting to " + user + "@" + host + ":" + port + "/" + database);
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: host,
      port: port,
      user: user,
      password: password,
      database: database
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
