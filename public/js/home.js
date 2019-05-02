var type,text,imgfile=null,videofile=null

$('document').ready(function (){

  $(document).ready(function(){
    $('.modal').modal();
  });

  $("#imageUpload").change(function() {
    if (this.files && this.files[0]) {
        imgfile=this.files[0];
        console.log(imgfile);
      }

  });
  $("#videoUpload").change(function() {
    if (this.files && this.files[0]) {
        videofile=this.files[0];
        console.log(videofile);
      }

  });


    $('#sendbtn').click(function(){
        type="text"
        text = $('#post-text').val()
        if(imgfile && imgfile.name){
          type="image"
          var storage_ref = firebase.storage().ref('post_picture/'+imgfile.name)
          var task = storage_ref.put(imgfile);
          task.on('state_changed',
          // function(progress){
          //
          // },
          // function(err){
          //   console.log("error "+JSON.stringify(err))
          // },
          function(){
            console.log("uploaded file successfully for post pic")
            firebase.storage().ref('post_picture').child(imgfile.name).getDownloadURL().then(function(url){
              console.log(url + "\n for postpic")
              $('#imagePreview').css('background-image', 'url('+ url +')');
              $('#imagePreview').hide();
              $('#imagePreview').fadeIn(650);
              $.ajax({

                url: 'http://localhost:2017/createpost',
                type: 'POST',
                crossDomain: true,
                data:{
                  'type':type,
                  'text':text,
                  'media':url
                },
                xhrFields: {
                  withCredentials: true
                },
                success: function(){
                  //alert(data.users.length);
                  console.log("success");
                  document.getElementById('text1').innerHTML=text
                  $('#imageforpost').attr("src",url)
                  // type="";
                  // text="";
                  // url="";
                },
                error: function(jqXHR, error) {
                  alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
                }
              });

            })
          })
        }else if(videofile && videofile.name){
          console.log("video selected")
          type="video"
          var storage_ref_vid = firebase.storage().ref('post_video/'+videofile.name)
          var task = storage_ref_vid.put(videofile);
          task.on('state_changed',
          function(progress){
              console.log("uploading........")
          },
          function(err){
            console.log("error "+JSON.stringify(err))
          },
          function(){
            console.log("uploaded file successfully for post video")
            firebase.storage().ref('post_video').child(videofile.name).getDownloadURL().then(function(videourl){
              console.log(videourl + "\n for postvideo")
              $('#videoPreview').attr("src",videourl);
              console.log($('#videoPreview').attr("src"))
              $('#videoPreview').hide();
              $('#videoPreview').fadeIn(650);
              console.log("type = "+type+" text="+text)
              $.ajax({

                url: 'http://localhost:2017/createpost',
                type: 'POST',
                crossDomain: true,
                data:{
                  'type':type,
                  'text':text,
                  'media':videourl
                },
                xhrFields: {
                  withCredentials: true
                },
                success: function(){
                  //alert(data.users.length);
                  console.log("success");
                  //document.getElementById('text1').innerHTML=text
                  //$('#imageforpost').attr("src",videourl)
                  // type="";
                  // text="";
                  // videourl="";
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
              'media':""
            },
            xhrFields: {
              withCredentials: true
            },
            success: function(){
              // type="";
              // text="";
              console.log("success");
            },
            error: function(jqXHR, error) {
              alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
            }
          });
        }



    })

})
