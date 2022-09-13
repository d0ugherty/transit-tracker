
const map = L.map('map').setView([39.952325, -75.163705], 10);

//map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
}).addTo(map);




/**
 *  Goal: Retrieve ongitude and latitude of a SEPTA regional train
 *  and add a marker to the map
 *  >   1. figure out successful api call - DONE
 *  >   2. Retrieve data - DONE
 *  >   3. Store data
 *  >   4. Display Data
 *  >  
 */

$(document).ready(function(){
    
  $.ajax({
    url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
    type: 'GET',
   dataType: "jsonp",
    success: function(data){
      $.each(data, function(i,item){
          var trainNumber =item.trainno;
          if( item.line== 'West Trenton')
          {
              alert("Train Number " + trainNumber + ' ' + item.dest);
          }
  
      });
    }
  });
  
  
});