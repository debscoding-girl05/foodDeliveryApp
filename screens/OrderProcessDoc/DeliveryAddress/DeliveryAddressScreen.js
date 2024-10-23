import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { MapView, Camera, LocationPuck } from "@rnmapbox/maps";
import * as Location from "expo-location"; // If using Expo
import Mapbox from "@rnmapbox/maps";
import { doc, setDoc, serverTimestamp, GeoPoint } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../firebaseConfig"; 
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Set your Mapbox access token
Mapbox.setAccessToken(
  "pk.eyJ1IjoiZGVic2kiLCJhIjoiY20ya2owcnBzMDJhYTJpcXlwdGljbWMydyJ9.z1zFBadNT9X2icFU-j0QLA"
);

export default function DeliveryAddressScreen() {
  const [location, setLocation] = useState(null);
  const [note, setNote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const auth = FIREBASE_AUTH; // Firebase Authentication (if needed)

  // Request location permission and get the user's current location
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "This app needs access to your location to show your position on the map.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation(); // Fetch location if permission granted
        } else {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to use this feature."
          );
        }
      } catch (err) {
        console.error("Error requesting location permission", err);
      }
    } else {
      getLocation(); // iOS location permission handled by Expo Location
    }
  };

  // Get user’s current location
  const getLocation = async () => {
    setLoading(true); // Start loading
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature."
        );
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords); // Set current location
    } catch (error) {
      console.error("Error getting location", error);
      Alert.alert("Error", "Failed to retrieve location.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Store location and note in Firestore
  const storeLocationAndNote = async () => {
    if (location) {
      try {
        const clientId = auth?.currentUser?.uid || "default-client-id"; // Use logged-in user UID if available
        const clientDocRef = doc(FIRESTORE_DB, "locations", clientId);
        await setDoc(
          clientDocRef,
          {
            clientLocation: new GeoPoint(location.latitude, location.longitude),
            note: note,
            timestamp: serverTimestamp(),
          },
          { merge: true }
        );
        console.log("Location and note stored successfully");
        Alert.alert("Success", "Location and note stored for delivery.");
      } catch (error) {
        console.error("Error storing location and note:", error);
        Alert.alert("Error", "Failed to store location and note.");
      }
    } else {
      Alert.alert("Error", "Location not found.");
    }
  };

  // Fetch location on component mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}>
        {location && (
          <Camera
            followUserLocation
            followZoomLevel={18}
            centerCoordinate={[location.longitude, location.latitude]}
          />
        )}
        <LocationPuck
          puckBearingEnabled
          puckBearing="heading"
          pulsing={{ isEnabled: true }}
        />
      </MapView>

      {/* Button to open the modal */}
      <View>
        <TouchableOpacity
          style={styles.noteButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="note-plus-outline"
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <View style={styles.textNote}>
          <Text style={styles.buttonText}>Ajouter une info</Text>
        </View>
      </View>
      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFC107" />
        </View>
      )}

      {/* Modal for entering note */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Entrez une direction additionnelle
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Entrez instructions..."
              value={note}
              onChangeText={setNote}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  storeLocationAndNote(); // Save note and location to Firestore
                  setModalVisible(false); // Close modal after saving
                }}
              >
                <Text style={styles.modalbuttonText}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: "red", borderColor: "red" },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalbuttonText, { color: "white" }]}>
                  Annuler
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  noteButton: {
    position: "absolute",
    bottom: 30,
    right: 25,
    backgroundColor: "#FFC107",
    padding: 15,
    borderRadius: 30,
  },
  textNote: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "400",
  },
  modalbuttonText: {
    color: "white",
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    paddingTop: 10,
    height: 110,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalButton: {
    backgroundColor: "#FFC107",
    padding: 5,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    borderColor: "#FFC107",
    borderWidth: 2,
    color: "black",
  },
});
