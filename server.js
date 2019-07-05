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
    "designation":req.body.designation,
    "team":req.body.team
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

app.post('/checkLogin',function(req,res){
  console.log("checking login")
  var uid=req.body.uid;
  var docRef = db.collection("users").doc(uid);
  docRef.get()
  .then(function(doc) {
    if(doc.exists){
      data = doc.data();
      var response = {
        is_success:"true",
        message:""
      }
      console.log(data.acc_type);
      if(data.acc_type=="admin" || (data.acc_type=="user" && data.acc_activated==true)){
        response.message = "user can login";
        res.status(200).send(response);
      }else{
        response.message = "Account not activated, please contact admin for account activation"
        res.status(200).send(response);
      }
    }else{
      response.is_success="false";
      response.message = "error logging in . please try again"
      res.status(200).send(response);
    }

  })
  .catch(function(error) {
      console.error("Error: ", error);
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
       console.log("account activation  : "+doc.data())
       doc.data().acc_activated=true;
     }else{
       console.log("account activation no such doc");
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

app.get('/postList',function(req,res,err){
  let userRef = db.collection('users').doc(req.cookies.uid);
  userRef.get()
    .then(doc => {

      var resData = {
        is_success:"true",
        postList : doc.data().posts
      }
      res.status(200).send(resData)
    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.status(404).send(err);
    });

})
app.get('/allPostsList',isAuthenticated,function(req,res,next){
  let postRef = db.collection('posts');
  let posts = postRef.orderBy('created', 'desc').limit(10);
  posts.get().then((snapshot) => {
        console.log('Num results:', snapshot.docs.length);
        console.log(typeof snapshot.docs)
        res.status(200).send(snapshot.docs)
  });
})
app.post('/searchPosts',isAuthenticated,function(req,res,next){
  let postsRef = db.collection('posts');
  var docData=[];
  let query = postsRef.where('tag', '==', req.body.tag).get()
  .then(snapshot => {
    if (snapshot.empty) {
      res.status(404).send("No documents found with tag "+req.body.tag)
    }else{
      snapshot.forEach(function(doc) {
        console.log(doc.id, ' => ', doc.data());
        docData.push(doc.data());

      });
      res.status(200).send(docData)
    }
  })
  .catch(err => {
    res.status(500).send("Internal server error"+ err);
  });

})
app.post('/searchUser',isAuthenticated,function(req,res,next){
  let postsRef = db.collection('users');
  let query = postsRef.where('username', '==', req.body.tag).get()
  .then(snapshot => {
    if (snapshot.empty) {
      res.status(404).send("No such user "+req.body.tag+" found")
    }else{
      res.status(200).send("success");
    }
  })
  .catch(err => {
    res.status(404).send("Internal server error"+ err);
  });

})
app.get('/post/:postid',function(req,res){
  docRef = db.collection('posts').doc(req.params.postid);
  docRef.get().then(function(doc){
    if(doc.exists){
      console.log("post data "+doc.data())
      res.status(200).send(doc.data())
    }else{
      console.log("document of post not found")
      //res.status(404).send("document not found")
    }
  }).catch(function(error){
    console.log(error);
    res.status(404).send(error);
  })
})

app.post('/register',function(req,res,err){
  create_user(admin,req,res,err,db,XMLHttpRequest)
})
app.get('/home',isAuthenticated,function(req,res,err){
  var docRef = db.collection("users").doc(req.cookies.uid);
  docRef.get().then(function(doc){
    if (doc.exists) {

      console.log("Document data while getting home :", doc.data());
      res.status(200).render('pages/home',{user:doc.data()})

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error){
    console.log(error);
    res.status(404).send("page not found error")
  });

})
app.get('/profile',isAuthenticated,function(req,res,err){
  var docRef = db.collection("users").doc(req.cookies.uid);
  docRef.get().then(function(doc){
    if (doc.exists) {

      console.log("Document data while getting home :", doc.data());
      res.status(200).render('pages/profile',{user:doc.data()})

    } else {
        res.status(404).send("post not found")
        console.log("No such document!");
    }
  }).catch(function(error){
    console.log(error);
    res.status(404).send("user not found error")
  });
})
app.get('/editProfile',isAuthenticated,function(req,res,err){
  var docRef = db.collection("users").doc(req.cookies.uid);
  docRef.get().then(function(doc){
    if (doc.exists) {

      console.log("Document data while getting home :", doc.data());
      res.status(200).render('pages/editProfile',{user:doc.data()})

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error){
    console.log(error);
    res.status(404).send("user not found error")
  });
})
app.post('/createpost',isAuthenticated,function(req,res,err){
  var uid =  req.cookies.uid;
  var docRef = db.collection("users").doc(uid);
  docRef.get().then(function(doc){
    var name = doc.data().name;
    var profilepic = doc.data().profilepicurl;

    db.collection("posts").add({
      type: req.body.type,
      text: req.body.text,
      tag:req.body.tag,
      media: req.body.media,
      user: name,
      created:req.body.date,
      profilepic:profilepic
    })
    .then(function(postdocRef) {
        console.log("Document written with ID: ",postdocRef.id);
        var posts = doc.data().posts;
        posts.unshift(postdocRef.id)
        for(var i=0;i<posts.length;i++){
          console.log(posts[i]);
        }
        docRef.update({
           "posts":posts
         })
         .then(function() {
             console.log("Document successfully updated!");
             res.status(200).send("success")
         })
         .catch(function(error) {
             console.error("Error updating document: ", error);
             res.status(500).send(error)
         });

        postdocRef.get().then(function(doc) {
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
  })
})

app.get('/postListforUser/:email',isAuthenticated,function(req,res,next){
  let postsRef = db.collection('users');
  var postList;

  let query = postsRef.where('email', '==', req.params.email).get()
  .then(snapshot => {
    if (snapshot.empty) {
      res.status(404).send("No such email "+req.params.email+" found")
    }else{
      snapshot.forEach(function(doc) {
        console.log("potst list via email")
        console.log(doc.id, ' => ', doc.data());
        postList = doc.data().posts
        res.status(200).send(postList)
      });
    }
  })
  .catch(err => {
    res.status(404).send("Internal server error"+ err);
  });

})

app.get('/:user',isAuthenticated,function(req,res,next){
  let postsRef = db.collection('users');
  var docData;

  let query = postsRef.where('username', '==', req.params.user).get()
  .then(snapshot => {
    if (snapshot.empty) {
      res.status(404).send("No such user "+req.params.user+" found")
    }else{
      snapshot.forEach(function(doc) {
        console.log(doc.id, ' => ', doc.data());
        docData=doc.data()
        res.status(200).render('pages/searchprohile',{user:docData})
      });
    }
  })
  .catch(err => {
    res.status(404).send("Internal server error"+ err);
  });

})
console.log("app running in port 2017 open 'localhost:2017/login' in your browser")
app.listen(2017)
