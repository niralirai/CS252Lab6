var express = require('express');
var app = express();
var port = 3030;
//express is better for handling routing

var bodyParser = require('body-parser');

app.use(bodyParser.json()); //parses as json and puts object into req.body
app.use(bodyParser.urlencoded({extended: true}));//https://github.com/expressjs/body-parser

//serves the main page, TODO will need to change to html file
app.get('/', function(request, response) {
  response.send('WheredItGo?!');
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

