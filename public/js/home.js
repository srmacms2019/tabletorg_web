var type,text,imgfile=null,videofile=null,tag

$('document').ready(function (){

  $(document).ready(function(){
    $('.modal').modal();
  });

  $.ajax({

    url: 'http://localhost:2017/allPostsList',
    type: 'GET',
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    success: function(data){
      console.log(data);
        data.forEach(function(post) {

          console.log(post);
         post = post._fieldsProto;
          $('#post-container').append('<hr class="mt-5"><div class="row mt-2"><div class="col s1 pr-0 circle"><a href="#"><img class="responsive-img circle" src="'+post.profilepic.stringValue+'" alt=""></a></div><div class="col s11"><a href="#"><p class="m-1">'+post.user.stringValue+'<span class="ml-2"><a href="#" style="font-size:12px;color:#767a82;"> - '+post.created.stringValue+'</a></span></p></a><div class="row"><div class="col s12"><div class="card card-border z-depth-2"><div class="card-image"><img src="'+post.media.stringValue+'" alt=""></div><div class="card-content mt-3"><h6 class="font-weight-900 text-uppercase"><a href="#">#'+post.tag.stringValue+'</a></h6><div class="mt-1">'+post.text.stringValue+'</div></div></div><div class="social-icon"><span><i class="material-icons vertical-align-bottom mr-1">favorite_border</i>90</span><i class="material-icons vertical-align-bottom ml-3 mr-1">chat_bubble_outline</i>15 <span><i class="material-icons vertical-align-bottom ml-3 mr-1">redo</i> 6</span></div></div></div></div></div>');

          //$("#notifications-dropdown").append('<li id="'+email+'li"><div class="row"><div class="col s8"><p class="font-weight-600 mt-1">'+email+'</p></div><div class="col s3 center-align mr-2"><a id="'+email+'" class="btn-floating mt-1 btn-medium waves-effect waves-light"><i class="material-icons">check</i></a></div><div class="col s1"></div></div></li>');
        });
      console.log("success");
    },
    error: function(jqXHR, error) {
      alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
    }
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
        tag = $('#post-tag').val().substring(1);
        text = $('#post-text').val()
        if(imgfile && imgfile.name){
          type="image"
          var storage_ref = firebase.storage().ref('post_picture/'+imgfile.name)
          var task = storage_ref.put(imgfile);
          task.on('state_changed',
          function(progress){
            console.log("uploading file to firestorage")
          },
          function(err){
            console.log("error "+JSON.stringify(err))
          },
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
                  'media':url,
                  'tag':tag,
                  'date':new Date()
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
        }//else if(videofile && videofile.name){
        //   console.log("video selected")
        //   type="video"
        //   var storage_ref_vid = firebase.storage().ref('post_video/'+videofile.name)
        //   var task = storage_ref_vid.put(videofile);
        //   task.on('state_changed',
        //   function(progress){
        //       console.log("uploading........")
        //   },
        //   function(err){
        //     console.log("error "+JSON.stringify(err))
        //   },
        //   function(){
        //     console.log("uploaded file successfully for post video")
        //     firebase.storage().ref('post_video').child(videofile.name).getDownloadURL().then(function(videourl){
        //       console.log(videourl + "\n for postvideo")
        //       $('#videoPreview').attr("src",videourl);
        //       console.log($('#videoPreview').attr("src"))
        //       $('#videoPreview').hide();
        //       $('#videoPreview').fadeIn(650);
        //       console.log("type = "+type+" text="+text)
        //       $.ajax({
        //
        //         url: 'http://localhost:2017/createpost',
        //         type: 'POST',
        //         crossDomain: true,
        //         data:{
        //           'type':type,
        //           'text':text,
        //           'media':videourl,
        //           'tag':tag
        //         },
        //         xhrFields: {
        //           withCredentials: true
        //         },
        //         success: function(){
        //           //alert(data.users.length);
        //           console.log("success");
        //           //document.getElementById('text1').innerHTML=text
        //           //$('#imageforpost').attr("src",videourl)
        //           // type="";
        //           // text="";
        //           // videourl="";
        //         },
        //         error: function(jqXHR, error) {
        //           alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
        //         }
        //       });
        //
        //     })
        //   })
        // }else{
        //   $.ajax({
        //
        //     url: 'http://localhost:2017/createpost',
        //     type: 'POST',
        //     crossDomain: true,
        //     data:{
        //       'type':type,
        //       'text':text,
        //       'media':"",
        //       'tag':tag
        //     },
        //     xhrFields: {
        //       withCredentials: true
        //     },
        //     success: function(){
        //       // type="";
        //       // text="";
        //       console.log("success");
        //     },
        //     error: function(jqXHR, error) {
        //       alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));
        //     }
        //   });
        // }



    })

})
