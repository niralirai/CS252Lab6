

var config = {
  apiKey: "AIzaSyAKfbDYJM_6rEnYqBgGbQrR5lNqtffjYR0",
  authDomain: "cs252lab6-7604e.firebaseapp.com",
  databaseURL: "https://cs252lab6-7604e.firebaseio.com",
  projectId: "cs252lab6-7604e",
  storageBucket: "cs252lab6-7604e.appspot.com",
  messagingSenderId: "454352118655"
};
firebase.initializeApp(config);

function login() {
  let email = document.getElementById('email').value;
  let pass = document.getElementById('passowrd').value;

  firebase.auth().signInWithEmailAndPassword(email, pass).then(function (user) {
      window.location.href = "mainPage.html";
  }).catch(function(error) {
      alert(error.message);
  });
}