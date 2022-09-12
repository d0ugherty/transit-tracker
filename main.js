

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
 *  >   2. Retrieve data
 *  >   3. Store data
 *  >  
 */




let request = new XMLHttpRequest();
const url =`https://www3.septa.org/api/TrainView/index.php`;
request.open('GET', url, true);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


request.onload = logTrainLine(request);
 function logTrainLine(request){
    let train = [
        {
          "lat": "string",
          "lon": "string",
          "trainno": "string",
          "service": "string",
          "dest": "string",
          "currentstop": "string",
          "nextstop": "string",
          "line": "string",
          "consist": "string",
          "heading": 0,
          "late": 0,
          "SOURCE": "string",
          "TRACK": "string",
          "TRACK_CHANGE": "string"
        }
      ];
    let data = request.response;
   if(request.readyState === 4) {
        if(request.status >= 200 && request.status <= 400){
            data.forEarch(train => {
            console.log(train.line);
        });
        } else {
             console.log('ERROR: ' + request.status);
        }
    }
};

request.send();


