var express               = require('express');
var path                  = require('path');
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
app.get('/profile',function(req,res){
  res.render('pages/profile')
})
app.get('/cards',function(req,res){
  res.render('pages/cards')
})
app.listen(2017)
