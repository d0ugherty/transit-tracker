
/*
* Functions to display map markers for vehicles and stations/stops
* >     Regional Rail - DONE
* >     Trolleys - IN PROGRESS
*
*/
function displayTrainCurrentLoc(item,icon, trainLayer) {
    let trainNumber = item.trainno;
    let trainMarker = L.marker([item.lat, item.lon], {
        icon: icon
    }).addTo(trainLayer);
    trainLayer.addTo(map);
    trainMarker.bindPopup(`<b><h3>Train No. </b> ${trainNumber}<br>` + `<b>Next Stop: </b> ${item.nextstop} <br>` 
                          + `<b>Line: </b> ${item.line}<br>` + `<b> Destination: </b> ${item.dest}</h3>`);

}
  
  function displayStationLoc(item) {
    let stationMarker = L.circleMarker([item.location_lat, item.location_lon], {
        color: '#2C3E50',
        weight: 5,
        fillColor: '#c9d3d9',
        fillOpacity: 1.0,
        radius: 7
    }).addTo(stationLayer);
    stationMarker.bindPopup(`<h3>${item.location_name}</h3>`);
  }
  
  
  function displayTrolleyLoc(item,route) {
    let trolleyIcon = L.icon({
        iconUrl: './packages/leaflet/images/trolley1.png',
        iconSize: [20, 20]
    });
    let jsonData = [];
    jsonData = item;
    for(let i = 0; i < jsonData.length; i++){
        console.log(jsonData[i].VehicleID);
        let trolleyMarker = L.marker([jsonData[i].lat, jsonData[i].lng], {
            icon: trolleyIcon
        }).addTo(trolleyLayer);
        trolleyMarker.bindPopup(`<b><h> Route ${route}</b><br>` + `<b>Vehicle:</b> ${jsonData[i].VehicleID}<br>` +
           `<b>Next Stop:</b> ${jsonData[i].next_stop_name}<br>` + `<b>Destination:</b> ${jsonData[i].destination}</h>`);
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
    stationMarker.bindPopup(`<h3>${item.stopname}</h3>`);
  }
  
  function nextArrival(item) {
  
  }
  