/**
 * References:
 *  - https://github.com/expressjs/body-parser
 *  - https://stackoverflow.com/questions/13337288/expressjs-sending-a-file-from-parent-directory/22336660
 *  - https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
 */

// Express is better for handling routing
var express = require('express');
var app = express();
var port = 4200;

var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());  // Parses as json and puts object into req.body
app.use(bodyParser.urlencoded({extended: true}));

// TODO - other html pages as needed

// Send GET request and route to the splash page
app.get('/', function(request, response) {
  response.sendFile("splash.html", {'root' : './'});
  console.log(request.headers);
});

// Send GET request and route to the main page
app.get('/main', function(request, response) {
  response.sendFile("mainPage.html", {'root' : './'});
  console.log(request.headers);
});

// TODO Send POST request (for security) and route to login page
app.get('/login', function(request, response) {
  response.sendFile("login.html", {'root' : './'});
  console.log(request.headers);
});

// TODO Send POST request (for security) and route to signup page
app.get('/signup', function(request, response) {
  response.sendFile("signup.html", {'root' : './'});
  console.log(request.headers);
});

////////This stuff can be ignored I was figuring things out//////////
//app.use((request, response, next) => {
  //print the server started and the headers
 // console.log("Server started on port" + port);
 // console.log("Headers: ");
 // console.log(request.headers);
 // next();
//});
//app.use((request, response, next) => {
  //next();
//});
//app.get('/', (request, response) => {
//  response.json({
   //maybe we need this for someting?
//  });
// });
////////////////////////////////////////

app.listen(port);
console.log("Server started on port " + port);
