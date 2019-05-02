var create_user = function(admin,req,res,err,db,XMLHttpRequest){
  admin.auth().createUser({
  username: req.body.username,
  email: req.body.email,
  name: req.body.name,
  password:req.body.password
 })
  .then(function(userRecord) {
      console.log('Successfully created new user:', userRecord.uid);
      db.collection("users").doc(userRecord.uid).set({
        userid:userRecord.uid,
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        posts:[],
        followers:[],
        following:[],
        dob:"",
        profilepicurl:"",
        coverpicurl: "",
        designation:""
     })
     .then(function() {
       var docRef = db.collection("users").doc(userRecord.uid)
       docRef.get().then(function(doc) {
         if (doc.exists) {
             console.log("Document data:", doc.data());
             admin.auth().createCustomToken(userRecord.uid)
             .then(function(customToken) {
               var result={
                 "success":true,
                 "user":{
                   "uid":userRecord.uid,
                   "customToken":customToken
                 }
               }
               // console.log(result)
               // var reqdata='{"token":customToken, "returnSecureToken":true}'
               // var xhr = new XMLHttpRequest();
               //  xhr.open("POST", 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=[API_KEY]', true);
               //  xhr.withCredentials = false;
               //
               //  xhr.onreadystatechange = function() { // Call a function when the state changes.
               //      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
               //          var text=xhr.responseText
               //          console.log(JSON.stingify(text))
               //      }
               //  }
               //  xhr.send(reqdata);
                res.status(200).send(result)
             })
             .catch(function(error) {
               console.log('Error creating custom token:', error);
             });
         } else {
             console.log("No such document!");
         }
       }).catch(function(error) {
         console.log("Error getting document:", error);

         res.status(500).send("internal server error " +error)
       });
     })
     .catch(function(error) {
         console.error("Error adding document: ", error);

         res.status(500).send("internal server error " +error)
     });
  })
  .catch(function(error) {
    console.log('Error creating new user:', error);
    res.status(500).send("internal server error " +error)
  });
}

module.exports =  create_user
