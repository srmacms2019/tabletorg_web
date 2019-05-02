$( document ).ready(function() {
    var username,name,email,pass1,pass2;
    $("#signup-btn").click(function(){
      name=$("#name").val()
      username=$("#username").val()
      email=$("#email").val()
      pass1=$("#password").val()
      pass2=$("#password-again").val()
      if(pass1!=pass2){
        alert("sorry! the passwords dont match")
      }else{
          $.ajax({

          url: 'http://localhost:2017/register',
          type: 'POST',
          crossDomain: true,
          data:{
            'username':username,
            'name':name,
            'email':email,
            'password':pass1,
          },
          xhrFields: {
            withCredentials: true
          },
          success: function(data){
            //alert(data.users.length);
            console.log("success");
            console.log(data)
            if(data.success){
              document.cookie="uid="+data.user.uid
              var customToken=data.user.customToken
              window.location.href="http://localhost:2017/login"
            }
            //window.location.href="http://localhost:2017/home"
          },
          error: function(jqXHR, error) {
            alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
          }
        });

      }


    })

});
