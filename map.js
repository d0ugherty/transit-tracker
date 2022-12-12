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
      ],
      tap: false
  });
  
  map.attributionControl.addAttribution('Data <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>'+ 
                                      ' Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a>'+
                                      '<a href="http://www.openrailwaymap.org/">OpenRailwayMap</a>');
let trainLayer = L.layerGroup();
let stationLayer = L.layerGroup().addTo(map);
let trolleyLayer = L.layerGroup().addTo(map);
let trolleyStopLayer = L.layerGroup().addTo(map);
let shapesLayer = L.layerGroup().addTo(map);
let trainIcon = L.icon({
  iconUrl: './packages/leaflet/images/SEPTARegionalRail-bw.png',
  iconSize: [30, 30]
});

let trolleyIcon = L.icon({
  iconUrl: './packages/leaflet/images/SEPTATrolleytrans.png',
  iconSize: [30, 30]
});


function displayShapes() {
  console.log("display shapes");
  let lat;
  let lon;
  let latLon = [[lat,lon]];
  let color = '#566573'; //add septa color
  let url = `/api/shapes/septa`;
  $.getJSON(url)
    .done(function (data) {
      $.each(data, function (key, item) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          latLon.push([data[i].shape_pt_lat, data[i].shape_pt_lon]);
          console.log("lat: " + latLon[i].lat + "  Lon: " + latLon[i].lon);
        
        }
      });
    });
  let polyline = L.polyline(latLon, { color: color }).addTo(shapesLayer);
}

  