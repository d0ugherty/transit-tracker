//Coordinates and zoom level

const map = L.map('map').setView([39.646763, -74.870229], 10);

//map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);




/**
 * Things that appear on the map
 * 
 * markers, polygons, etc.
 */

//markers
const markerTemple = L.marker([39.9814135,-75.1498225]).addTo(map);
const markerSubStat = L.marker([39.9535029,-75.1668778]).addTo(map);
const markerJeffStat = L.marker([39.9523833,-75.1589131]).addTo(map);
const marker30thSt = L.marker([39.9563854,-75.1814182]).addTo(map);
const markerPennMed = L.marker([39.94784, -75.19034]).addTo(map);
const markerEastwick = L.marker([39.8917, -75.245]).addTo(map);
const markerTermA = L.marker([39.876070, -75.245782]).addTo(map);
const markerTermB = L.marker([39.876297, -75.2447313]).addTo(map);
const markerTermCD = L.marker([39.877226, -75.241618]).addTo(map);
const markerTermEF = L.marker([39.878872, -75.240046]).addTo(map);

//a circle
const circle = L.circle([39.933799736675866, -75.08021346724827], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1000 //meters
}).addTo(map);

//a polygon
const polygon = L.polygon([
    [39.801254, -75.349035],
    [38.951428, -74.922081],
    [39.837569, -74.508291]
]).addTo(map);

//popups for objects on the map
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");