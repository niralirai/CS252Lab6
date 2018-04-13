/**
 * References:
 *  1. https://github.com/expressjs/body-parser
 *  2. https://expressjs.com/en/advanced/developing-template-engines.html
 *  3. https://github.com/mysqljs/mysql
 *  4. https://dev.mysql.com/doc/refman/5.7/en/tutorial.html
 *  5. https://www.npmjs.com/package/client-sessions
 * 
 * Database (whered_it_go) tables format: `SHOW TABLES;`
 *    +-------------------------+
 *    | Tables_in_whered_it_go  |
 *    +-------------------------+
 *    | users                   |
 *    +-------------------------+
 * 
 * Database (whered_it_go) table (users) format: `USE whered_it_go; DESCRIBE users;`
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

// Parses as json and puts object into req.body (ref 1)
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

/**
 * Set up mysql, declare connection, and try to connect (ref 3)
 * https://github.com/mysqljs/mysql#establishing-connections
 * https://github.com/mysqljs/mysql#connection-options
 */
var mysql = require('mysql');
var p = process.argv[2];
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: p,
  database: 'whered_it_go'
});
connection.connect(function(error) {
  if (error) { throw error; }
  console.log('connected as id ' + connection.threadId);
});

// Set up session cookies for users (ref 5)
var sessions = require('client-sessions');
app.use(sessions({
  cookieName: 'mySession',
  secret: 'iaraniratakilarinniakamffohhcirugerg',
  duration: 30 * 60 * 1000,
  cookie: {
    ephemeral: true,
  }
}));

// Make function(s) to check user authentication
function needsLoggedIn(request, response, next) {
  // If there is not a user for this session (else continue)
  if (!request.mySession.user) {
    request.mySession.reset();
    response.redirect("login");
  } else {
    next();
  }
}

function needsNotLoggedIn(request, response, next) {
  // If there is a user for this session (else continue)
  if (request.mySession.user) {
    response.redirect("main");
  } else {
    next();
  }
}

// Set views directory and template engine (ref 2)
app.set('views', './views');
app.set('view engine', 'ejs')

/**
 * GET requests sent when routing to the page
 *  - / --> splash.ejs
 *  - /main --> main.ejs (must be logged in)
 *  - /login --> login.ejs (must NOT be logged in)
 *  - /signup --> signup.ejs (must NOT be logged in)
 */

// TODO - other html pages as needed
app.get('/', function(request, response) {
  response.render("splash");
  console.log("GET /");
  console.log(request.headers);
  console.log("\n");
});

app.get('/main', needsLoggedIn, function(request, response) {
  response.render("main");
  console.log("GET /main");
  console.log(request.headers);
  console.log(request.mySession.user);
  console.log("\n");
});

app.get('/login', needsNotLoggedIn, function(request, response) {
  response.render("login");
  console.log("GET /login");
  console.log(request.headers);
  console.log("\n");
});

app.get('/signup', needsNotLoggedIn, function(request, response) {
  response.render("signup");
  console.log("GET /signup");
  console.log(request.headers);
  console.log("\n");
});

/**
 * POST requests sent when submitting a form (ref 3)
 *  - /main
 *  - /login
 *  - /signup
 * 
 * https://github.com/mysqljs/mysql#performing-queries
 * https://github.com/mysqljs/mysql#escaping-query-values
 * https://expressjs.com/en/api.html#app.locals
 */

app.post('/main', function(request, response) {
  console.log("POST /main");
  console.log(request.body);
  console.log(request.headers);
  console.log("\n");

  /**
   * Can POST with calculate or logout; logout body is empty
   * If body is empty (else Calculate button was pressed)
   */
  if (Object.keys(request.body).length === 0) {
    request.mySession.reset();
    response.redirect("/");
  } else {
    // Get form field values
    let rent = Number(request.body.rent == '' ? '0' : request.body.rent);
    let utilities = Number(request.body.utilities == '' ? '0' : request.body.utilities);
    let cards = Number(request.body.cards == '' ? '0' : request.body.cards);
    let auto = Number(request.body.auto == '' ? '0' : request.body.auto);
    let internet = Number(request.body.internet == '' ? '0' : request.body.internet);
    let food = Number(request.body.food == '' ? '0' : request.body.food);
    let clothing = Number(request.body.clothing == '' ? '0' : request.body.clothing);

    response.send("Successfully got all values as type Number. Create page that can show results.");
  }
});

app.post('/login', function(request, response) {
  console.log("POST /login");
  console.log(request.body);
  console.log(request.headers);
  console.log("\n");

  // Get form field values
  let email = request.body.email;
  let password = request.body.password;

  /**
   * Create MySQL requests to check email
   *  - 'results' stores MySQL "return value" as object of strings (table entries), length = 1
   *  - 'fields' stores metadata for each result
   */
  var checkEmail = "SELECT * FROM users WHERE email = ?";
  connection.query(checkEmail, [email], function (error, results, fields) {
    // If error (else if email not found, else if passwords don't match, else redirect)
    if (error) {
      throw error;
    } else if (results.length <= 0) {
      console.log("This email is was not found. Create error message that can be displayed on login page");
      response.redirect("login");
    } else if (results[0].password !== password) {
      console.log("This password was incorrect. Create error message that can be displayed on login page");
      response.redirect("login");
    } else {
      // Set cookieName: mySession attribute for request and app.locals for response, then redirect
      request.mySession.user = email;
      response.redirect("main");
      // TODO - customize page for person?
    }
  });
});

app.post('/signup', function(request, response) {
  console.log("POST /signup");
  console.log(request.body);
  console.log(request.headers);
  console.log("\n");

  // Get form field values
  let firstname = request.body.firstname;
  let lastname = request.body.lastname;
  let email = request.body.email;
  let password = request.body.password;
  let password2 = request.body.password2;

  // Create MySQL requests to check email
  var checkEmail = "SELECT * FROM users WHERE email = ?";
  connection.query(checkEmail, [email], function (error, results, fields) {
    // If error (else if email already used, else if passwords don't match, else save and redirect)
    if (error) {
      throw error;
    } else if (results.length > 0) {
      console.log("This email is already being used. Create error message that can be displayed on signup page");
      response.redirect("signup");
    } else if (password !== password2) {
      console.log("Re-typed password doesn't match. Create error message that can be displayed on signup page");
      response.redirect("signup");
    } else {
      var addUser = "INSERT INTO users VALUES ('" + firstname + "', '" + lastname + "', '" + email + "', '" + password + "');";
      connection.query(addUser, function (e, r, f) {
        if (e) throw e;
        response.redirect("login");
        // TODO - keep them signed in!!!!
      }); 
    }
  });
});

app.get('/page2', needsLoggedIn, function(request, response) {
  response.render("page2", {msg: ''});
  console.log("GET /page2");
  console.log(request.headers);
  console.log("\n");
});


app.listen(port);
console.log("Server started on port " + port);
