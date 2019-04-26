var express               = require('express');
var path                  = require('path');
var session               = require('express-session');
var bodyParser            = require('body-parser');
var ejs                   = require('ejs');
// var mongoose              = require('mongoose');
// var passport              = require('passport');
// var LocalStrategy         = require('passport-local');
// var passportLocalMongoose = require('passport-local-mongoose');
var firebase = require("firebase");
var admin = require('firebase-admin')
var serviceAccount = require("./acms-a830e-firebase-adminsdk-xu4qj-edd502b7a4.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acms-a830e.firebaseio.com"
});
// var config = {
//     apiKey: "AIzaSyCcz0MZBDDTfxcqrcDXm4K4QFu8Q2tbSUo",
//     authDomain: "acms-a830e.firebaseapp.com",
//     databaseURL: "https://acms-a830e.firebaseio.com",
//     projectId: "acms-a830e",
//     storageBucket: "acms-a830e.appspot.com",
//     messagingSenderId: "139851775916"
// };
// firebase.initializeApp(config);
var app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
// authentication middleware
function isAuthenticated(req,res,next){
  //check if user is logged in if yes attach token else redirect to login page
}
app.get('/login',function(req,res){
  res.render('pages/login');
})
app.get('/register',function(req,res){
  res.render('pages/register');
})
app.post('/register',function(req,res){

})
app.get('/home',function(req,res){
  res.render('pages/home')
})
app.get('/profile',function(req,res){
  res.render('pages/profile')
})
console.log("app running in port 2017 open 'localhost:2017/login' in your browser")
app.listen(2017)
