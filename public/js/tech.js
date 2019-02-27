$(document).ready(function(){
  var t1;
  var t2;
  var t3;
  var t4;
  var t5;
  var t6;
  var t7;
  var t8;
  var salem;
  var guntur;
  var pallakad;
  var karur;
  var ooty;

$('#wbtn').click(function(){
  var sql='';
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#t1:checked').css('background-color')){t1=true;}
  else{t1=false;}
  if( $('#t2:checked').css('background-color')){t2=true;}
  else{t2=false;}
  if( $('#t3:checked').css('background-color')){t3=true;}
  else{t3=false;}
  if( $('#t4:checked').css('background-color')){t4=true;}
  else{t4=false;}
  if( $('#t5:checked').css('background-color')){t5=true;}
  else{t5=false;}
  if( $('#t6:checked').css('background-color')){t6=true;}
  else{t6=false;}
  if( $('#t7:checked').css('background-color')){t7=true;}
  else{t7=false;}
  if( $('#t8:checked').css('background-color')){t8=true;}
  else{t8=false;}
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
  var tech=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  if(t1){tech.push('Optical sensors')}
  if(t2){tech.push('Electromagnetic Sensors')}
  if(t3){tech.push('Electrochemical Sensors')}
  if(t4){tech.push('Airflow Sensors')}
  if(t5){tech.push('Dielectric Moisture Sensor')}
  if(t6){tech.push('Variable Rate Fertilizer')}
  if(t7){tech.push('Fertilizer Calculator')}
  if(t8){tech.push('Weather Sensor')}
  console.log(loc)
  console.log(tech)
  var t=Number(tech.length);
  var l=Number(loc.length);
  var sql='select farmer.f_id,f_name as farmer,district,t_name as technology from farmer_tech,farmer,technology where farmer.f_id=farmer_tech.f_id and technology.t_id=farmer_tech.t_id and district in ('
  loc.forEach(function(y){
    if(y===loc[l-1]){sql=sql+"'"+y+"'"}
    else{sql=sql+"'"+y+"'"+',';}
      })
  sql=sql+') and t_name in (';
  tech.forEach(function(y){
    if(y===tech[t-1]){sql=sql+"'"+y+"'"}
    else{sql=sql+"'"+y+"'"+',';}
      })
  sql=sql+')'
  console.log(sql)

  $.ajax({

        url: 'http://localhost:8678/technology/query',
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
