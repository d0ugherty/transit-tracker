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
  

  $("#trainInfo").on('click', function(event) {
    map.flyTo([39.952325, -75.163705],10);
    getRegionalRailLoc()
    getRegionalRailStations(railStationURLs);
    event.preventDefault();
  }); //End Train Button Event Handler

  $("#arrivals").on('click', function(event) {
    let station = $("#slct__station option:selected").val();
    if(station =="" || station == null || station == undefined){
      alert("Please select station!");
    } else {
      getRegionalRailArrivals(station);
      event.preventDefault();
    }
  })

  $("#trolleyInfo").on('click', function(event) {
    let route = $("#slct__trolley option:selected").val();
    if(route == "" || route == null || route == undefined){
        alert("Please select a route!");
    } else {
        getTrolleyLoc(route);
        getTrolleyStops(route);
        event.preventDefault();
    }
  }); //End Trolley Button Event Handler

$("#clear").on('click', function(event){
    location.reload();
    });
$("#njtRail").on('click', function(event){
   //TO DO: finish this
 });
});

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.classList.remove("form__input--success");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}