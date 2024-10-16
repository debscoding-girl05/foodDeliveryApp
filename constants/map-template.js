const mapTemplate = (tomtomKey) => `
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
        center: [-121.913, 37.361],
        zoom: 15
      });
      
      map.on('dragend', function() {
        let center = map.getCenter();
        window.ReactNativeWebView.postMessage(center.lng.toFixed(3) + ", " + center.lat.toFixed(3));
      });
    </script>
  </div>
`;

// Use the key from environment variables
const mapHtmlContent = mapTemplate(
  process.env.EXPO_PUBLIC_TOMTOM_DEVELOPER_KEY
);

export default mapHtmlContent;
