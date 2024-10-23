const mapTemplate = (tomtomKey, lat, lng) => `
  <div>
    <style>
      html, body {
        margin: 0;
      }
      #map {
        height: 100%;
        width: 100%;
      }
    </style>

    <div id='map' class='map'></div>

    <!-- load TomTom Maps Web SDK from CDN -->
    <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
    <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

    <script>
      // create the map
      tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
      let map = tt.map({
        key: '${tomtomKey}', // Dynamically injected key
        container: 'map',
        center: [${lng}, ${lat}], // Set the initial center to the user's location
        zoom: 15
      });

      // Add a marker for the user's current location
      const marker = new tt.Marker({ 
        draggable: false // Set to true if you want to allow dragging the marker
      }).setLngLat([${lng}, ${lat}]).addTo(map);
      
      // Update marker position on the map center change
      window.ReactNativeWebView.addEventListener('message', function(event) {
        const [lng, lat] = event.data.split(",").map(Number);
        marker.setLngLat([lng, lat]);
      });

      // Listen for dragend event to get the new center
      map.on('dragend', function() {
        let center = map.getCenter();
        window.ReactNativeWebView.postMessage(center.lng.toFixed(3) + ", " + center.lat.toFixed(3));
      });
    </script>
  </div>
`;

// Use the key from environment variables
const mapHtmlContent = mapTemplate(
  process.env.EXPO_PUBLIC_TOMTOM_DEVELOPER_KEY,
  11.5021, // Initial latitude, will be replaced dynamically
  3.848 // Initial longitude, will be replaced dynamically
);

export default mapHtmlContent;
