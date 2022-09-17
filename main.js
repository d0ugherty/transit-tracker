/***************
 *  Map creation using the Leaflet JavaScript library
 * 
 *  'stationLayer' and 'trainLayer' were created so markers can be added to layer groups rather than
 *   the map itself. This makes for easy marker removal either for toggling or 
 *   the retrieval of new data (live updating)
 * */
 const map = L.map('map', {
  center: [39.952325, -75.163705],
  zoom: 10,
  layers: [
      //L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'),
      L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png')

  ]
});

let trainLayer = L.layerGroup().addTo(map);
let stationLayer = L.layerGroup().addTo(map);


/**
* Web document stuff
* 
* Multiple URLs are needed for getting locations of Regional Rail
* Station locations.For some reason the max radius to get locations is around 8 miles.
* 
* Trolley stop locations are gathered by route number. Might divide the the location gathering
* by trolley route/rail line
*/
$(document).ready(function() {

  let railStationURLs = ["https://www3.septa.org/api/locations/get_locations.php?lon=-75.161&lat=39.952&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.598&lat=40.031&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.625&lat=39.079&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.705&lat=39.689&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.403&lat=39.828&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.325&lat=40.053&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.050&lat=40.053&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-74.857&lat=40.171&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.221&lat=40.241&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.094&lat=40.184&type=rail_stations&radius=55&callback=?"
  ];

  let trolleyStopURLs = ["https://www3.septa.org/api/Stops/index.php?req1=10&callback=?",
      "https://www3.septa.org/api/Stops/index.php?req1=11&callback=?",
      "https://www3.septa.org/api/Stops/index.php?req1=15&callback=?",
      "https://www3.septa.org/api/Stops/index.php?req1=34&callback=?",
      "https://www3.septa.org/api/Stops/index.php?req1=36&callback=?",
      "https://www3.septa.org/api/Stops/index.php?req1=101&callback=?",
      "https://www3.septa.org/api/Stops/index.php?req1=102&callback=?"
  ];

  $("#trainInfo").on('click', function(event) {
      sendRequest();

      function sendRequest() {
          trainLayer.clearLayers();
          $.ajax({
              url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
              type: 'GET',
              dataType: "jsonp",
              success: function(data) {
                  $.each(data, function(i, item) {
                      displayTrainCurrentLoc(item);
                  });
              },
              complete: function() {
                  setInterval(sendRequest, 10000);
              }
          });
      }
      $.each(railStationURLs, function(i, u) {
          $.ajax(u, {
              type: 'POST',
              dataType: 'jsonp',
              success: function(data) {
                  $.each(data, function(i, item) {
                      displayStationLoc(item);
                  });
              }
          });
      });
      event.preventDefault();
  }); //End Train Button Event Handler

  $("#trolleyInfo").on('click', function(event) {

      /*$.ajax({
          url: "https://www3.septa.org/api/TransitViewAll/index.php&callback=?",
          type: 'GET',
          dataType: 'jsonp',
          success: function(data) {
              $.each(data, function(i, item) {
                  if (item.routes == "10" || item.routes == "11" || item.routes == "15" ||
                      item.routes == "34" || item.routes == "36" || item.routes == "101" ||
                      item.routes == "102") {
                      displayTrolleyCurrentLoc(item);
                  }
              });
          }
      });*/
      $.each(trolleyStopURLs, function(i, u) {
          $.ajax(u, {
              type: 'POST',
              dataType: 'jsonp',
              success: function(data) {
                  $.each(data, function(i, item) {
                      displayTrolleyStops(item);
                  });
              }
          });
          
      });
      event.preventDefault();
  }); //End Trolley Button Event Handler
});

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
  trainMarker.bindPopup(`<h>Train No. ${trainNumber}<br>` + `Next Stop: ${item.nextstop} <br>` + `Line: ${item.line}</h>`);
}

function displayStationLoc(item) {
  let stationMarker = L.circleMarker([item.location_lat, item.location_lon], {
      color: '#2C3E50',
      weight: 4,
      fillColor: '#c9d3d9',
      fillOpacity: 1.0,
      radius: 6
  }).addTo(stationLayer);
  stationMarker.bindPopup(`<h>${item.location_name}</h>`);
}


function displayTrolleyCurrentLoc(item) {
  let trolleyIcon = L.icon({
      iconUrl: './packages/leaflet/images/trolley1.png',
      iconSize: [20, 20]
  });
  let trolleyMarker = L.marker([item.routes.lat, item.routes.lon], {
      icon: trolleyIcon
  }).addTo(layerGroup);
  trolleyMarker.bindPopup(`<h> Route ${item.routes}<br>` + `Vehicle: ${item.routes.vehicleID}<br>` +
      `Next Stop: ${item.routes.next_stop_name}<br>` + `Destination: ${item.routes.destination}</h>`).openPopup();
}


function displayTrolleyStops(item) {
  let stationMarker = L.circleMarker([item.lat, item.lon], {
      color: '#207100',
      weight: 4,
      fillColor: '#cfd9cd',
      fillOpacity: 1.0,
      radius: 4
  }).addTo(layerGroup);
  stationMarker.bindPopup(`<h>${item.stopname}</h>`);
}

function nextArrival(item) {

}