import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import useCartStore from "../../../store/CartStore";
import { useNavigation } from "@react-navigation/native";

export default function OrderSummaryScreen() {
  const { cartItems } = useCartStore();
  const navigation = useNavigation();

  // Assuming a fixed delivery fee; adjust as needed
  const deliveryFee = 1000;

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // Total price calculation
  const totalPrice = subtotal + deliveryFee;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.orderDetails}>
          <Text style={styles.headerText}>Details de la Commande</Text>
          {/* List of Ordered Items */}
          {cartItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishQuantity}>
                  Quantité: {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                {item.price * item.quantity} FCFA
              </Text>
            </View>
          ))}

          {/* Price Summary */}
          <View style={styles.priceDetails}>
            <View style={styles.priceTags}>
              <Text style={styles.subtotal}>SousTotal:</Text>
              <Text style={styles.itemTotal}>{subtotal} FCFA</Text>
            </View>
            <View style={styles.priceTags}>
              <Text style={styles.deliveryFee}>Frais de Livraison</Text>
              <Text style={styles.itemTotal}>{deliveryFee} FCFA </Text>
            </View>

            <View style={styles.priceTags}>
              <Text style={styles.totalAmount}>Total</Text>
              <Text style={styles.totalAmount}>{totalPrice} FCFA</Text>
            </View>
          </View>
        </View>
        <View style={styles.clientDetails}>
          <Text style={styles.headerText}>Addresse de Livraison</Text>
          <View style={styles.infoTags}>
            <Text style={styles.firstinfo}>Nom :</Text>
            <Text style={styles.secondinfo1}>Martin Matin</Text>
          </View>
          <View style={styles.infoTags}>
            <Text style={styles.firstinfo}>Adresse :</Text>
            <Text style={styles.secondinfo2}>Rue 6.088 Yaoundé</Text>
          </View>
          <View style={styles.infoTags}>
            <Text style={styles.firstinfo}>Tel :</Text>
            <Text style={styles.secondinfo3}>699751718</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F2F2F2",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 5,
  },
  orderDetails: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  details: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dishName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dishQuantity: {
    fontSize: 14,
    color: "#555",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceDetails: {
    marginVertical: 10,
    paddingHorizontal: 6,
  },
  subtotal: {
    fontSize: 16,
  },
  deliveryFee: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceTags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  clientDetails: {
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 1,
    paddingBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  infoTags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 30,
    marginLeft: 10,
  },
  firstinfo: {
    fontSize: 16,
  },
  secondinfo2: {
    fontSize: 16,
    fontWeight: "500",
  },
  secondinfo1: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 25,
  },
  secondinfo3: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 40,
  },
});
