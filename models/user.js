var mongoose = require('mongoose');
var Counter = require('./counter');
var bcrypt = require('brypt');

var UserSchema = new mongoose.Schema({

  _id: {
    type:String,
    required: true
  },
  name: {
    type:String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  posts: {
    type: Number
  },
  dob: {
    type: Date;
  }
})

UserSchema.statics.authenticate = function(username,password,callback){
  User.findOne({username:username}).exec(function(err,user){
    if(err){
      return callback(err);
    }else if(!user){
      var err=new Error("User not found.");
      err.status=401;
      return callback(err);
    }else{
      bcrypt.compare(password,user.password,function(err,res){
        if(result=== true){
          return callback(null,user);
        }else{
          console.log("incorrect password");
          return callback(null,null);
        }
      })
    }
  });
}

UserSchema.statics.changePassword = function (id, oldPassword, newPassword, callback){
  User.findById(id)
    .exec(function(err,user){
      if(err){
        var res = {
          'is_success':false,
          'error':err.toString()
        }
        callback(res,500);
      }
      else if(!user){
        var res = {
          'is_success':false,
          'error':'no such user'
        }
        callback(res,400);
      } else{
        bcrypt.compare(oldPassword, user.password, function (err, result){
          if(err){
            var res = {
              'is_success':false,
              'error':err.toString()
            }
            callback(res,500);
          }
          else if(result){
            bcrypt.hash(newPassword, 10, function (err, hash) {
              if (err) {
                var res = {
                  'is_success':false,
                  'error':err.toString()
                }
                callback(res,500);
              }else {
                User.findByIdAndUpdate({_id: user._id}, {$set: { password: hash} }, function(error, user)   {
                    if(error){
                      var res = {
                        'is_success':false,
                        'error':error.toString()
                      }
                      callback(res,500);
                    }
                    else{
                      var res = {
                        'is_success':true,
                      }
                      callback(res,200);
                    }
                });
              }
            });

          } else{
            var res = {
              'is_success':false,
              'error':'incorrect password'
            }
            callback(res,403);
          }
        })
      }
    })
}

UserSchema.pre('save',function(next){
  var user=this;
  bcrypt.hash(user.password,10,function(err,hash){
    if(err){
      return next(err);
    }
    user.password=hash;
    Counter.findByIdAndUpdate({_id:'users'},{$inc:{counter:1}},function(error,counter){
      if(error){
        return next(error);
      }
      if(counter === undefined || counter === null){
          console.log('No counter');
          var ucount = {_id: 'users', count:2};
          Counter.create(ucount, function(error,counter){
            console.log('inserted entry');
            if (error) {
              return next(error);
            } else {
              console.log(counter.count);
              user._id = (counter.count-1)+'';
              next();
            }
          })
        }
        else{
          user._id = counter.count+'';
          next();
        }
    })
  })
})
var User = mongoose.model('users',UserSchema);
module.exports= User;
