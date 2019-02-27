$(document).ready(function(){
  var day1;
  var day2;
  var day3;
  var day4;
  var day5;
  var day6;
  var min;
  var max;
  var avg;
  var salem;
  var guntur;
  var pallakad;
  var karur;
  var sun;
  var cloud;
  var rain;
  var ooty;

$('#fbtn').click(function(){
  var sql='';
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#min:checked').css('background-color')){min=true;}
  else{min=false;}
  if( $('#max:checked').css('background-color')){max=true;}
  else{max=false;}
  if( $('#avg:checked').css('background-color')){avg=true;}
  else{avg=false;}
  if( $('#loc-1:checked').css('background-color')){salem=true;}
  else{salem=false;}
  if( $('#loc-2:checked').css('background-color')){karur=true;}
  else{karur=false;}
  if( $('#loc-3:checked').css('background-color')){palakkad=true;}
  else{palakkad=false;}
  if( $('#loc-4:checked').css('background-color')){guntur=true;}
  else{guntur=false;}
  if( $('#loc-5:checked').css('background-color')){ooty=true;}
  else{ooty=false;}
  var loc=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  console.log(loc)

  if(!min && !max && !avg){
    sql="select * from farmer where district in (";
    loc.forEach(function(location){
      if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
      else{sql=sql+"'"+location+"'"+',';}
    })
    sql=sql+")"
  }
  else{
    sql="select ";
    if(min){sql=sql+"min(income),"}
    if(max){sql=sql+"max(income),"}
    if(avg){sql=sql+"avg(income),"}
    sql=sql+"district from farmer group by district having district in (";
    loc.forEach(function(location){
      if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
      else{sql=sql+"'"+location+"'"+',';}
    })
    sql=sql+")"
  }

  console.log(sql)

  $.ajax({

        url: 'http://localhost:8678/farmer/query',
        type: 'POST',
        crossDomain: true,
        data:{
          'sql':sql
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(data){
          //alert(data.users.length);
          console.log("success");

          console.log(data)
          var attr=Object.keys(data[0]);
          $('.tbl-header table thead').append('<tr>');
          attr.forEach(function(x){
            $('.tbl-header table thead').append('<th>'+x+'</th>');
          })
          $('.tbl-header table thead').append('</tr>');
          var i=1;
          data.forEach(function(row){
            $('.tbl-content table tbody').append('<tr id="tr'+String(i)+'">');
            value=Object.values(row);
            value.forEach(function(x){
              $('#tr'+String(i)).append('<td>'+x+'</td>');
            })
            $('.tbl-header table thead').append('</tr>');
            i=i+1;
          })

            },
        error: function(jqXHR, error) { alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));

            }
          });
});
$('#f1btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#loc-1:checked').css('background-color')){salem=true;}
  else{salem=false;}
  if( $('#loc-2:checked').css('background-color')){karur=true;}
  else{karur=false;}
  if( $('#loc-3:checked').css('background-color')){palakkad=true;}
  else{palakkad=false;}
  if( $('#loc-4:checked').css('background-color')){guntur=true;}
  else{guntur=false;}
  if( $('#loc-5:checked').css('background-color')){ooty=true;}
  else{ooty=false;}
  var loc=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  sql="select temp.f_id,f_name,district,no_of_land from (select f_id,count(*) as no_of_land from farmer natural inner join owns group by f_id)temp,farmer where temp.f_id=farmer.f_id and district in ("
  loc.forEach(function(location){
    if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
    else{sql=sql+"'"+location+"'"+',';}
  })
  sql=sql+")"
  $.ajax({

        url: 'http://localhost:8678/labourer/query',
        type: 'POST',
        crossDomain: true,
        data:{
          'sql':sql
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(data){
          //alert(data.users.length);
          console.log("success");

          console.log(data)
          var attr=Object.keys(data[0]);
          $('.tbl-header table thead').append('<tr>');
          attr.forEach(function(x){
            $('.tbl-header table thead').append('<th>'+x+'</th>');
          })
          $('.tbl-header table thead').append('</tr>');
          var i=1;
          data.forEach(function(row){
            $('.tbl-content table tbody').append('<tr id="tr'+String(i)+'">');
            value=Object.values(row);
            value.forEach(function(x){
              $('#tr'+String(i)).append('<td>'+x+'</td>');
            })
            $('.tbl-header table thead').append('</tr>');
            i=i+1;
          })

            },
        error: function(jqXHR, error) { alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));

            }
          });
});
$('#f2btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#loc-1:checked').css('background-color')){salem=true;}
  else{salem=false;}
  if( $('#loc-2:checked').css('background-color')){karur=true;}
  else{karur=false;}
  if( $('#loc-3:checked').css('background-color')){palakkad=true;}
  else{palakkad=false;}
  if( $('#loc-4:checked').css('background-color')){guntur=true;}
  else{guntur=false;}
  if( $('#loc-5:checked').css('background-color')){ooty=true;}
  else{ooty=false;}
  var loc=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  sql="select temp.f_id,f_name,district,l_id,crop_name from (select f_id,l_id,crop_id from owns natural inner join grow)temp,farmer,crop where temp.f_id=farmer.f_id and crop.crop_id=temp.crop_id and district in ("
  loc.forEach(function(location){
    if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
    else{sql=sql+"'"+location+"'"+',';}
  })
  sql=sql+")"
  console.log(loc)
  console.log(sql)
  $.ajax({

        url: 'http://localhost:8678/labourer/query',
        type: 'POST',
        crossDomain: true,
        data:{
          'sql':sql
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(data){
          //alert(data.users.length);
          console.log("success");

          console.log(data)
          var attr=Object.keys(data[0]);
          $('.tbl-header table thead').append('<tr>');
          attr.forEach(function(x){
            $('.tbl-header table thead').append('<th>'+x+'</th>');
          })
          $('.tbl-header table thead').append('</tr>');
          var i=1;
          data.forEach(function(row){
            $('.tbl-content table tbody').append('<tr id="tr'+String(i)+'">');
            value=Object.values(row);
            value.forEach(function(x){
              $('#tr'+String(i)).append('<td>'+x+'</td>');
            })
            $('.tbl-header table thead').append('</tr>');
            i=i+1;
          })

            },
        error: function(jqXHR, error) { alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));

            }
          });
});
$('#f3btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  sql="select temp2.f_id,f_name,district,temp2.l_id,crop_name,type from (select f_id,temp.l_id,crop_name,type from (select l_id,crop_id,crop_name,type from grow natural inner join crop where l_id in (select l_id from (select l_id,count(*) from grow group by l_id having count(*)>1)))temp,owns where owns.l_id=temp.l_id)temp2,farmer where temp2.f_id=farmer.f_id"
  $.ajax({

        url: 'http://localhost:8678/labourer/query',
        type: 'POST',
        crossDomain: true,
        data:{
          'sql':sql
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(data){
          //alert(data.users.length);
          console.log("success");

          console.log(data)
          var attr=Object.keys(data[0]);
          $('.tbl-header table thead').append('<tr>');
          attr.forEach(function(x){
            $('.tbl-header table thead').append('<th>'+x+'</th>');
          })
          $('.tbl-header table thead').append('</tr>');
          var i=1;
          data.forEach(function(row){
            $('.tbl-content table tbody').append('<tr id="tr'+String(i)+'">');
            value=Object.values(row);
            value.forEach(function(x){
              $('#tr'+String(i)).append('<td>'+x+'</td>');
            })
            $('.tbl-header table thead').append('</tr>');
            i=i+1;
          })

            },
        error: function(jqXHR, error) { alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));

            }
          });
});
$('#f4btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#loc-1:checked').css('background-color')){salem=true;}
  else{salem=false;}
  if( $('#loc-2:checked').css('background-color')){karur=true;}
  else{karur=false;}
  if( $('#loc-3:checked').css('background-color')){palakkad=true;}
  else{palakkad=false;}
  if( $('#loc-4:checked').css('background-color')){guntur=true;}
  else{guntur=false;}
  if( $('#loc-5:checked').css('background-color')){ooty=true;}
  else{ooty=false;}
  var loc=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  sql="select owns.f_id,f_name,temp2.l_id,temp2.district,area_acre from (select l_id,land.district,area_acre from land where area_acre in (select max_area from (select district,max(area_acre) as max_area from land group by district)temp))temp2,farmer,owns where temp2.l_id=owns.l_id and owns.f_id=farmer.f_id and temp2.district in ("
  loc.forEach(function(location){
    if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
    else{sql=sql+"'"+location+"'"+',';}
  })
  sql=sql+")"
  console.log(loc)
  console.log(sql)
  $.ajax({

        url: 'http://localhost:8678/labourer/query',
        type: 'POST',
        crossDomain: true,
        data:{
          'sql':sql
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(data){
          //alert(data.users.length);
          console.log("success");

          console.log(data)
          var attr=Object.keys(data[0]);
          $('.tbl-header table thead').append('<tr>');
          attr.forEach(function(x){
            $('.tbl-header table thead').append('<th>'+x+'</th>');
          })
          $('.tbl-header table thead').append('</tr>');
          var i=1;
          data.forEach(function(row){
            $('.tbl-content table tbody').append('<tr id="tr'+String(i)+'">');
            value=Object.values(row);
            value.forEach(function(x){
              $('#tr'+String(i)).append('<td>'+x+'</td>');
            })
            $('.tbl-header table thead').append('</tr>');
            i=i+1;
          })

            },
        error: function(jqXHR, error) { alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));

            }
          });
});
$('#f5btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#loc-1:checked').css('background-color')){salem=true;}
  else{salem=false;}
  if( $('#loc-2:checked').css('background-color')){karur=true;}
  else{karur=false;}
  if( $('#loc-3:checked').css('background-color')){palakkad=true;}
  else{palakkad=false;}
  if( $('#loc-4:checked').css('background-color')){guntur=true;}
  else{guntur=false;}
  if( $('#loc-5:checked').css('background-color')){ooty=true;}
  else{ooty=false;}
  var loc=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  sql="select f_id,f_name,district from farmer natural left outer join owns where l_id is null and district in ("
  loc.forEach(function(location){
    if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
    else{sql=sql+"'"+location+"'"+',';}
  })
  sql=sql+")"
  console.log(loc)
  console.log(sql)
  $.ajax({

        url: 'http://localhost:8678/labourer/query',
        type: 'POST',
        crossDomain: true,
        data:{
          'sql':sql
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(data){
          //alert(data.users.length);
          console.log("success");

          console.log(data)
          var attr=Object.keys(data[0]);
          $('.tbl-header table thead').append('<tr>');
          attr.forEach(function(x){
            $('.tbl-header table thead').append('<th>'+x+'</th>');
          })
          $('.tbl-header table thead').append('</tr>');
          var i=1;
          data.forEach(function(row){
            $('.tbl-content table tbody').append('<tr id="tr'+String(i)+'">');
            value=Object.values(row);
            value.forEach(function(x){
              $('#tr'+String(i)).append('<td>'+x+'</td>');
            })
            $('.tbl-header table thead').append('</tr>');
            i=i+1;
          })

            },
        error: function(jqXHR, error) { alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));

            }
          });
});

