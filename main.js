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

  $("#trainInfo").on('click', function(event) {
    map.flyTo([39.952325, -75.163705],10);
    let routeId = $("#slct__line option:selected").text();
    let agency = "septa";
    getRegionalRailLoc()
    getStations(agency, routeId);
    event.preventDefault();
  }); //End Train Button Event Handler

  $("#stops").on('click', function (event) {
    map.flyTo([39.952325, -75.163705], 10);
    let routeId = $("#slct__line option:selected").val();
    let agency = "septa";
    getStations(agency, routeId);
    event.preventDefault();
  });

  $("#arrivals").on('click', function(event) {
    let station = $("#slct__station option:selected").val();
    let optText = $('#slct__station option:selected').text();
    if(station =="" || station == null || station == undefined){
      alert("Please select station!");
    } else {
      $('#tableContainer').css("display","block");

      getArrivals(station, optText);
      event.preventDefault();
    }
  });

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
  $("#njtRail").on('click', function (event) {
    let routeId;
    let agency = "njt";
    getStations();
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