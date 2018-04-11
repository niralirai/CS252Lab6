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

var bodyParser = require('body-parser');
app.use(bodyParser.json());  // Parses as json and puts object into req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

//var admin = require('firebase-admim');
//admin.initializeApp({
//  databaseURL:
//});

/*var config = {
    apiKey: "AIzaSyAKfbDYJM_6rEnYqBgGbQrR5lNqtffjYR0",
    authDomain: "cs252lab6-7604e.firebaseapp.com",
    databaseURL: "https://cs252lab6-7604e.firebaseio.com",
    projectId: "cs252lab6-7604e",
    storageBucket: "cs252lab6-7604e.appspot.com",
    messagingSenderId: "454352118655"
  };
  firebase.initializeApp(config);
*/
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


/*
const http = require('http');
var routeHandler = require('./routeHandler.js');

var server = module.exports = http.createServer((request, response) => {
  var parsedUrl = request.url.substring(1).split('/');
  console.log(parsedUrl[0])
  var routeFunction = routeHandler[parsedUrl[0]];
  if(request.headers.origin){
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200", 'always');
  }
  response.setHeader('Access-Control-Allow-Headers', 'content-type');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  try{
    if(request.method == 'OPTIONS'){
      response.end("{}");
    }else{
      routeFunction(request,response, parsedUrl);
    }
  }catch(err){
    console.error(err);
  }
})

*/




