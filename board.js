/**
 *  Functons for the Arrivals and Departures Information board
 */


/** Begin Board Generation**/
function loadBoard(item, optText) {
  //To-Do: Finish this
  //$('#departuresTable tbody').empty();
  let jsonData = [];
  jsonData = item;
  //console.log(jsonData[0].Southbound[0].train_id);
  $('#boardTitle').html('<h2><b> Train Information: ' + optText + '</h2></b>');
  for(let i = 0; i < jsonData.length; i++){
    if(jsonData[i].Northbound != undefined){
      for(let j = 0; j < 5; j++){
        let row = $('<tr><td>' + arrivalTime(jsonData[i].Northbound[j].depart_time) + 
                    '</td><td>' + jsonData[i].Northbound[j].train_id + 
                    '</td><td>' + jsonData[i].Northbound[j].line + 
                    '</td><td>' + jsonData[i].Northbound[j].destination + 
                    '</td><td>' + jsonData[i].Northbound[j].origin + 
                    '</td><td>' + isLate(jsonData[i].Northbound[j].status) + 
                    '</td><td>' + jsonData[i].Northbound[j].track + '</td>');
          $('#departuresTable').append(row);
      }
    }
  }
  for(let i = 0; i < jsonData.length; i++){
      if(jsonData[i].Southbound != undefined){
        for(let j = 0; j < 5; j++){
          let row = $('<tr><td>' + arrivalTime(jsonData[i].Southbound[j].depart_time) + 
                    '</td><td>' + jsonData[i].Southbound[j].train_id + 
                    '</td><td>' + jsonData[i].Southbound[j].line + 
                    '</td><td>' + jsonData[i].Southbound[j].destination + 
                    '</td><td>' + jsonData[i].Southbound[j].origin + 
                    '</td><td>' + isLate(jsonData[i].Southbound[j].status) + 
                    '</td><td>' + jsonData[i].Southbound[j].track + '</td>');
          $('#departuresTable').append(row);
        }
      }
    }
  }
/**End Board Generation**/

/**Text formatting functions**/  
function arrivalTime(timeString){
  let date = new Date(timeString);

  return date.toLocaleTimeString('en-US',{hour:'numeric',minute:'numeric'});
}

function isLate(status){
  if(status == 'On Time'){
    return status;
  }else{
    return `<span style="color:yellow">${status} LATE</span>`;
  }
}

/**Board Event Listeners**/
$('#btnCloseTable').on('click', function() {
  $('#tableContainer').hide();
});

$('#btnRefreshTable').on('click', function(event){
  let station = $("#slct__station option:selected").val();
  let optText = $('#slct__station option:selected').text();
    if(station =="" || station == null || station == undefined){
      alert("Please select station!");
    } else {
      getArrivals(station, optText);
      event.preventDefault();
    }
  });
