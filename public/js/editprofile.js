

var profilefile=null,coverfile=null,name,username,dob,designation,deignationOption,jobrole=["SDE-1","SDE-2","Team Manager"]

$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyCcz0MZBDDTfxcqrcDXm4K4QFu8Q2tbSUo",
    authDomain: "acms-a830e.firebaseapp.com",
    databaseURL: "https://acms-a830e.firebaseio.com",
    projectId: "acms-a830e",
    storageBucket: "acms-a830e.appspot.com",
    messagingSenderId: "139851775916"
  };
  firebase.initializeApp(config);

  $("#imageUpload").change(function() {
    if (this.files && this.files[0]) {
        profilefile=this.files[0];
        console.log(profilefile);
      }
  });
  $("#imageUpload-1").change(function() {
    if (this.files && this.files[0]) {
        coverfile=this.files[0];
        console.log(coverfile);
    }
  });
  $('#change').click(function(){
    name=$('#name').val()
    username=$('#username').val()
    dob=$('#dob').val()
    team = $('#team').val()
    designation=jobrole[$('#designation').val()-1]
    $.ajax({

      url: 'http://localhost:2017/updateuserdata',
      type: 'POST',
      crossDomain: true,
      data:{
        'name':name,
        'username':username,
        'dob' : dob,
        'designation':designation,
        'team':team
      },
      xhrFields: {
        withCredentials: true
      },
      success: function(){
        //alert(data.users.length);
        console.log("success");
      },
      error: function(jqXHR, error) {
        alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
      }
    });

    if(coverfile){
      var storage_ref_coverpic = firebase.storage().ref('cover_picture/'+coverfile.name)
      var task = storage_ref_coverpic.put(coverfile);
      task.on('state_changed',
      // function(progress){
      //
      // },
      // function(err){
      //   console.log("error "+JSON.stringify(err))
      // },
      function(){
        console.log("uploaded file successfully for cover pic")
        firebase.storage().ref('cover_picture').child(coverfile.name).getDownloadURL().then(function(url){
          console.log(url + "\n for coverpic")
          $('#imagePreview-1').css('background-image', 'url('+ url +')');
          $('#imagePreview-1').hide();
          $('#imagePreview-1').fadeIn(650);
          $.ajax({

            url: 'http://localhost:2017/updatecoverpic',
            type: 'POST',
            crossDomain: true,
            data:{
              'url':url
            },
            xhrFields: {
              withCredentials: true
            },
            success: function(){
              //alert(data.users.length);
              console.log("success");
              coverfile=null
              url=""
            },
            error: function(jqXHR, error) {
              alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
            }
          });
        })
      })
    }

    if(profilefile){
      var storage_ref = firebase.storage().ref('profile_picture/'+profilefile.name)
      var task = storage_ref.put(profilefile);
      task.on('state_changed',
      // function(progress){
      //
      // },
      // function(err){
      //   console.log("error "+JSON.stringify(err))
      // },
      function(){
        console.log("uploaded file successfully for pro pic")
        firebase.storage().ref('profile_picture').child(profilefile.name).getDownloadURL().then(function(profileurl){
          console.log(profileurl + "\n forprofilepic")
          $('#imagePreview').css('background-image', 'url('+profileurl +')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
          $.ajax({

            url: 'http://localhost:2017/updateprofilepic',
            type: 'POST',
            crossDomain: true,
            data:{
              'url':profileurl
            },
            xhrFields: {
              withCredentials: true
            },
            success: function(){
              //alert(data.users.length);
              console.log("success");
              profilefile=null
              profileurl=""
            },
            error: function(jqXHR, error) {
              alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
            }
          });
        })
      })
    }


    console.log("name: "+name+"\n username : "+username+"\ndob : "+dob+"\ncoverurl: "+coverurl+"\nprofileurl : "+profileurl)


  })

  $('select').formSelect();
  $('.datepicker').datepicker();

});