$('#f6btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#loc-1:checked').css('background-color')){salem=true;}
  else{salem=false;}
  if( $('#loc-2:checked').css('background-color')){karur=true;}
  else{karur=false;}
  if( $('#loc-3:checked').css('background-color')){palakkad=true;}
  else{palakkad=false;}
  if( $('#loc-4:checked').css('background-color')){guntur=true;}
  else{guntur=false;}
  if( $('#loc-5:checked').css('background-color')){ooty=true;}
  else{ooty=false;}
  var loc=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  sql="select * from owns natural right outer join land where f_id is null and district in ("
  loc.forEach(function(location){
    if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
    else{sql=sql+"'"+location+"'"+',';}
  })
  sql=sql+")"
  console.log(loc)
  console.log(sql)
  $.ajax({

        url: 'http://localhost:8678/labourer/query',
        type: 'POST',
        crossDomain: true,
        data:{
          'sql':sql
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(data){
          //alert(data.users.length);
          console.log("success");

          console.log(data)
          var attr=Object.keys(data[0]);
          $('.tbl-header table thead').append('<tr>');
          attr.forEach(function(x){
            $('.tbl-header table thead').append('<th>'+x+'</th>');
          })
          $('.tbl-header table thead').append('</tr>');
          var i=1;
          data.forEach(function(row){
            $('.tbl-content table tbody').append('<tr id="tr'+String(i)+'">');
            value=Object.values(row);
            value.forEach(function(x){
              $('#tr'+String(i)).append('<td>'+x+'</td>');
            })
            $('.tbl-header table thead').append('</tr>');
            i=i+1;
          })

            },
        error: function(jqXHR, error) { alert(jqXHR.status + "   " + JSON.stringify(jqXHR.responseText));

            }
          });
});

// select min(temp_cel),max(temp_cel),avg(temp_cel),location from (select * from weather where day in (15,16,17,18,19))temp group by location;

})
