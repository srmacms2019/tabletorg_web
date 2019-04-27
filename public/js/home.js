var type,text,file,fileURL

$('document').ready(function (){

  // $("#send").click(function() {
  //   console.log("hi")
  //   files=$('#file-upload')
  // });
  $('input[type="file"]').change(function(e){
            file = e.target.files[0];
            //console.log(e.target.files[0])
        });

        $('#sendbtn').click(function(){
            type='text';
            text = $('#post-text').val()
            if(file && file.name){
              type='image';
              var storage_ref = firebase.storage().ref('post_images/'+file.name)
              var task = storage_ref.put(file);
              task.on('state_changed',
              function(progress){

              },
              function(err){
                console.log("error "+JSON.stringify(err))
              },
              function(){
                console.log("uploaded file successfully")
                firebase.storage().ref('post_images').child(file.name).getDownloadURL().then(function(url){
                  //console.log(url)
                  fileURL = url;
                  $.ajax({

                    url: 'http://localhost:2017/createpost',
                    type: 'POST',
                    crossDomain: true,
                    data:{
                      'type':type,
                      'text':text,
                      'image':fileURL
                    },
                    xhrFields: {
                      withCredentials: true
                    },
                    success: function(){
                      //alert(data.users.length);
                      console.log("success");
                      document.getElementById('text1').innerHTML=text
                      $('#imageforpost').attr("src",fileURL)
                      type="";
                      text="";
                      file="";
                      fileURL="";
                    },
                    error: function(jqXHR, error) {
                      alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
                    }
                  });
                })
              })
            }else{
              $.ajax({

                url: 'http://localhost:2017/createpost',
                type: 'POST',
                crossDomain: true,
                data:{
                  'type':type,
                  'text':text,
                  'image':fileURL
                },
                xhrFields: {
                  withCredentials: true
                },
                success: function(){
                  type="";
                  text="";
                  console.log("success");
                },
                error: function(jqXHR, error) {
                  alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
                }
              });
            }



        })

})
