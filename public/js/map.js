mapboxgl.accessToken =
  'pk.eyJ1IjoiYWJyYXhhc3dpc3oiLCJhIjoiY2s0eDNhd2syMDBvejNrbXhkMHI3ZzZlNyJ9.AW-5sg5hbu2yLU0HJva9EQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 4,
  center: [20, 53]
});

// fetch stores from api
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();
  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: store.location.coordinates
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });
  loadMap(stores);
  return stores;
}

function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();
