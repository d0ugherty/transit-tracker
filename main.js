

const map = L.map('map').setView([39.952325, -75.163705], 10);

//map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
}).addTo(map);




/**
 *  Goal: Retrieve ongitude and latitude of a SEPTA regional train
 *  and add a marker to the map
 *  >   1. figure out successful api call
 *           a. ISSUE: call is correct but not going through
 *              i. TRY: process the API call with AJAX
 *  >   2. Retrieve data
 *  >   3. Store data
 *  >  
 */

$(document).ready(function(){
  $('#trainLocation').click(function (){
    let request = new XMLHttpRequest();
    const url = `https://www3.septa.org/api/TrainView/index.php`;
    request.onreadystatechange = function() {
   
    console.log('Ready State: ' + request.readyState);
    console.log('Status: ' + request.status);
      if (this.readyState === 4 && this.status === 200){
        console.log('Status: ' + request.status);
        console.log('Ready State: ' + request.readyState);
        const response = JSON.parse(this.responseText);
        getElements(response);
        } else {
          console.log('Ready State: ' + request.readyState);
          console.log('Status: ' + request.status);
        }
      }
        request.open("GET",url,true);
        request.send();
        function getElements(response){
          $('.showTrains').text(response.line);
        }
    });
  });