// TODO - sudo apt install mysql-server ??????

var mysql = require('mysql');
// var p = process.argv[2];
var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bbb29a8be86d32',
  password: '03394565',
  database: 'heroku_01db060d2e70e87'
});
connection.connect(function(error) {
  if (error) { throw error; }

  /*
  var createDb = "CREATE DATABASE IF NOT EXISTS whered_it_go";
  connection.query(createDb, function (e1, r1, f1) {
    // If error (else create table)
    if (e1) { throw e1; }
    
  });
  */

  var useDb = "USE heroku_01db060d2e70e87;";
    connection.query(useDb, function (e1, r1, f1) {
      if (e1) { throw e1; }
      var createTable = "CREATE TABLE users (firstname VARCHAR(35), lastname VARCHAR(35), email VARCHAR(254), password VARCHAR(20));";
      connection.query(createTable, function (e2, r2, f2) {
        // If error (else success)
        if (e2) { throw e2; }
        console.log("Database created!");
        connection.end();
      });
    });
});