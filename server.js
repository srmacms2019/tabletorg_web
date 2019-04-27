var express               = require('express');
var path                  = require('path');
var session               = require('express-session');
var bodyParser            = require('body-parser');
var ejs                   = require('ejs');
var cookieParser = require('cookie-parser')
var create_user = require('./server/createUser.js')

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

var isAuthenticated = function(req,res,next){
  console.log(req.cookies)
  if(req.cookies.uid && req.cookies.idToken){
    admin.auth().verifyIdToken(req.cookies.idToken)
    .then(function(decodedToken) {
      console.log("decoded token = "+JSON.stringify(decodedToken)+"\ncookietoken = "+req.cookies.idToken)
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



app.get('/login',function(req,res){
  res.render('pages/login');
})

app.get('/register',function(req,res){
  res.render('pages/register');
})

app.post('/register',function(req,res,err){
  create_user(admin,req,res,err,db)
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
app.post('/createpost',isAuthenticated,function(req,res,err){
  db.collection("posts").add({
    type: req.body.type,
    text: req.body.text,
    image: req.body.image,
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
