# transit-tracker
Interactive map mostly just to mess around with SEPTA's API along with learning how to use JSON and GTFS data. 
Not sure what I want to ultimately do with this project except build it up, play around with it, and see where it goes. 

Using the Leaflet JavaScript library for map functionality.

For the map itself, using Stadia Maps' Alidade Smooth Dark for the base layer map tiles overlaid with Open Railway Maps
to emphasize rai infrastructure.

![map](https://github.com/sauce-picante/transit-tracker/blob/dev/screenshots/map.png)

10/7/2022: Now includes an arrivals and departrues information board. Time shown on the board is the departure time of the corresponding train.
![map](https://github.com/sauce-picante/transit-tracker/blob/dev/screenshots/board.png)

SEPTA API documentation: http://www3.septa.org/

SEPTA API: http://www3.septa.org/api/

Leaflet: https://leafletjs.com/download.html

Open Railway Map: https://www.openrailwaymap.org/

Stadia Maps documentation: https://docs.stadiamaps.com/

gtfs-utils library: https://github.com/public-transport/gtfs-utils


## TO DO:


fix trolley icon flickering after selecting a new route

New Jersey Transit stuff (learn how to process GTFS data)
 
Visualize vehicle's directional heading

Display map markers by regional rail line

