/**
 * References:
 *  1. https://github.com/expressjs/body-parser
 *  2. https://expressjs.com/en/advanced/developing-template-engines.html
 *  3. https://github.com/mysqljs/mysql
 *  4. https://dev.mysql.com/doc/refman/5.7/en/tutorial.html
 *  5. https://www.npmjs.com/package/client-sessions
 * 
 * request.mySession {
 *  user: "email@email.com",
 *  password: "password",
 *  firstname: "fname",
 *  lastname: "lname",
 *  newUser: true/false
 * }
 */

// Express is better for handling routing
var express = require('express');
var app = express();
var port = process.env.PORT || 4200;

// Parses as json and puts object into req.body (ref 1)
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

/**
 * Set up mysql, declare connection, and try to connect (ref 3)
 * https://github.com/mysqljs/mysql#establishing-connections
 * https://github.com/mysqljs/mysql#connection-options
 * https://github.com/mysqljs/mysql#pooling-connections
 */
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bbb29a8be86d32',
  password: '03394565',
  database: 'heroku_01db060d2e70e87'
});

pool.getConnection(function(error, connection) {
  if (error) { throw error; }
  console.log('connected as id ' + connection.threadId);

  /**
   * POST requests sent when submitting a form (ref 3)
   *  - /login (in pool connection)
   *  - /signup (in pool connection)
   * 
   * https://github.com/mysqljs/mysql#performing-queries
   * https://github.com/mysqljs/mysql#escaping-query-values
   * https://expressjs.com/en/api.html#app.locals
   */
  app.post('/login', function(request, response) {
    console.log("POST /login");
    console.log(request.body);
    console.log(request.headers);
    console.log(request.mySession);
    console.log("\n");
  
    // Get form field values
    let email = request.body.email;
    let password = request.body.password;
  
    /**
     * Create MySQL requests to check email
     *  - 'results' stores MySQL "return value" as object of strings (table entries), length = 1
     *  - 'fields' stores metadata for each result
     */
    var checkEmail = "SELECT * FROM users WHERE email = ?;";
    connection.query(checkEmail, [email], function (error, results, fields) {
      // If error (else if email not found, else if passwords don't match, else redirect)
      if (error) {
        throw error;
        request.mySession.reset();
      } else if (results.length <= 0) {
        response.render("login", {errorMsg: "Email not registered"});
      } else if (results[0].password !== password) {
        response.render("login", {errorMsg: "Incorrect password"});
      } else {
        // Set cookieName: mySession attributes then redirect
        request.mySession.user = email;
        request.mySession.password = password;
        request.mySession.newUser = false;
  
        // Get user's name
        const getName = "SELECT firstname, lastname FROM users WHERE email = \"" + email + "\";";
        connection.query(getName, [email], function (e, r, f) {
          if (e) { throw e; }
          request.mySession.firstname = r[0].firstname;
          request.mySession.lastname = r[0].lastname;
          response.redirect("main");
        })
      }
    });
  });
  
  app.post('/signup', function(request, response) {
    console.log("POST /signup");
    console.log(request.body);
    console.log(request.headers);
    console.log(request.mySession);
    console.log("\n");
  
    // Get form field values
    let firstname = request.body.firstname;
    let lastname = request.body.lastname;
    let email = request.body.email;
    let password = request.body.password;
    let password2 = request.body.password2;
  
    // Create MySQL requests to check email
    var checkEmail = "SELECT * FROM users WHERE email = ?;";
    connection.query(checkEmail, [email], function (error, results, fields) {
      // If error (else if email already used, else if passwords don't match, else save and redirect)
      if (error) {
        throw error;
        request.mySession.reset();
      } else if (results.length > 0) {
        response.render("signup", {errorMsg: "Email already in use"});
      } else if (password !== password2) {
        response.render("signup", {errorMsg: "Re-typed password doesn't match"});
      } else {
        var addUser = "INSERT INTO users VALUES ('" + firstname + "', '" + lastname + "', '" + email + "', '" + password + "');";
        connection.query(addUser, function (e, r, f) {
          if (e) throw e;
          request.mySession.newUser = true;
          response.redirect("login");
          // TODO - keep them signed in!!!!
        }); 
      }
    });
  });

  app.post('/account', function(request, response) {
    console.log("POST /account");
    console.log(request.body);
    console.log(request.headers);
    console.log(request.mySession);
    console.log("\n");

    // Check how many fields submitted (delete == 0, name == 2, password = 3)
    if (Object.keys(request.body).length === 0) {
      var deleteUser = "DELETE FROM users WHERE email = ?;";
      connection.query(deleteUser, [request.mySession.user], function(error, results, fields) {
        // If error (else redirect to splash)
        if (error) { throw error; }
        request.mySession.reset();
        response.redirect("/");
      });
    } else if (Object.keys(request.body).length === 2) {
      // Get form field values
      let firstname = (request.body.firstname == '' ? request.mySession.firstname : request.body.firstname);
      let lastname = (request.body.lastname == '' ? request.mySession.lastname : request.body.lastname);

      var changeName = "UPDATE users SET firstname = ?, lastname = ? WHERE email = ?;";
      connection.query(changeName, [firstname, lastname, request.mySession.user], function(error, results, fields) {
        // If error (else render with success message)
        if (error) { throw error; }
        request.mySession.firstname = firstname;
        request.mySession.lastname = lastname;
        const nameMsg = "Your new name is " + firstname + " " + lastname;
        response.render("account", {nameMsg: nameMsg, passwordMsg: ''});
      });
    } else {
      // Get form field values
      let oldpassword = request.body.oldpassword;
      let password = request.body.password;
      let password2 = request.body.password2;

      // If old password is not correct (else if passwords don't match, else save and render)
      if (oldpassword !== request.mySession.password) {
        response.render("account", {nameMsg: '', passwordMsg: "Old password is incorrect"});
      } else if (password !== password2) {
        response.render("account", {nameMsg: '', passwordMsg: "Re-typed password doesn't match"});
      } else {
        var changePassword = "UPDATE users SET password = ? WHERE email = ?;";
        connection.query(changePassword, [password, request.mySession.user], function(error, results, fields) {
          if (error) { throw error; }
          request.mySession.password = password;
          response.render("account", {nameMsg: '', passwordMsg: "Password successfully updated"});
        });
      }
    }
  });
  console.log("Releasing");
  connection.release();
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
 *  - /account
 *  - /history
 *  - /logout
 */
app.get('/', function(request, response) {
  response.render("splash");
  console.log("GET /");
  console.log(request.headers);
  console.log(request.mySession);
  console.log("\n");
});

app.get('/signup', needsNotLoggedIn, function(request, response) {
  response.render("signup", {errorMsg: ''});
  console.log("GET /signup");
  console.log(request.headers);
  console.log(request.mySession);
  console.log("\n");
});

app.get('/login', needsNotLoggedIn, function(request, response) {
  let msg = (request.mySession.newUser ? 'Log in with new credentials' : '');
  response.render("login", {errorMsg: msg});
  console.log("GET /login");
  console.log(request.headers);
  console.log(request.mySession);
  console.log("\n");
});

app.get('/main', needsLoggedIn, function(request, response) {
  response.render("main", {name: request.mySession.firstname});
  console.log("GET /main");
  console.log(request.headers);
  console.log(request.mySession);
  console.log("\n");
});

app.get('/account', needsLoggedIn, function(request, response) {
  response.render("account", {nameMsg: '', passwordMsg: ''});
  console.log("GET /account");
  console.log(request.headers);
  console.log(request.mySession);
  console.log("\n");
});

app.get('/history', needsLoggedIn, function(request, response) {
  response.send("Make html page for history where users can see previous budget forms");
  console.log("GET /history");
  console.log(request.headers);
  console.log(request.mySession);
  console.log("\n");
});

app.get('/logout', needsLoggedIn, function(request, response) {
  request.mySession.reset();
  response.redirect("/");
  console.log("GET /logout");
  console.log(request.headers);
  console.log(request.mySession);
  console.log("\n");
});

/**
 * POST requests sent when submitting a form (ref 3)
 *  - /main
 * 
 * https://github.com/mysqljs/mysql#performing-queries
 * https://github.com/mysqljs/mysql#escaping-query-values
 * https://expressjs.com/en/api.html#app.locals
 */
app.post('/main', function(request, response) {
  console.log("POST /main");
  console.log(request.body);
  console.log(request.headers);
  console.log(request.mySession);
  console.log("\n");

  if (Object.keys(request.body) == 'again') {
    response.redirect("main");
  } else {
    // Get form field values (0 is planned, 1 is actual)
    let rent0 = Number(request.body.rent[0] == '' ? '0' : request.body.rent[0]);
    let utilities0 = Number(request.body.utilities[0] == '' ? '0' : request.body.utilities[0]);
    let cards0 = Number(request.body.cards[0] == '' ? '0' : request.body.cards[0]);
    let auto0 = Number(request.body.auto[0] == '' ? '0' : request.body.auto[0]);
    let internet0 = Number(request.body.internet[0] == '' ? '0' : request.body.internet[0]);
    let food0 = Number(request.body.food[0] == '' ? '0' : request.body.food[0]);
    let clothing0 = Number(request.body.clothing[0] == '' ? '0' : request.body.clothing[0]);
    let travel0 = Number(request.body.travel[0] == '' ? '0' : request.body.travel[0]);

    let rent1 = Number(request.body.rent[1] == '' ? '0' : request.body.rent[1]);
    let utilities1 = Number(request.body.utilities[1] == '' ? '0' : request.body.utilities[1]);
    let cards1 = Number(request.body.cards[1] == '' ? '0' : request.body.cards[1]);
    let auto1 = Number(request.body.auto[1] == '' ? '0' : request.body.auto[1]);
    let internet1 = Number(request.body.internet[1] == '' ? '0' : request.body.internet[1]);
    let food1 = Number(request.body.food[1] == '' ? '0' : request.body.food[1]);
    let clothing1 = Number(request.body.clothing[1] == '' ? '0' : request.body.clothing[1]);
    let travel1 = Number(request.body.travel[1] == '' ? '0' : request.body.travel[1]);

    const total0 = rent0 + utilities0 + cards0 + auto0 + internet0 + food0 + clothing0 + travel0;
    const spent0 = total0;

    const total1 = rent1 + utilities1 + cards1 + auto1 + internet1 + food1 + clothing1 + travel1;
    const spent1 = total1;

    const diff = total0 - total1;
    
    let dollarDiff = (diff >= 0 ? "$" + diff : "-$" + (diff * -1));

    let msg = (diff >= 0 ? "You're right on track! :)" : "You overspent this term. :(");
   //send the actually spend variables to results to put them in the chart
    response.render("results", {budget: total0, spent: total1, diff: dollarDiff, msg: msg, rent: rent1, utilities: utilities1, cards: cards1, auto: auto1, internet: internet1, food: food1, clothing: clothing1, travel: travel1})
  }
});

app.listen(port);
console.log("Server started on port " + port);
