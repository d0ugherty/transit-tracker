
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

  //For some reason the max radius to get locations is around 8 miles
  let railStationURLs = ["https://www3.septa.org/api/locations/get_locations.php?lon=-75.161&lat=39.952&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-75.598&lat=40.031&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-75.625&lat=39.079&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-75.705&lat=39.689&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-75.403&lat=39.828&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-75.325&lat=40.053&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-75.050&lat=40.053&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-74.857&lat=40.171&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-75.221&lat=40.241&type=rail_stations&radius=55&callback=?",
                "https://www3.septa.org/api/locations/get_locations.php?lon=-75.094&lat=40.184&type=rail_stations&radius=55&callback=?"];

  
  $("#trainInfo").on('click', function(event){
    
    
    $.ajax({
      url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
      type: 'GET',
      dataType: "jsonp",
      success: function(data){
      $.each(data, function(i,item){
         displayTrainCurrentLoc(item);
         //alert("Train Number " + trainNumber + ' ' + item.dest);
        });
      }
    });
    $.each(railStationURLs, function(i,u) {
      $.ajax(u, 
        { type: 'POST',
          dataType: 'jsonp',
          success: function(data){
            $.each(data,function(i,item){
             displayStationLoc(item);
            });
          }
        });
        event.preventDefault();
      });
   // $.ajax({
      //url: "https://www3.septa.org/api/locations/get_locations.php?lon=-75.161&lat=39.952&type=rail_stations&radius=55&callback=?",
      //type: 'GET',
      //dataType: "jsonp",
      //success: function(data){
       // $.each(data, function(i,item){
        //    displayStationLoc(item);
       // });
      //}
    
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
   let stationMarker = L.circleMarker([item.location_lat, item.location_lon], {
    color: '#2C3E50',
    weight: 4,
    fillColor: '#c9d3d9',
    fillOpacity: 1.0,
    radius: 6
  }).addTo(map);
  stationMarker.bindPopup(`<h>${item.location_name}</h>`)

  //var stationIcon = L.icon({
  //  iconUrl: './packages/leaflet/images/SEPTARegionalRail.png',
   // iconSize: [20, 20,]
   // iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
  //});
 // L.marker([item.location_lat, item.location_lon], {icon: stationIcon}).addTo(map);
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
//store locations to 
function addLocations(item){
  let locations = [];
  let data = 
    {
      location_id: item.location_id,
      location_name: item.location_name,
      location_lat: item.location_lat,
      location_lon: item.location_lon,
      distance: item.distance,
      location_type: item.location_type,
      location_data: {
        location_id: item.location_data.location_id,
        location_name: item.location_data.location_name,
        startDate: item.location_data.startDate,
        endDate: item.location_data.endDate,
        address1: item.location_data.address1,
        address2: item.location_data.address2,
        city: item.location_data.city,
        state: item.location_data.state,
        zip: item.location_data.zip,
        hours: item.location_data.hours,
        loc_name: item.location_data.loc_name,
        status: item.location_data.status,
        phone: item.location_data.phone
      }
    }
    locations.push(data);
}