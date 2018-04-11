/**
 * References:
 *  - https://github.com/expressjs/body-parser
 *  - https://stackoverflow.com/questions/13337288/expressjs-sending-a-file-from-parent-directory/22336660
 *  - https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
 *  - https://expressjs.com/en/advanced/developing-template-engines.html
 *  - https://github.com/mysqljs/mysql
 *  - https://dev.mysql.com/doc/refman/5.7/en/tutorial.html
 * 
 * Database (whered_it_go) table (users) format: `USE users; DESCRIBE users;`
 *    +------------+---------------+
 *    | Field      | Type          |
 *    +------------+---------------+
 *    | firstname  | varchar(35)   |
 *    +------------+---------------+
 *    | lastname   | varchar(35)   |
 *    +------------+---------------+
 *    | email      | varchar(254)  |
 *    +------------+---------------+
 *    | password   | varchar(20)   |
 *    +------------+---------------+
 */

// Express is better for handling routing
var express = require('express');
var app = express();
var port = 4200;

// Parses as json and puts object into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

// Set up mysql and create connection (ref 5)
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  // port: port,
  user: 'root',
  password: 'A2purple?!',
  database: 'whered_it_go'
});  // TODO - don't make hardcoded

// Attempt to connect to database
connection.connect(function(error) {
  if (error) throw error;
  console.log('connected as id ' + connection.threadId);
});

// Set views directory and template engine
app.set('views', './views');
app.set('view engine', 'ejs')

/**
 * GET requests sent when routing to the page
 *  - / --> splash.ejs
 *  - /main --> main.ejs
 *  - /login --> login.ejs
 *  - /signup --> signup.ejs
 */

// TODO - other html pages as needed
app.get('/', function(request, response) {
  response.render("splash");
  console.log("GET /");
  console.log(request.headers);
  console.log("\n");
});

app.get('/main', function(request, response) {
  response.render("main");
  console.log("GET /main");
  console.log(request.headers);
  console.log("\n");
});

app.get('/login', function(request, response) {
  response.render("login");
  console.log("GET /login");
  console.log(request.headers);
  console.log("\n");
});

app.get('/signup', function(request, response) {
  response.render("signup");
  console.log("GET /signup");
  console.log(request.headers);
  console.log("\n");
});

/**
 * POST requests sent when submitting a form
 *  - /login
 *  - /signup
 * TODO - reroute to correct pages and make sure URL follows suit
 */

app.post('/login', function(request, response) {
  console.log("POST /login");
  console.log(request.body);
  console.log(request.headers);
  console.log("\n");

  response.redirect("main");
});

app.post('/signup', function(request, response) {
  console.log("POST /signup");
  console.log(request.body);
  console.log(request.headers);
  console.log("\n");

  let firstname = request.body.firstname;
  let lastname = request.body.lastname;
  let email = request.body.email;
  let password = request.body.password;
  let password2 = request.body.password2;

  if (password === password2) {
    response.redirect("login");
  } else {
    response.send("Password and re-typed password do not match! Reroute accordingly. :(");
  }
});

app.listen(port);
console.log("Server started on port " + port);
