import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import useCartStore from "../../../store/CartStore";
import useCommandStore from "../../../store/CommandStore";
import { useNavigation } from "@react-navigation/native";

export default function PaymentMethodScreen() {
  const {cartItems, clearCart} = useCartStore();
  const {PlusCommand} = useCommandStore();
  const navigation = useNavigation();

  const handlePayment  = ()=>{
     const deliveryFee = 1000;
     const subtotal = cartItems.reduce(
       (acc, item) => acc + item.price * item.quantity,0);
     const totalPrice = subtotal + deliveryFee;

     //order Object 
     const order = {
       id: Date.now(),
       items: cartItems,
       total: totalPrice,
       customer: {
         name: "Martin Matin", // Replace with dynamic values
         address: "Rue 6.088 Yaoundé",
         phone: "699751718",
       },
       status: "pending",
     };

     PlusCommand(order);
     console.log(order)

     clearCart();

     navigation.navigate("TrackDeliveryScreen", {orderId: order.id});
  };


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 10 }}>
        Choisissez Votre Moyen de Paiement
      </Text>

      <View style={styles.payContainer}>
        {/* Payment Options Logos */}
        <View style={styles.logoContainer}>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/images/orangeMoney.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/images/PayPal_logo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/images/mobilemoney.png")}
              style={styles.image2}
            />
          </TouchableOpacity>
        </View>

        {/* Card Details Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de Carte</Text>
            <TextInput
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom sur la Carte</Text>
            <TextInput placeholder="Martin Matin" style={styles.input} />
          </View>

          <View style={styles.row}>
            <View style={styles.halfInputGroup}>
              <Text style={styles.label}>Date d'Expiration</Text>
              <TextInput
                placeholder="MM/YY"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={styles.halfInputGroup}>
              <Text style={styles.label}>Code de Sécurité (CVV)</Text>
              <TextInput
                placeholder="123"
                keyboardType="numeric"
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Payer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    height: 60,
    width: 110,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: -12,
  },
  image2: {
    height: 50,
    width: 110,
    marginTop: 2,
  },
  form: {
    marginTop: 15,
    paddingVertical: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: -2,
  },
  halfInputGroup: {
    paddingHorizontal: 5,
    marginTop: 10,
  },
  payContainer: {
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ffff",
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 35,
    height: "75%",
    shadowColor: "black",
    width: "100%",
  },
  payButton: {
    marginTop: 20,
    backgroundColor: "#FFC107",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  payButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
