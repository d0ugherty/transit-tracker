//SEPTA Regional Rail train location tracking
function getRegionalRailLoc(){
    $.ajax({
        url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
        type: 'GET',
        dataType: "jsonp",
        success: function(data) {
            trainLayer.clearLayers();
            $.each(data, function(i, item) {
            displayTrainCurrentLoc(item, trainLayer, trainIcon);
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
            $.each(data, function(i,item) {
                trolleyLayer.clearLayers();
                displayTrolleyLoc(item,route, trolleyLayer, trolleyIcon);
            });
        },
        complete: function(){
        setInterval(getTrolleyLoc(route), 2000);
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
