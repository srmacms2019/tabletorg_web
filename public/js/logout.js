var config = {
    apiKey: "AIzaSyCcz0MZBDDTfxcqrcDXm4K4QFu8Q2tbSUo",
    authDomain: "acms-a830e.firebaseapp.com",
    databaseURL: "https://acms-a830e.firebaseio.com",
    projectId: "acms-a830e",
    storageBucket: "acms-a830e.appspot.com",
    messagingSenderId: "139851775916"
};
firebase.initializeApp(config);
$('#logout').click(function(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
})
