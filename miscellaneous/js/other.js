
function signOut() {
    window.location.href = "/splash.html";
    firebase.auth().signOut.then(function() {
        window.location.href = "/splash.html";
    }).catch(function(error) {
        alert(error.message);
    });
}