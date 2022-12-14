/*
 * Functions to display map markers for vehicles and stations/stops
 * >     TO-DO:
 * >           Fix trolley flickering
 * >          
 */

const { Console } = require("console");

function displayTrainCurrentLoc(item, trainLayer, icon) {
  let trainNumber = item.trainno;
  let trainMarker = L.marker([item.lat, item.lon], {
      icon: icon
  }).addTo(trainLayer);
  trainLayer.addTo(map);
  let popup = L.popup({
      "autoClose": false,
      "closeOnClock": null
  }).setContent((`<b>Train No. </b> ${trainNumber}<br>
            <b>Next Stop: </b> ${item.nextstop} <br>
            <b>Line: </b> ${item.line}<br>
            <b> Destination: </b> ${item.dest}`));
  trainMarker.bindPopup(popup);
}

function displayStations(color, fillColor, item) {
    
  let stationMarker = L.circleMarker([item.stop_lat, item.stop_lon], {
      color: color,
      weight: 5,
      fillColor: fillColor,
      fillOpacity: 1.0,
      radius: 7
  }).addTo(stationLayer);
  let popup = L.popup({
      "autoClose": false,
      "closeOnClock": null
  }).setContent(`<h3>${item.stop_name}</h3>`);
  stationMarker.bindPopup(popup);
}

function displayStationsOnRoute(agency, routeId, color, fillColor, item) {
        console.log(item);
  let stationMarker = L.circleMarker([item.stop_lat, item.stop_lon], {
      color: color,
      weight: 5,
      fillColor: fillColor,
      fillOpacity: 1.0,
      radius: 7
  }).addTo(stationLayer);
  let popup = L.popup({
      "autoClose": false,
      "closeOnClock": null
  }).setContent(`<h3>${item.stop_name}</h3>`);
  stationMarker.bindPopup(popup);
}

function displayTrolleyLoc(item, route, trolleyLayer, icon) {
  let jsonData = [];
  jsonData = item;
  for (let i = 0; i < jsonData.length; i++) {
      let trolleyMarker = L.marker([jsonData[i].lat, jsonData[i].lng], {
          icon: icon
      });
      let popup = L.popup({
          "autoClose": false,
          "closeOnClock": null
      }).setContent(`<b><h> Route ${route}</b><br>
      <b>Vehicle:</b> ${jsonData[i].VehicleID}<br>
      <b>Next Stop:</b> ${jsonData[i].next_stop_name}<br>
      <b>Destination:</b> ${jsonData[i].destination}</h>`);
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
  let popup = L.popup({
      "autoClose": false,
      "closeOnClock": null
  }).setContent(`<b><h3>${item.stopname}</h3></b>`);
  stationMarker.bindPopup(popup);
}

function displayShapes() {
  let shapeIds = [5401, 401005, 401007,720004,
    720005, 7801, 801007, 1005,
    5815, 815005, 5531, 203005,
    205005, 327005, 417005, 701007, 302005, 300007,
    516007, 505007, 501007, 228005, 516007, 538005];
    
    let color = '#566573'; //add septa color
    for (let i = 0; i < shapeIds.length; i++) {
      let url = `api/shapes/septa/${shapeIds[i]}`;
      let latlngs = []
      $.getJSON(url)
        .done(function (data) {
          for (let i = 0; i < data.length; i++) {
            latlngs[i] = [data[i].shape_pt_lat, data[i].shape_pt_lon];
          }
          console.log(latlngs);
          let polyline = L.polyline(latlngs, { color: '#698396'}).addTo(map);
          console.log(polyline.getLatLngs());
        });
    }
   }
  /*function displayShapes() {
    console.log("display shapes");
    let routes = ['AIR', 'CHE', 'CHW', 'CYN', 'FOX', 'LAN', 'MAN', 'NOR', 'PAO', 'TRE', 'WAR', 'WIL', 'WTR'];
    routes.forEach(function (id) {
      let url = `api/shapes/septa/${id}`;
      let latlngs = [];
      $.getJSON(url)
        .done(function (data) {
          for (let i = 0; i < data.length; i++) {
            console.log(id + " shape " + data[i].shape_id + " sequence " + data[i].shape_pt_sequence);
            latlngs[i] = [data[i].shape_pt_lat, data[i].shape_pt_lon];
          }
          console.log(latlngs);
          let polyline = L.polyline(latlngs, { color: '#566573' }).addTo(map);
        });
    });
  }*/
  