// var firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

var config = {
  apiKey: "AIzaSyAKfbDYJM_6rEnYqBgGbQrR5lNqtffjYR0",
  authDomain: "cs252lab6-7604e.firebaseapp.com",
  databaseURL: "https://cs252lab6-7604e.firebaseio.com",
  projectId: "cs252lab6-7604e",
  storageBucket: "cs252lab6-7604e.appspot.com",
  messagingSenderId: "454352118655"
};
firebase.initializeApp(config);

function signUp() {
  let txtEmail = document.getElementById('emailn');
  let txtPassword = document.getElementById('password');
  let email = txtEmail.value;
  let pass = txtPassword.value;
  firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (user) {
      // setTimeout(function() {}, 3000);
      //window.location.href = "index";
  }).catch(function(error) {
      alert(error.message);
  });
    window.location.href = "login.html";
}
