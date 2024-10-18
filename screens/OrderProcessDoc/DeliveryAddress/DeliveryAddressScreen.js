import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import mapTemplate from "../../../constants/map-template";
import axios from "axios";
import { Suggestions } from "../../../constants/Suggestions";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DeliveryAddressScreen() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState("11.5021, 3.8480");
  const tomtomKey = process.env.EXPO_PUBLIC_TOMTOM_DEVELOPER_KEY;
  let [placeholder, setPlaceholder] = useState("Recherche ex: Bastos");
  let [showList, setShowList] = useState(false);
  let [suggestionListData, setSuggestionListData] = useState([]);

  const run = `
  document.body.style.backgroundColor = 'blue';
  true;
  `;

  const onButtonClick = () => {
    const [lng, lat] = mapCenter.split(",");
    webRef.injectJavaScript(
      `map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])`
    );
  };

  const onPressItem = (item) => {
    setPlaceholder(item.address);
    setMapCenter(`${item.lat}, ${item.lon}`);
    setShowList(false);
    webRef.injectJavaScript(`map.setCenter([${parseFloat(item.lon)}, 
      ${parseFloat(item.lat)}])`);
  };

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
  };

  const handleSearchTextChange = (changedSearchText) => {
    if (!changedSearchText || changedSearchText.length < 5) return;

    let baseUrl = `https://api.tomtom.com/search/2/search/${changedSearchText}.json?`;
    let searchUrl = baseUrl + `key=${tomtomKey}`;

    if (location) {
      searchUrl = searchUrl + `&lon=${location.coords.longitude}`;
      searchUrl = searchUrl + `&lat=${location.coords.latitude}`;
    }

    axios
      .get(searchUrl)
      .then((response) => {
        let addresses = response.data.results.map((v) => {
          let parts = v.address.freeformAddress.split(",");
          return {
            p1: parts.length > 0 ? parts[0] : null,
            p2: parts.length > 1 ? parts[1] : null,
            p3: parts.length > 2 ? parts[2] : null,
            address: v.address.freeformAddress,
            lat: v.position.lat,
            lon: v.position.lon,
          };
        });

        setSuggestionListData(addresses);
        setShowList(true);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TextInput
          style={styles.textInput}
          onChangeText={setMapCenter}
          value={mapCenter}
        ></TextInput>

        <TouchableOpacity onPress={onButtonClick} style={styles.button}>
          <Text style={{ textAlign: "center", fontSize: 18, color: "white", fontWeight:'500',marginTop:2 }}>
            Centrer
          </Text>
        </TouchableOpacity>
      </View>

      <Suggestions
        placeholder={placeholder}
        showList={showList}
        suggestionListData={suggestionListData}
        onPressItem={onPressItem}
        handleSearchTextChange={handleSearchTextChange}
      ></Suggestions>

      <WebView
        ref={(r) => (webRef = r)}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={["*"]}
        source={{ html: mapTemplate }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  buttons: {
    flexDirection:'row',
    marginTop: 8,
    marginBottom: 2,
    borderRadius:25,
    marginLeft:20,
    gap:10

 
  },
  textInput: {
    height: 40,
    width: "60%",
    marginRight: 12,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius:10
  },
  map: {
    transform: [{ scale: 3 }],
    width: "100%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    backgroundColor:"#FFC107",
    borderRadius:5,
    width:75,
    height:38,
   marginRight:20,
   color:'white'

  }
});