
function buyticket(gameid,activitycode,section_id,quantity){
jQuery.ajax({
       type: "GET",
       url: "https://www.famiticket.com.tw/FWT/FWT0030.aspx",
       data: {
           game_id:gameid,
           activitycode:activitycode,
           section_id:section_id

       },
       success: function(msg){
$("#game_page").html(msg)
$(document).ajaxComplete(function() {
var number = $("#price_all > input")
    $(number).val(quantity)
    $($("#chose_seat_btn_auto > a").attr("onclick"))


})



}
    })

}

function enterarea(game_id,activitycode,area,quantity){

jQuery.ajax({
       type: "GET",
       url: "https://www.famiticket.com.tw/FWT/FWT0020.aspx",
       data: {
           game_id:game_id,
           activitycode:activitycode,

       },
       success: function(msg){

for (var i=0; i<$(msg).find('#color_seat_data')[0].nextSibling.children["0"].children.length; i++)
  {
if($(msg).find('#color_seat_data')[0].nextSibling.children["0"].children[i].innerText.includes(area)){

if($(msg).find('#color_seat_data')[0].nextSibling.children["0"].children[i].attributes['onclick'] !== undefined){
var buyticketcode = $(msg).find('#color_seat_data')[0].nextSibling.children["0"].children[i].attributes['onclick'].textContent
var activitycode  = buyticketcode.match(/'[^,_]+'/g)[0].match(/[a-zA-Z0-9+__]+/g)[0]
var gameid        = buyticketcode.match(/'[^,_]+'/g)[1].match(/[a-zA-Z0-9+__]+/g)[0]
var section_id    = buyticketcode.match(/'[^,_]+'/g)[2].match(/[a-zA-Z0-9+__]+/g)[0]
buyticket(gameid,activitycode,section_id,quantity)
}else{
$("#game_page").html(msg)
}
}

  }

       }
    })

}


function submitRELOAD(activity, game_id,eventtime,area,quantity){
jQuery.ajax({
       headers: { 'Content-Type': 'text/html'},
       type: "GET",
       url: "https://www.famiticket.com.tw/FWT/FWT0010.aspx",
       data: {
           activitycode:activity,
           gameid: game_id
       },
       success: function(msg){
if(msg.includes("無場次")){

setTimeout(submitRELOAD(event,'',time,keyword,ticketquantity),5)

}else{


for (var i=0; i<$(msg).find('td[onclick]').length; i++){


if($(msg).find('td[onclick]')[i].parentElement.innerText.includes(eventtime)){
  var entercode = $(msg).find('[onclick]')[i].attributes['onclick'].textContent
  var game_id = entercode.match(/,'(\S+)'/)[1]
  var activitycode = entercode.match(/'(\S+)',/)[1]
  enterarea(game_id,activitycode,area,quantity)
}

  }


}

},
 })

}

