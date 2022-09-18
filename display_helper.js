
/*
* Functions to display map markers for vehicles and stations/stops
* >     Regional Rail - DONE
* >     Trolleys - IN PROGRESS
*
*/
function displayTrainCurrentLoc(item) {
    let trainNumber = item.trainno;
    let trainIcon = L.icon({
        iconUrl: './packages/leaflet/images/SEPTA_train.png',
        iconSize: [27, 27 ]
    });
    let trainMarker = L.marker([item.lat, item.lon], {
        icon: trainIcon
    }).addTo(trainLayer);
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
    let trolleyMarker = L.marker([item[route].lat, item[route].lng], {
        icon: trolleyIcon
    }).addTo(trolleyLayer);
    trolleyMarker.bindPopup(`<b><h> Route ${item[route]}</b><br>` + `Vehicle: ${item[route].vehicleID}<br>` +
        `Next Stop: ${item[route].next_stop_name}<br>` + `Destination: ${item[route].destination}</h>`).openPopup();
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
  