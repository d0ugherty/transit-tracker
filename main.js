
//const map = L.map('map').setView([39.952325, -75.163705], 10);

//map tiles
//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//maxZoom: 19,
//attribution: '© OpenStreetMap'
//}).addTo(map);




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
    
      $.ajax({
        type: 'GET',
        url: "https://www3.septa.org/api/TrainView/index.php",
        contentType: "application/json",
        dataType: 'json',
        sucess: function(result){
          console.log('SUCCESS');
          $.each(result, function(i, item){
            let trainNumber = item.trainno;
            if(item.line == "West Trenton")
            {
                alert('Train Number: ' + trainNumber);
            }
          });
        }
      });
  
});