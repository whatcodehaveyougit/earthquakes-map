export function renderMap(map) {
  map.addSource('earthquakes', {
    type: 'geojson',
    data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson',
    generateId: true, // This ensures that all features have unique IDs
  });
}

export function addEarthquakesToMap(map) {
  map.addLayer({
    id: 'earthquakes-viz',
    type: 'circle',
    source: 'earthquakes',
    paint: {
      // The feature-state dependent circle-radius expression will render
      // the radius size according to its magnitude when
      // a feature's hover state is set to true
      'circle-radius': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        [
          'interpolate',
          ['linear'],
          ['get', 'mag'],
          1,
          8,
          1.5,
          10,
          2,
          12,
          2.5,
          14,
          3,
          16,
          3.5,
          18,
          4.5,
          20,
          6.5,
          22,
          8.5,
          24,
          10.5,
          26,
        ],
        5,
      ],
      'circle-stroke-color': '#000',
      'circle-stroke-width': 1,
      // The feature-state dependent circle-color expression will render
      // the color according to its magnitude when
      // a feature's hover state is set to true
      'circle-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        [
          'interpolate',
          ['linear'],
          ['get', 'mag'],
          1,
          '#fff7ec',
          1.5,
          '#fee8c8',
          2,
          '#fdd49e',
          2.5,
          '#fdbb84',
          3,
          '#fc8d59',
          3.5,
          '#ef6548',
          4.5,
          '#d7301f',
          6.5,
          '#b30000',
          8.5,
          '#7f0000',
          10.5,
          '#000',
        ],
        '#000',
      ],
    },
  });
}
let quakeID = null;

export function changeMapMarkerOnEvent(map, event) {
  // Target the span elements used in the sidebar
  const magDisplay = document.getElementById('mag');
  const locDisplay = document.getElementById('loc');
  const dateDisplay = document.getElementById('date');

  // Set constants equal to the current feature's magnitude, location, and time
  const quakeMagnitude = event.features[0].properties.mag;
  const quakeLocation = event.features[0].properties.place;
  const quakeDate = new Date(event.features[0].properties.time);
  map.flyTo({
    center: event.features[0].geometry.coordinates,
  });

  // Check whether features exist
  if (event.features.length === 0) return;
  // Display the magnitude, location, and time in the sidebar
  magDisplay.textContent = quakeMagnitude;
  locDisplay.textContent = quakeLocation;
  dateDisplay.textContent = quakeDate;

  // If quakeID for the hovered feature is not null,
  // use removeFeatureState to reset to the default behavior
  if (quakeID) {
    map.removeFeatureState({
      source: 'earthquakes',
      id: quakeID,
    });
  }

  quakeID = event.features[0].id;
  console.log('setting feature state');

  // When the mouse moves over the earthquakes-viz layer, update the
  // feature state for the feature under the mouse
  map.setFeatureState(
    {
      source: 'earthquakes',
      id: quakeID,
    },
    {
      hover: true,
    },
  );
}
