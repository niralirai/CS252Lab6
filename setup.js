// TODO - sudo apt install mysql-server ??????

var mysql = require('mysql');
var p = process.argv[2];
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: p
});
connection.connect(function(error) {
  if (error) { throw error; }
  var createDb = "CREATE DATABASE IF NOT EXISTS whered_it_go";
  connection.query(createDb, function (e1, r1, f1) {
    // If error (else create table)
    if (e1) { throw e1; }
    var useDb = "USE whered_it_go";
    connection.query(useDb, function (e2, r2, f2) {
      var createTable = "CREATE TABLE users (firstname VARCHAR(35), lastname VARCHAR(35), email VARCHAR(254), password VARCHAR(20));";
      connection.query(createTable, function (e3, r3, f3) {
        // If error (else success)
        if (e3) { throw e3; }
        console.log("Database created!");
        connection.end();
      });
    });
  });
});