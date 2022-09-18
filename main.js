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
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'),
      L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png')
    ]
});

map.attributionControl.addAttribution('Data <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>'+ 
                                    ' Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a>'+
                                    '<a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>');
let trainLayer = L.layerGroup().addTo(map);
let stationLayer = L.layerGroup().addTo(map);
let trolleyLayer = L.layerGroup().addTo(map);
let trolleyStopLayer = L.layerGroup().addTo(map);


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

  let trolleyStopURLs = ["https://www3.septa.org/api/Stops/index.php?req1=10",
      "https://www3.septa.org/api/Stops/index.php?req1=11",
      "https://www3.septa.org/api/Stops/index.php?req1=15",
      "https://www3.septa.org/api/Stops/index.php?req1=34",
      "https://www3.septa.org/api/Stops/index.php?req1=36",
      "https://www3.septa.org/api/Stops/index.php?req1=101",
      "https://www3.septa.org/api/Stops/index.php?req1=102"
  ];
  
  let trolleyLocURLs = ["https://www3.septa.org/api/TransitView/index.php?route=10&callback=?",
                        "https://www3.septa.org/api/TransitView/index.php?route=11&callback=?",
                        "https://www3.septa.org/api/TransitView/index.php?route=15&callback=?",
                        "https://www3.septa.org/api/TransitView/index.php?route=34&callback=?",
                        "https://www3.septa.org/api/TransitView/index.php?route=36&callback=?",
                        "https://www3.septa.org/api/TransitView/index.php?route=101&callback=?",
                        "https://www3.septa.org/api/TransitView/index.php?route=102&callback=?"]

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
    sendRequest();
    function sendRequest(){
        trolleyLayer.clearLayers();
        $.each(trolleyLocURLs, function(i,u) {
            $.ajax(u, {
                type: 'POST',
                dataType:'jsonp',
                success: function(data){
                    $.each(data, function(i,item){
                        displayTrolleyLoc(item);
                    });
                },
                complete: function() {
                    setInterval(sendRequest,5000);
                }
            });
        });
    }
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

  $("#clear").on('click', function(event){
    location.reload();
    });
 $("#njtRail").on('click', function(event){
    
 });
});