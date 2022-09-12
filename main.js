import $ from 'jquery';

const map = L.map('map').setView([39.952325, -75.163705], 10);

//map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
}).addTo(map);

/**
 *
 */





function getTrainLocations(){
    let request = new XMLHttpRequest();
    const url =`https://www3.septa.org/api/TrainView/index.php`;

    request.addEventListener("loadend", function() {
        var data = JSON.parse(this.responseText);
        console.log(data.lat);
        console.log(data.lon);
    });

}

function handleSubmission(event){
    event.preventDefault();
   
    var marker = L.marker([]).addTo(map);
}