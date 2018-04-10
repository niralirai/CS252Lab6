var express = require('express');
var app = express();
var port = 4200;
//express is better for handling routing

var path = require('path');


var bodyParser = require('body-parser');

app.use(bodyParser.json()); //parses as json and puts object into req.body
app.use(bodyParser.urlencoded({extended: true}));//https://github.com/expressjs/body-parser

// Send GET request and route to splash page
app.get('/', function(request, response) {
  response.sendFile("client/src/app/splash/splash.component.html", {'root': '../'});
  console.log(request.headers);
});

// TODO Send POST request (for security) and route to login page
app.get('/login', function(request, response) {
  response.sendFile("client/src/app/login/login.component.html", {'root': '../'});
  console.log(request.headers);
});

// TODO Send POST request (for security) and route to signup page
app.get('/signup', function(request, response) {
  response.sendFile("client/src/app/signup/signup.component.html", {'root': '../'});
  console.log(request.headers);
});

//TODO other html pages
//app.get('other.html',function(request,response){

//}); 

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

