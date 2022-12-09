/**
* Web document stuff
* 
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
    let routeId = $("#slct__line-septa option:selected").val();
    let agency = "septa";
    stationLayer.clearLayers();
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
    let routeId = $("#slct__line-njt option:selected").val();
    let agency = "njt";
    stationLayer.clearLayers();
    getStations(agency, routeId);
    event.preventDefault();
 });
 
});