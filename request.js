//SEPTA Regional Rail train location tracking
function getRegionalRailLoc() {
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
        complete: function() {
            setTimeout(getRegionalRailLoc, 5000);
        }
    });
}

//SEPTA Regional Rail station location marking
/*function getRegionalRailStations(agency, routeId) {
    if (agency == 'septa' && routeId == 'ALL') {
        let url = "/api/stop/?agency=septa";
        $.getJSON(url)
            .done(function (data) {
                $.each(data, function (key, item) {
                    let color = '#2C3E50';
                    let fillColor = '#c9d3d9';
                    displayStationLoc(color, fillColor, item);
                })
            })
    } else if (agency == 'septa') 
}*/

function getStations(agency, routeId) {
    if (agency == 'septa') {
        
    }
    
}

function getArrivals(station, optText) {
    $.ajax({
        url: `https://www3.septa.org/api/Arrivals/index.php?station=${station}&results=10`,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            $('#departuresTable tbody').empty();
            $.each(data, function(i, item) {
                loadBoard(item, optText);
            });
        },
        complete: function() {
            setTimeout(getArrivals, 5000);
        }
    });
}

//SEPTA Subway-surface trolley location tracking
function getTrolleyLoc(route) {
    let trolleyUrl = `https://www3.septa.org/api/TransitView/index.php?route=${route}`;
    $.ajax({
        url: trolleyUrl,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            $.each(data, function(i, item) {
                trolleyLayer.clearLayers();
                displayTrolleyLoc(item, route, trolleyLayer, trolleyIcon);
            });
        },
        complete: function() {
            setInterval(`getTrolleyLoc(${route})`, 2000);
        }
    });
}

//SEPTA Subway-surface trolley stop marking
function getTrolleyStops(route) {
    let stopUrl = `https://www3.septa.org/api/Stops/index.php?req1=${route}`;
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

//NJT Atlantic City Line Stop Locations
function getACLStops() {
    let url = "/api/stop/?stopDesc='ACL'";
    $.getJSON(url)
        .done(function(data){
            $.each(data, function (key, item) {
                let color = '#f5853e';
                let fillColor = '#075aaa';
                displayStationLoc(color, fillColor, item);
            });
        });
}


