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

$('#wbtn').click(function(){
  var sql='';
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#day-1:checked').css('background-color')){day1=true;}
  else{day1=false;}
  if( $('#day-2:checked').css('background-color')){day2=true;}
  else{day2=false;}
  if( $('#day-3:checked').css('background-color')){day3=true;}
  else{day3=false;}
  if( $('#day-4:checked').css('background-color')){day4=true;}
  else{day4=false;}
  if( $('#day-5:checked').css('background-color')){day5=true;}
  else{day5=false;}
  if( $('#day-6:checked').css('background-color')){day6=true;}
  else{day6=false;}
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
  if( $('#sun:checked').css('background-color')){sun=true;}
  else{sun=false;}
  if( $('#cloudy:checked').css('background-color')){cloud=true;}
  else{cloud=false;}
  if( $('#rain:checked').css('background-color')){rain=true;}
  else{rain=false;}
  var loc=[];
  var day=[];
  var weather=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  if(day1){day.push(15)}
  if(day2){day.push(16)}
  if(day3){day.push(17)}
  if(day4){day.push(18)}
  if(day5){day.push(19)}
  if(day6){day.push(20)}
  if(sun){weather.push('sun')}
  if(cloud){weather.push('cloud');weather.push('overcast')}
  if(rain){weather.push('rain')}
  console.log(loc)
  console.log(day)
  console.log(weather)
  if(Number(weather.length)!=0){
    weather.forEach(function(y){
      if(y===weather[Number(weather.length)-1]){
        sql=sql+"(select * from weather where weather like '%"+y+"%' and location in (";
        loc.forEach(function(location){
          if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
          else{sql=sql+"'"+location+"'"+',';}
        })
        sql=sql+'))';
      }
      else{sql=sql+"(select * from weather where weather like '%"+y+"%' and location in (";
      loc.forEach(function(location){
        if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
        else{sql=sql+"'"+location+"'"+',';}
      })
      sql=sql+')) union ';
      }
    })
  }
  else{
    if(!min && !max && !avg){
      sql='select * from weather where location in (';
      loc.forEach(function(location){
        if(location===loc[Number(loc.length)-1]){sql=sql+"'"+location+"'"}
        else{sql=sql+"'"+location+"'"+',';}
      })
      sql=sql+')'
    }
    else{
      sql='select ';
      if(min)(sql=sql+'min(temp_cel),')
      if(max)(sql=sql+'max(temp_cel),')
      if(avg)(sql=sql+'avg(temp_cel),')
      sql=sql+'location from (select * from weather where day in ('
      day.forEach(function(date){
        if(date===day[Number(day.length)-1]){sql=sql+String(date)}
        else{sql=sql+String(date)+',';}
      })
      sql=sql+'))temp group by location';
    }
  }

  console.log(sql)

  $.ajax({

        url: 'http://localhost:8678/weather/query',
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
