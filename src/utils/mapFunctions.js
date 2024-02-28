export function renderMap(map, earthquakeData) {
  map.addSource('earthquakes', {
    type: 'geojson',
    data: earthquakeData,
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

export function updateMapMarkerToSelectedEarthquake(map, clickedOnEarthquake, index) {
  // console.log(clickedOnEarthquake);
  // Target the span elements used in the sidebar
  const magDisplay = document.getElementById('mag');
  const locDisplay = document.getElementById('loc');
  const dateDisplay = document.getElementById('date');

  // Set constants equal to the current feature's magnitude, location, and time
  const quakeMagnitude = clickedOnEarthquake.properties.mag;
  const quakeLocation = clickedOnEarthquake.properties.place;
  const quakeDate = new Date(clickedOnEarthquake.properties.time);
  map.flyTo({
    center: clickedOnEarthquake.geometry.coordinates,
  });

  // Check whether features exist
  if (clickedOnEarthquake.properties.mag) {
    // Display the magnitude, location, and time in the sidebar
    magDisplay.textContent = quakeMagnitude;
    locDisplay.textContent = quakeLocation;
    dateDisplay.textContent = quakeDate;
    // If quakeID for the hovered feature is not null,
    // use removeFeatureState to reset to the default behavior
    if (quakeID !== null) {
      map.removeFeatureState({
        source: 'earthquakes',
        id: quakeID,
      });
    }
    quakeID = index;

    // const selectedEarthquake = clickedOnEarthquake.properties;
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
}

export function highlightSelectedEarthquakeOnList(code) {
  const selectedEarthquakeListItem = document.getElementById(code);
  const earthquakesListItems = document.getElementsByClassName(
    'earthquake-list-item',
  );
  [...earthquakesListItems].forEach((earthquakeListItem) => {
    // NEED TO FIX THIS
    // eslint-disable-next-line no-param-reassign
    earthquakeListItem.classList = 'earthquake-list-item';
    if (selectedEarthquakeListItem.id === earthquakeListItem.id) {
      selectedEarthquakeListItem.classList.add('highlight');
    }
  });
}

export function findIndexOfEarthquake(earthquakes, selectedEarthquake) {
  let res;
  for (let i = 0; i < earthquakes.features.length; i += 1) {
    if (earthquakes.features[i].id === selectedEarthquake.id) {
      res = i;
      break;
    }
  }
  return res;
}
