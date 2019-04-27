var create_user = function(admin,req,res,err,db){
   admin.auth().createUser({
   username: req.body.username,
   email: req.body.email,
   name: req.body.name,
   password:req.body.password
  })
   .then(function(userRecord) {
       console.log('Successfully created new user:', userRecord.uid);
       db.collection("users").add({
         userid:userRecord.uid,
         username: req.body.username,
         email: req.body.email,
         name: req.body.name,
         posts:[],
         followers:[],
         following:[]
      })
      .then(function(docRef) {
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
   })
   .catch(function(error) {
     console.log('Error creating new user:', error);
   });

 res.send(req.body.username)
}

module.exports =  create_user
