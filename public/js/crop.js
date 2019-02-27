$(document).ready(function(){
  var grain;
  var pulse;
  var vegetable;
  var spice;
  var fibre;
  var nut;
  var sugar;
  var beverage;
  var less;
  var moderate;
  var high;
  var sand;
  var Loam;
  var fertile;
  var clay;
  var black;
  var alluvial;
  var hill;
  var sqlsoil="";
  var sqlwater="";
  var sqltype="";

$('#cbtn').click(function(){
  var sql='';
  $('.tbl-header table thead').empty();
  $('.tbl-content table tbody').empty();
  if( $('#grain:checked').css('background-color')){grain=true;}
  else{grain=false;}
  if( $('#Pulse:checked').css('background-color')){pulse=true;}
  else{pulse==false;}
  if( $('#Vegetable:checked').css('background-color')){vegetable=true;}
  else{vegetable=false;}
  if( $('#Spice:checked').css('background-color')){spice=true;}
  else{spice=false;}
  if( $('#Fibre:checked').css('background-color')){fibre=true;}
  else{fibre=false;}
  if( $('#Nut:checked').css('background-color')){nut=true;}
  else{nut=false;}
  if( $('#Sugar:checked').css('background-color')){sugar=true;}
  else{sugar=false;}
  if( $('#Beverage:checked').css('background-color')){beverage=true;}
  else{beverage=false;}
  if( $('#Less:checked').css('background-color')){less=true;}
  else{less=false;}
  if( $('#Moderate:checked').css('background-color')){moderate=true;}
  else{moderate=false;}
  if( $('#High:checked').css('background-color')){high=true;}
  else{high=false;}
  if( $('#Sandy:checked').css('background-color')){sand=true;}
  else{sand=false;}
  if( $('#Loamy:checked').css('background-color')){loam=true;}
  else{loam=false;}
  if( $('#Fertile:checked').css('background-color')){fertile=true;}
  else{fertile=false;}
  if( $('#Clay:checked').css('background-color')){clay=true;}
  else{clay=false;}
  if( $('#Black:checked').css('background-color')){black=true;}
  else{black=false;}
  if( $('#Alluvial:checked').css('background-color')){alluvial=true;}
  else{alluvial=false;}
  if( $('#Hill:checked').css('background-color')){hill=true;}
  else{hill=false;}
  var type=[];
  var water=[];
  var soil=[];
  if(grain){type.push('grain')}
  if(pulse){type.push('pulse')}
  if(vegetable){type.push('vegetable')}
  if(spice){type.push('spice')}
  if(fibre){type.push('fibre')}
  if(nut){type.push('nuts')}
  if(sugar){type.push('sugar')}
  if(beverage){type.push('beverage')}
  if(less){water.push('less')}
  if(moderate){water.push('moderate')}
  if(high){water.push('high')}
  if(sand){soil.push('sand')}
  if(loam){soil.push('loam')}
  if(fertile){soil.push('fertile')}
  if(clay){soil.push('clay')}
  if(black){soil.push('black')}
  if(alluvial){soil.push('alluvial')}
  if(hill){soil.push('hill')}
  console.log(type)
  console.log(water)
  console.log(soil)
  sql="";
  var t=Number(type.length);
  var s=Number(soil.length);
  var w=Number(water.length);
  console.log(s,w,t)
  if(t!=0){
    sqltype="(select * from crop where type in (";
    type.forEach(function(y){
      if(y===type[t-1]){sqltype=sqltype+"'"+y+"'";}
      else{sqltype=sqltype+"'"+y+"'"+',';}
    })
    sqltype=sqltype+"))";
  }
  if(w!=0){
    sqlwater="(select * from crop where water in (";
    water.forEach(function(y){
      if(y===water[w-1]){sqlwater=sqlwater+"'"+y+"'";}
      else{sqlwater=sqlwater+"'"+y+"'"+',';}
        })
    sqlwater=sqlwater+"))";
  }
  if(s!=0){
    sqlsoil="(select * from crop where ";
    soil.forEach(function(y){
      if(y===soil[s-1]){sqlsoil=sqlsoil+"soil like '%"+y+"%'";}
      else{sqlsoil=sqlsoil+"soil like '%"+y+"%' or ";}
        })
    sqlsoil=sqlsoil+")";
  }
  // console.log(sqltype,sqlwater,sqlsoil)
  if(t!=0 && s!=0 && w==0){sql=sqltype+" intersect "+sqlsoil}
  if(t!=0 && w!=0 && s==0){sql=sqltype+" intersect "+sqlwater}
  if(w!=0 && s!=0 && t==0){sql=sqlwater+" intersect "+sqlsoil}
  if(t!=0 && w==0 && s==0){sql=sqltype}
  if(s!=0 && w==0 && t==0){sql=sqlsoil}
  if(w!=0 && t==0 && s==0){sql=sqlwater}
  if(t!=0 && w!=0 && s!=0){sql="select * from ("+sqltype+" intersect "+sqlwater+") intersect "+sqlsoil}
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
