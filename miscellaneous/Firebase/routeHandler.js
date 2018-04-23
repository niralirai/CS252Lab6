var firebase = require('firebase');
var distanceCalc = require('./distanceCalc.js');
var config = require('./config.js');
var axios = require('axios');
firebase.initializeApp(config.fbConfig);
firebase.auth().signInWithEmailAndPassword("admin@connectpl.us", config.password);



var responseForm = {
	err: "",
	payload: {}
}

module.exports = {


}