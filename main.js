
/**
 *  Phase 1:
 *  >   1. figure out successful api call - DONE
 *  >   2. Retrieve data - DONE
 *        a. ISSUE: ajax call not executing on button click
 *          i. FIX: event.preventDefault()
 *  >   3. Display Data 
 *  >     a. Regional rail train locations -DONE
 *  >     b. Regional rail stations - DONE
 *  >     c. Trolley locations
 *  >     d. Trolley stops
 *  >     e. station arrivals
 *  Phase 2:
 *  >     1. Live location updates - DONE
 *  >     2. Visualize vehicle heading
 *  >     3. 
 */




/***************
 * 
 * Map creation
 * 
 * 
 * */
const map = L.map('map', {
  center: [39.952325, -75.163705],
  zoom: 10,
  layers:[
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
    L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png'),
   
  ]
});

//Initialize separate layers for vehicle positions and station locations
let trainLayer = L.layerGroup().addTo(map);
let stationLayer = L.layerGroup().addTo(map);


$(document).ready(function() {
    
  
  $("#trainInfo").on('click', function(event){ //Begin Train Info Button event handler
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

  sendRequest();
  function sendRequest(){
    trainLayer.clearLayers();
    $.ajax({
      url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
      type: 'GET',
      dataType: "jsonp",
      success: function(data){
      $.each(data, function(i,item){
         displayTrainCurrentLoc(item);
        });
      },
      complete: function() {
        // Schedule the next request when the current one's complete
        setInterval(sendRequest, 10000); // The interval set to 5 seconds
      }
    });
  }
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
       });
       event.preventDefault();
    }); //End Train Button Event Handler

  $('#trolleyInfo').on('click', function(event) { //Begin trolley info button event handler
    let trolleyStopURLs = ["https://www3.septa.org/api/Stops/index.php?req1=10&callback=?",
    "https://www3.septa.org/api/Stops/index.php?req1=11&callback=?",
    "https://www3.septa.org/api/Stops/index.php?req1=15&callback=?",
    "https://www3.septa.org/api/Stops/index.php?req1=34&callback=?",
    "https://www3.septa.org/api/Stops/index.php?req1=36&callback=?",
    "https://www3.septa.org/api/Stops/index.php?req1=101&callback=?",
    "https://www3.septa.org/api/Stops/index.php?req1=102&callback=?"];
    $.ajax({
      url: "https://www3.septa.org/api/TransitViewAll/index.php&callback=?", //TransitView trolley url here
      type: 'GET',
      dataType: 'jsonp',
      success: function(data){
        $.each(data, function(i,item){
          if(item.routes == "10" || item.routes == "11" || item.routes == "15" 
          || item.routes == "34" || item.routes == "36" || item.routes == "101" 
          || item.routes == "102"){
                    displayTrolleyCurrentLoc(item);
          }
        });
      }});
    $.each(trolleyStopURLs, function(i,u){
      $.ajax(u,
        { type: 'POST',
          dataType: 'jsonp',
          success: function(data){
            $.each(data, function(i, item){
              displayTrolleyStops(item);
            });
        }
     });
     event.preventDefault();
    });
    
  }); //End Trolley Button Event Handler
});

/*
* Functions to display map markers for vehicles and stations/stops
* >     Regional Rail - DONE
* >     Trolleys - IN PROGRESS
*
*/
function displayTrainCurrentLoc(item){
  let trainNumber = item.trainno;
  let trainIcon = L.icon({
    iconUrl: './packages/leaflet/images/SEPTA_train.png',
    iconSize: [20, 20,]
   // iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
  });
  let trainMarker = L.marker([item.lat, item.lon], {icon: trainIcon}).addTo(trainLayer);
  trainMarker.bindPopup(`<h>Train No. ${trainNumber}<br>` + `Next Stop: ${item.nextstop} <br>` + `Line: ${item.line}</h>`);
}
//Puts a circle on regional rail station locations
function displayStationLoc(item){
   let stationMarker = L.circleMarker([item.location_lat, item.location_lon], {
    color: '#2C3E50',
    weight: 4,
    fillColor: '#c9d3d9',
    fillOpacity: 1.0,
    radius: 6
  }).addTo(stationLayer);
  stationMarker.bindPopup(`<h>${item.location_name}</h>`);
}

//Display trolley locations
function displayTrolleyCurrentLoc(item){
  let trolleyIcon = L.icon({
    iconUrl: './packages/leaflet/images/trolley1.png',
    iconSize: [20,20]
  });
  let trolleyMarker = L.marker([item.routes.lat, item.routes.lon], {icon: trolleyIcon}).addTo(layerGroup);
  trolleyMarker.bindPopup(`<h> Route ${item.routes}<br>` + `Vehicle: ${item.routes.vehicleID}<br>` + 
                          `Next Stop: ${item.routes.next_stop_name}<br>` + `Destination: ${item.routes.destination}</h>`).openPopup();
}

//Display trolley stops
function displayTrolleyStops(item){
  let stationMarker = L.circleMarker([item.lat, item.lon], {
    color: '#207100',
    weight: 4,
    fillColor: '#cfd9cd',
    fillOpacity: 1.0,
    radius: 4
  }).addTo(layerGroup);
  stationMarker.bindPopup(`<h>${item.stopname}</h>`);
}
//Function to retrieve a station's next arrival
function nextArrival(item){
  
}
