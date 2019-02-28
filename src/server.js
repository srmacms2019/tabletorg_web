var express               = require('express');
var path                  = require('path');
var session               = require('express-session');
var bodyParser            = require('body-parser');
var ejs                   = require('ejs');
var mongoose              = require('mongoose');
var passport              = require('passport');
var LocalStrategy         = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/login',function(req,res){
  res.render('pages/login');
})
app.get('/register',function(req,res){
  res.render('pages/register');
})
app.post('/register',function(req,res){

})
app.get('/profile',function(req,res){
  res.render('pages/profile')
})
app.listen(2017)
