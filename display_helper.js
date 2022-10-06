const { defaultMaxListeners } = require("events");

/*
* Functions to display map markers for vehicles and stations/stops
* >     TO DO: Fix Time format for departure board
* >     Trolleys - IN PROGRESS
*
*/
function displayTrainCurrentLoc(item, trainLayer, icon) {
    let trainNumber = item.trainno;
    let trainMarker = L.marker([item.lat, item.lon], {
        icon: icon
    }).addTo(trainLayer);
    trainLayer.addTo(map);
    let popup = L.popup({"autoClose": false, "closeOnClock": null}).setContent((`<b>Train No. </b> ${trainNumber}<br>` + `<b>Next Stop: </b> ${item.nextstop} <br>` 
    + `<b>Line: </b> ${item.line}<br>` + `<b> Destination: </b> ${item.dest}`));
    trainMarker.bindPopup(popup);

}
  
  function displayStationLoc(item) {
    let stationMarker = L.circleMarker([item.location_lat, item.location_lon], {
        color: '#2C3E50',
        weight: 5,
        fillColor: '#c9d3d9',
        fillOpacity: 1.0,
        radius: 7
    }).addTo(stationLayer);
    let popup = L.popup({"autoClose": false, "closeOnClock": null}).setContent(`<h3>${item.location_name}</h3>`);
    stationMarker.bindPopup(popup);
  }
  
  
  function displayTrolleyLoc(item, route, trolleyLayer, icon) {

    let jsonData = [];
    jsonData = item;
    for(let i = 0; i < jsonData.length; i++){
        let trolleyMarker = L.marker([jsonData[i].lat, jsonData[i].lng], {
            icon: icon
        });
        let popup = L.popup({"autoClose": false, "closeOnClock": null}).setContent(`<b><h> Route ${route}</b><br>` + `<b>Vehicle:</b> ${jsonData[i].VehicleID}<br>` +
        `<b>Next Stop:</b> ${jsonData[i].next_stop_name}<br>` + `<b>Destination:</b> ${jsonData[i].destination}</h>`);
        trolleyMarker.addTo(trolleyLayer);
        trolleyMarker.bindPopup(popup);
    }
}
  
  
  function displayTrolleyStops(item) {
  let stationMarker = L.circleMarker([item.lat, item.lng], {
        color: '#207100',
        weight: 3,
        fillColor: '#cfd9cd',
        fillOpacity: 1.0,
        radius: 6
     }).addTo(trolleyStopLayer);
     let popup = L.popup({"autoClose": false, "closeOnClock": null}).setContent(`<b><h3>${item.stopname}</h3></b>`);
     stationMarker.bindPopup(popup);
    
  }
  
  function loadBoard(item, optText) {
    //To-Do: Finish this
    let jsonData = [];
    jsonData = item;
    //console.log(jsonData[0].Southbound[0].train_id);
    $('#boardTitle').html('<h2><b> Train Information: ' + optText + '</h2></b>');
    for(let i = 0; i < jsonData.length; i++){
      if(jsonData[i].Northbound != undefined){
        for(let j = 0; j < 3; j++){
          let row = $('<tr><td>' + arrivalTime(jsonData[i].Northbound[j].depart_time) + 
                      '</td><td>' + jsonData[i].Northbound[j].train_id + 
                      '</td><td>' + jsonData[i].Northbound[j].line + 
                      '</td><td>' + jsonData[i].Northbound[j].destination + 
                      '</td><td>' + jsonData[i].Northbound[j].origin + 
                      '</td><td>' + jsonData[i].Northbound[j].status + 
                      '</td><td>' + jsonData[i].Northbound[j].track + '</td>');
            $('#departuresTable').append(row);
        }
      }
    }
    for(let i = 0; i < jsonData.length; i++){
        if(jsonData[i].Southbound != undefined){
          for(let j = 0; j < 3; j++){
            let row = $('<tr><td>' + arrivalTime(jsonData[i].Southbound[j].depart_time) + 
                      '</td><td>' + jsonData[i].Southbound[j].train_id + 
                      '</td><td>' + jsonData[i].Southbound[j].line + 
                      '</td><td>' + jsonData[i].Southbound[j].destination + 
                      '</td><td>' + jsonData[i].Southbound[j].origin + 
                      '</td><td>' + jsonData[i].Southbound[j].status + 
                      '</td><td>' + jsonData[i].Southbound[j].track + '</td>');
            $('#departuresTable').append(row);
          }
        }
      }
    }
  
  function arrivalTime(timeString){
    let date = new Date(timeString);

   return date.toLocaleTimeString('en-US',{
      hour:'numeric',
      minute:'numeric'
    });
  }
  
