mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYXptIiwiYSI6ImNsMWprZGNubjFscGozbHFrcG41dDh5bmkifQ.oq4bHdIFMK-OUA4k1Ux3bQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tanazm/cl4bfmyn0006k15ozz1d667mx',
    zoom: 10.2,
    maxZoom: 17,
    minZoom: 10.25,
    center: [-73.96, 40.76]
  });

map.on("load", function () {
  map.addLayer(
    {
      id: "points",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/geo_sept20_starts.geojson",
      },
      paint: {
        "circle-radius": 3,
        "circle-color": "#e9b34e",
        "circle-stroke-color": "#b1adaa",
        "circle-stroke-width": .5,
        "circle-opacity": 0.8,
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'trip_count'],
          0,
          '#fdd0a2',
          3500,
          '#fdae6b',
          7000,
          '#fd8d3c',
          10500,
          '#f16913',
          14000,
          '#d94801'
          ],
      }, 
      minzoom: 3,
      },
    "waterway-label" // Here's where we tell Mapbox where to slot this new layer
  );
});

map.on("click", "points", function (e) {
  var stationName = e.features[0].properties.start_station_name;
  var tripCount = e.features[0].properties.trip_count.toLocaleString();
  stationName = stationName.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
      stationName + 
        "</h4>" +
        "<h3>" +
      tripCount + " trips started here." +
        "</h3>" +
        "<p>"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on("mouseenter", "points", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "points", function () {
  map.getCanvas().style.cursor = "";
});


