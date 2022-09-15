# septa-map
Interactive map mostly just to mess around with SEPTA's API. 

Using the Leaflet JavaScript library for map functionality with Open Railway Map's tile layers to emphasize rail infrastructure.

SEPTA API documentation: http://www3.septa.org/

SEPTA API: http://www3.septa.org/api/

Leaflet: https://leafletjs.com/download.html

Open Railway Map: https://www.openrailwaymap.org/


/**
 *  Phase 1:
 *  >   1. figure out successful api call - DONE
 *  >   2. Retrieve data - DONE
 *        a. ISSUE: ajax call not executing on button click
 *          i. FIX: event.preventDefault()
 *  >   3. Display Data 
 *  >     a. Regional rail train locations -DONE
 *  >     b. Regional rail stations - DONE
 *  >     c. Trolley locations
 *  >     d. Trolley stops
 *  >     e. station arrivals
 *  Phase 2:
 *  >     1. Live location updates - DONE
 *  >         a. still janky - train icons flash rapidly after a few request cycles
 *  >     2. Visualize vehicle heading
 *  >     3. 
 */
