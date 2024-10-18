import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import StepIndicator from "@fcxlabs/react-native-step-indicator";
import TrackDeliveryMap from "../TrackDelivery/TrackDeliveryMap";
import OrderSummaryScreen from "../orderSummary/OrderSummaryScreen";
import PaymentMethodScreen from "../PaymentMethod/PaymentMethodScreen";
import DeliveryAddressScreen from "../DeliveryAddress/DeliveryAddressScreen";
import { CartScreen } from "../../ClientScreens";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const labels = ["Panier","Addresse", "Fiche Commande", "Paiement", "Livraison"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#FFC107",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#FFC107",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#FFC107",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#FFC107",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#FFC107",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#FFC107",
  stepCount:4
};

const OrderProcess = () => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const navigation= useNavigation();


  // Method to navigate to the next step
  const goToNextStep = () => {
    setCurrentPosition((prevPosition) =>
      Math.min(prevPosition + 1, labels.length - 1)
    );
  };

  // Method to navigate to the previous step
  const goToPreviousStep = () => {
    setCurrentPosition((prevPosition) => Math.max(prevPosition - 1, 1));
  };

  // Function to render the content based on the current step
  const renderStepContent = () => {
    switch (currentPosition) {
      case 0:
          return <CartScreen/>;
      case 1:
         return <DeliveryAddressScreen />;
      case 2:
       return <OrderSummaryScreen />;
      case 3:
          return <PaymentMethodScreen />;
    case 4:
         return <TrackDeliveryMap />;
      default:
        return <DeliveryAddressScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        style={{ marginTop: 10 }}
      />

      {/* Render the step content dynamically */}
      {renderStepContent()}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20, // Add some margin at the top for spacing
          paddingHorizontal: 20, // Add horizontal padding
        }}
      >
        {currentPosition === 1 && (
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={{ color: "#FFC107", fontSize: 16 }}>Annuler</Text>
          </TouchableOpacity>
        )}
        {currentPosition > 1 && (
          <TouchableOpacity style={styles.button1} onPress={goToPreviousStep}>
            <Text style={{ color: "#FFC107", fontSize: 16 }}>Retour</Text>
          </TouchableOpacity>
        )}

        {currentPosition < labels.length - 2 && (
          <TouchableOpacity style={styles.button} onPress={goToNextStep}>
            <Text style={{ color: "white", fontSize: 16 }}>Suivant</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


export default OrderProcess;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFC107",
    borderRadius: 25,
    padding: 10, // Add padding for better touch area
    flex: 1, // Use flex to ensure even spacing
    alignItems: "center", // Center the text horizontally
    marginRight: 10, // Add margin for spacing
    marginBottom: 20,
  },
  button1: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10, // Add padding for better touch area
    flex: 1, // Use flex to ensure even spacing
    alignItems: "center", // Center the text horizontally
    marginRight: 10, // Add margin for spacing
    marginBottom: 20,
    borderColor: "#FFC107",
    borderWidth:2
  },
});
