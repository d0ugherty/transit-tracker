
//const map = L.map('map').setView([39.952325, -75.163705], 10);

//map tiles
const map = L.map('map', {
  center: [39.952325, -75.163705],
  zoom: 10,
  layers:[
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
    L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png'),
   
  ]
});




/**
 *  Goal: Retrieve ongitude and latitude of a SEPTA regional train
 *  and add a marker to the map
 *  >   1. figure out successful api call - DONE
 *  >   2. Retrieve data - DONE
 *        a. ISSUE: ajax call not executing on button click
 *          i. FIX: event.preventDefault()
 *  >   3. Display Data
 *  >     a. ISSUE: markers for stations not appearing
 *  >  
 */

$(document).ready(function() {
  

  $("#trainInfo").on('click', function(event){
    $.ajax({
      url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
      type: 'GET',
      dataType: "json",
      success: function(data){
      $.each(data, function(i,item){
         displayTrainCurrentLoc(item);
         //alert("Train Number " + trainNumber + ' ' + item.dest);
        });
      }
    });
    $.ajax({
      url: "https://www3.septa.org/api/locations/get_locations.php?lon=-75.161&lat=39.952&type=rail_stations&radius=150",
      type: 'GET',
      dataType: "json",
      success: function(data){
        $.each(data, function(i,item){
            displayStationLoc(item);
        });
      }
    });
    event.preventDefault();
  });
});

//Adds a marker of a train's location onto the map
function displayTrainCurrentLoc(item){
  let trainNumber = item.trainno;
  let trainIcon = L.icon({
    iconUrl: './packages/leaflet/images/SEPTA_train.png',
    iconSize: [20, 20,]
   // iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
  });
  let trainMarker = L.marker([item.lat, item.lon], {icon: trainIcon}).addTo(map);
  trainMarker.bindPopup(`<h>Train No. ${trainNumber}<br>` + `Next Stop: ${item.nextstop} <br>` + `Line: ${item.line}</>`).openPopup();
}
//Puts a circle on regional rail station locations
function displayStationLoc(item){
    //L.circleMarker([item.location_lat, item.location_lon], {
   // color: 'red',
   // fillColor: 'red',
   // fillOpacity: 1.0,
  //  radius: 4
 // }).addTo(map);

  var stationIcon = L.icon({
    iconUrl: './packages/leaflet/images/SEPTARegionalRail.png',
    iconSize: [20, 20,]
   // iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
  });
  L.marker([item.location_lat, item.location_lon], {icon: stationIcon}).addTo(map);
}

//Display an icon for trolley stops
function displayTrolleyIcon(item){
  let trolleyStop = L.icon({
    iconUrl: './packages/leaflet/images/trolley1.png',
    iconSize: [20,20]
  });
  L.marker([item.location_lat, item.location_lon], {icon: trolleyStop}).addTo(map);
}
//Function to retrieve a station's next arrival
function nextArrival(item){
  
}