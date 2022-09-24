/**
 * 
 * 
 */

//SEPTA Regional Rail train location tracking
function getRegionalRailLoc(){
    $.ajax({
        url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
        type: 'GET',
        dataType: "jsonp",
        success: function(data) {
            trainLayer.clearLayers();
            $.each(data, function(i, item) {
            displayTrainCurrentLoc(item, trainIcon, trainLayer);
            });
          },
          complete: function(){
            setInterval(getRegionalRailLoc, 5000);
          }
      });
}

//SEPTA Regional Rail station location marking
function getRegionalRailStations(railStationURLs){
        $.each(railStationURLs, function(i, u) {
              $.ajax(u, {
                  type: 'GET',
                  dataType: 'jsonp',
                  success: function(data) {
                      $.each(data, function(i, item) {
                          displayStationLoc(item);
                      });
                  }
              });
          });
    }

//SEPTA Subway-surface trolley location tracking
function getTrolleyLoc(route){
    let trolleyUrl = `https://www3.septa.org/api/TransitView/index.php?route=${route}`;
    $.ajax({
        url: trolleyUrl,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data){
            trolleyLayer.clearLayers();
            $.each(data, function(i,item) {
                displayTrolleyLoc(item,route);
            });
        },
        complete: function(){
        setInterval(getTrolleyLoc(route), 5000);
        }
    });
}

//SEPTA Subway-surface trolley stop marking
function getTrolleyStops(route){
let stopUrl=`https://www3.septa.org/api/Stops/index.php?req1=${route}`;
    $.ajax({
    url: stopUrl,
    type: 'GET',
    dataType: 'jsonp',
    success: function(data) {
        $.each(data, function(i, item) {
            displayTrolleyStops(item);
            });
        }
    });
}
