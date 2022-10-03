
/*
* Functions to display map markers for vehicles and stations/stops
* >     Regional Rail - DONE
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
  
  function arrivalsBoard(item) {
    //To-Do: Finish this
  }
  