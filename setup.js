var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bbb29a8be86d32',
  password: '03394565',
  database: 'heroku_01db060d2e70e87'
});

connection.connect(function(error) {
  if (error) { throw error; }
  var useDb = "USE heroku_01db060d2e70e87;";
    connection.query(useDb, function (e1, r1, f1) {
      if (e1) { throw e1; }
      var createTable = "CREATE TABLE users (firstname VARCHAR(35), lastname VARCHAR(35), email VARCHAR(254), password VARCHAR(20));";
      connection.query(createTable, function (e2, r2, f2) {
        // If error (else success)
        if (e2) { throw e2; }
        var createTable2 = "CREATE TABLE logs (email VARCHAR(254), rent0 INT, utilities0 INT, cards0 INT, auto0 INT, internet0 INT, food0 INT, clothing0 INT, travel0 INT, misc0 INT, total0 INT, rent1 INT, utilities1 INT, cards1 INT, auto1 INT, internet1 INT, food1 INT, clothing1 INT, travel1 INT, misc1 INT, total1 INT, diff INT, time VARCHAR(24));";
        connection.query(createTable2, function (e3, r3, f3) {
          if (e3) { throw e3; }
          console.log("Database created!");
          connection.end();
        });
      });
    });
});