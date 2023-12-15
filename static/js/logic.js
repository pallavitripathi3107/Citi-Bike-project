
// data already given(
//let newYorkCoords = [40.73, -74.0059];
//let mapZoomLevel = 12;)

// load the geojson data
let url= "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

// Get the data with d3.
d3.json(url).then(function(data) {
  createMap(data);
});

// Create the createMap function.
function createMap(bikeStations) {

 // Create the tile layer that will be the background of our map.

 let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

// Create a baseMaps object to hold the lightmap layer.
let baseMaps = {
  "Street Map": street,
};

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    BikeStations: createMarkers(bikeStations)
  };

  // Creating the map object
  let myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [street]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
// Create the createMarkers function.
function createMarkers(response){

  // Pull the "stations" property from response.data.
   stations = response.data.stations

  // Initialize an array to hold the bike markers.
   let bikeMarkers = [];

  // Loop through the stations array.
   for (let x = 0; x < stations.length; x++){

   // For each station, create a marker, and bind a popup with the station's name.
   let station_marker = L.marker([stations[x].lat, stations[x].lon]).bindPopup("<strong>" + stations[x].name + "</strong><br /><br />" + "<strong>Capacity: " + stations[x].capacity + "</strong><br />");

   // Add the marker to the bikeMarkers array.
   bikeMarkers.push(station_marker);
    
   }  

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  return L.layerGroup(bikeMarkers);
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
