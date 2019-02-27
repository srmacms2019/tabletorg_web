$(document).ready(function(){
  var sk1;
  var sk2;
  var sk3;
  var sk4;
  var sk5;
  var sk6;
  var sk7;
  var sk8;
  var sql;
  var haswork;
  var hasnowork;
  var salem;
  var guntur;
  var pallakad;
  var karur;
  var ooty

$('#lbtn').click(function(){
  var sql='';
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#sk-1:checked').css('background-color')){sk1=true;}
  else{sk1=false;}
  if( $('#sk-2:checked').css('background-color')){sk2=true;}
  else{sk2=false;}
  if( $('#sk-3:checked').css('background-color')){sk3=true;}
  else{sk3=false;}
  if( $('#sk-4:checked').css('background-color')){sk4=true;}
  else{sk=false;}
  if( $('#sk-5:checked').css('background-color')){sk5=true;}
  else{sk5=false;}
  if( $('#sk-6:checked').css('background-color')){sk6=true;}
  else{sk6=false;}
  if( $('#sk-7:checked').css('background-color')){sk7=true;}
  else{sk7=false;}
  if( $('#sk-8:checked').css('background-color')){sk8=true;}
  else{sk8=false;}
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
  if( $('#haswork:checked').css('background-color')){haswork=true;}
  else{haswork=false;}
  if( $('#nowork:checked').css('background-color')){hasnowork=true;}
  else{hasnowork=false;}
  var loc=[];
  var skills=[];
  var work=[];
  if(salem){loc.push('salem')}
  if(karur){loc.push('karur')}
  if(palakkad){loc.push('palakkad')}
  if(guntur){loc.push('guntur')}
  if(ooty){loc.push('ooty')}
  if(sk1){skills.push('sowing')}
  if(sk2){skills.push('pruning')}
  if(sk3){skills.push('tractor driving')}
  if(sk4){skills.push('pest and fert spray')}
  if(sk5){skills.push('irrigation')}
  if(sk6){skills.push('harvesting')}
  if(sk7){skills.push('collect coffee beans')}
  if(sk8){skills.push('pluck tea leaves')}
  if(haswork){work.push('yes')}
  if(hasnowork){work.push('no')}
  console.log(loc)
  console.log(skills)
  console.log(work)
  var w=Number(work.length);
  var l=Number(loc.length);
  var s=Number(skills.length);
  var sqll;
  var sqlw;
  var sqls;
  sql="";
  if(w!=0){
    sqlw="has_work in (";
    work.forEach(function(y){
      if(y===work[w-1]){sqlw=sqlw+"'"+y+"'"}
      else{sqlw=sqlw+"'"+y+"'"+',';}
        })
    sqlw=sqlw+')';
    }
  if(l!=0){
    sqll="district in (";
    loc.forEach(function(y){
      if(y===loc[l-1]){sqll=sqll+"'"+y+"'"}
      else{sqll=sqll+"'"+y+"'"+',';}
        })
    sqll=sqll+')';
    }
    if(s!=0){
      sqls="skills in (";
      skills.forEach(function(y){
        if(y===skills[s-1]){sqls=sqls+"'"+y+"'"}
        else{sqls=sqls+"'"+y+"'"+',';}
          })
      sqls=sqls+')';
      }
      if(l!=0 && s!=0 && w==0){sql="select lbr_id,lbr_name,age,gender,district,contact,skills,min_wage_perday as min_wage_day,has_work from labourer natural inner join wage where "+sqll+" and "+sqls}
      if(l!=0 && w!=0 && s==0){sql="select lbr_id,lbr_name,age,gender,district,contact,skills,min_wage_perday as min_wage_day,has_work from labourer natural inner join wage where "+sqll+" and "+sqlw}
      if(w!=0 && s!=0 && l==0){sql="select lbr_id,lbr_name,age,gender,district,contact,skills,min_wage_perday as min_wage_day,has_work from labourer natural inner join wage where "+sqlw+" and "+sqls}
      if(l!=0 && w==0 && s==0){"select lbr_id,lbr_name,age,gender,district,contact,skills,min_wage_perday as min_wage_day,has_work from labourer natural inner join wage where "+sqll}
      if(s!=0 && w==0 && l==0){"select lbr_id,lbr_name,age,gender,district,contact,skills,min_wage_perday as min_wage_day,has_work from labourer natural inner join wage where "+sqls}
      if(w!=0 && l==0 && s==0){"select lbr_id,lbr_name,age,gender,district,contact,skills,min_wage_perday as min_wage_day,has_work from labourer natural inner join wage where "+sqlw}
      if(l!=0 && w!=0 && s!=0){sql="select lbr_id,lbr_name,age,gender,district,contact,skills,min_wage_perday as min_wage_day,has_work from labourer natural inner join wage where "+sqll+" and "+sqls+" and "+sqlw}
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

$('#l1btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  sql='select farmer.f_id,f_name,district,skills,no_of_labourers from farmer,labour_requirement where farmer.f_id=labour_requirement.f_id order by district'
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
$('#l2btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  sql="select * from labourer where lbr_id in (select distinct lbr_id from labourer natural inner join (select farmer.f_id,f_name,district,skills,no_of_labourers from farmer,labour_requirement where farmer.f_id=labour_requirement.f_id)temp) and has_work='no'"
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
$('#l3btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  sql='select * from wage'
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
$('#l4btn').click(function(){
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  sql='select * from wage where min_wage_perday=(select min(min_wage_perday) from wage) or min_wage_perday=(select max(min_wage_perday) from wage)'
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
