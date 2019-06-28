var express               = require('express');
var path                  = require('path');
var session               = require('express-session');
var bodyParser            = require('body-parser');
var ejs                   = require('ejs');
var cookieParser = require('cookie-parser')
var create_user = require('./server/createUser.js')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var firebase = require("firebase");
var admin = require('firebase-admin')
var serviceAccount = require("./acms-a830e-firebase-adminsdk-xu4qj-edd502b7a4.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acms-a830e.firebaseio.com"
});
var app = express();
app.use(cookieParser())
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
// authentication middleware
var db = admin.firestore()
const auth = admin.auth()

var isAuthenticatedAdmin = function(req,res,next){
  //console.log(req.cookies)
  if(req.cookies.uid && req.cookies.idToken){
    admin.auth().verifyIdToken(req.cookies.idToken)
    .then(function(decodedToken) {
      //console.log("decoded token = "+JSON.stringify(decodedToken)+"\ncookietoken = "+req.cookies.idToken)
      if(decodedToken.uid===req.cookies.uid){
        var docRef = db.collection("users").doc(req.cookies.uid)
        docRef.get().then(function(doc) {
            if (doc.exists && doc.data().acc_type==='admin') {
              return next();
            }
            else{
              res.status(401).send('you are not authorized to activate accounts.Admin can only do so.')
            }
          })

      }
      else{
        res.status(401).render('pages/login')
      }
    }).catch(function(error) {
      res.status(500).send(error)
    });
  }else{
    res.status(401).render('pages/login')
  }
}

var isAuthenticated = function(req,res,next){
  //console.log(req.cookies)
  if(req.cookies.uid && req.cookies.idToken){
    admin.auth().verifyIdToken(req.cookies.idToken)
    .then(function(decodedToken) {
      //console.log("decoded token = "+JSON.stringify(decodedToken)+"\ncookietoken = "+req.cookies.idToken)
      if(decodedToken.uid===req.cookies.uid){
        return next();
      }
      else{
        res.status(401).render('pages/login')
      }
    }).catch(function(error) {
      res.status(500).send(error)
    });
  }else{
    res.status(401).render('pages/login')
  }
}

app.post('/updateuserdata',isAuthenticated,function(req,res,next){
  var uid=req.cookies.uid
  var docRef = db.collection("users").doc(uid);
  return docRef.update({
    "name":req.body.name,
    "username":req.body.username,
    "dob":req.body.dob,
    "designation":req.body.designation
  })
  .then(function() {
      console.log("Document successfully updated!");
      res.status(200).send("success")
  })
  .catch(function(error) {
      console.error("Error updating document: ", error);
      res.status(500).send(error)
  });
})

app.post('/updatecoverpic',isAuthenticated,function(req,res,next){
  var uid=req.cookies.uid
  var docRef = db.collection("users").doc(uid);
  return docRef.update({
    "coverpicurl":req.body.url
  })
  .then(function() {
      console.log("Document successfully updated!");
      res.status(200).send("success")
  })
  .catch(function(error) {
      console.error("Error updating document: ", error);
      res.status(500).send(error)
  });
})

app.post('/updateprofilepic',isAuthenticated,function(req,res,next){
  var uid=req.cookies.uid
  var docRef = db.collection("users").doc(uid);
  return docRef.update({
    "profilepicurl":req.body.url
  })
  .then(function() {
      console.log("Document successfully updated!");
      res.status(200).send("success")
  })
  .catch(function(error) {
      console.error("Error updating document: ", error);
      res.status(500).send(error)
  });
})
app.get('/login',function(req,res){
  res.render('pages/login');
})

app.get('/register',function(req,res){
  res.render('pages/register');
})
app.post('/activateAccount',isAuthenticatedAdmin,function(req,res,err){
   var docref = db.collection("users").doc(req.body.email);
   docref.get().then(function(doc){
     if(doc.exists){
       doc.data().acc_activated=true;
     }
   })
})

app.get('/activationList',function(req,res,err){
  let userRef = db.collection('users');
  let query = userRef.where('acc_activated', '==', false).get()
    .then(snapshot => {
      // if (snapshot.empty) {
      //   console.log('No matching documents.')
      //   return;
      // }
      var resData = {
        is_success:"true",
        activationList : []
      }
      snapshot.forEach(doc => {
        resData.activationList.push(doc.data().email)
        console.log(doc.id, '=>', doc.data());
      });
      res.status(200).send(resData)
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

})
app.post('/register',function(req,res,err){
  create_user(admin,req,res,err,db,XMLHttpRequest)
})
app.get('/home',isAuthenticated,function(req,res,err){
  // console.log(req.cookies)
  // if(req.cookies.uid && req.cookies.idToken){
  //   admin.auth().verifyIdToken(req.cookies.idToken)
  //   .then(function(decodedToken) {
  //     console.log("decoded token = "+JSON.stringify(decodedToken)+"\ncookietoken = "+req.cookies.idToken)
  //     var uid = decodedToken.uid;
  //     if(uid===req.cookies.uid){
  //       res.status(200).render('pages/home')
  //     }
  //     else{
  //       res.status(401).render('pages/login')
  //     }
  //   }).catch(function(error) {
  //     res.status(500).send(error)
  //   });
  // }else{
  //   res.status(401).render('pages/login')
  // }
  res.status(200).render('pages/home')
})
app.get('/profile',isAuthenticated,function(req,res,err){
  res.render('pages/profile')
})
app.get('/editProfile',isAuthenticated,function(req,res,err){
  res.render('pages/editProfile')
})
app.post('/createpost',isAuthenticated,function(req,res,err){
  db.collection("posts").add({
    type: req.body.type,
    text: req.body.text,
    media: req.body.media,
    user: req.cookies.uid,
    created:admin.firestore.Timestamp.now()._seconds
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  res.send("success")
})
console.log("app running in port 2017 open 'localhost:2017/login' in your browser")
app.listen(2017)
acms.prototype.saveMessage = function(e) {
  e.preventDefault();
  if(this.messageInput.value && this.checksSignedInWithMessage()){
    var currentUser = this.auth.currentUser;
    this.messageRef.push({
      name: currentUser.displayName,
      text: this.messageInput.value,

    }).then(function(){
      acms.resetMaterialTextfield(this.messageInput);
      this.toggleButton();
    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to  firebase databse', error);
  });
}
};

function loadMessages() {
  // Create the query to load the last 12 messages and listen for new ones.
  var query = firebase.firestore()
                  .collection('messages')
                  .orderBy('timestamp', 'desc')
                  .limit(12);
  
  // Start listening to the query.
  query.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'removed') {
        deleteMessage(change.doc.id);
      } else {
        var message = change.doc.data();
        displayMessage(change.doc.id, message.timestamp, message.name,
                       message.text, message.profilePicUrl, message.imageUrl);
      }
    });
  });
}
function saveMessage(messageText) {
  // Add a new message entry to the Firebase database.
  return firebase.firestore().collection('messages').add({
    name: getUserName(),
    text: messageText,
    profilePicUrl: getProfilePicUrl(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(function(error) {
    console.error('Error writing new message to Firebase Database', error);
  });
}
