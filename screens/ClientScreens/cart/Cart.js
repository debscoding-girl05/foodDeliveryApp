import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import useCartStore from "../../../store/CartStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { dishes } from "../../../data/dishesData";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import HeaderNotif from "../../../components/HeaderNotif";

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart, increaseQty, decreaseQty } =
    useCartStore();
  const navigation = useNavigation();

  // Get the dishes that are in the cart based on their IDs
  const cartDishes = dishes.filter((dish) =>
    cartItems.some((item) => item.id === dish.id)
  );

  // Calculate total price
  const totalPrice = cartDishes.reduce((total, dish) => {
    const cartItem = cartItems.find((item) => item.id === dish.id);
    return cartItem ? total + cartItem.quantity * dish.price : total;
  }, 0);

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: "#dd2150",
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          borderRadius: 15,
          padding:25,
        }}
      >
        <FontAwesome6 name="trash" size={28} color="white" />
      </View>
    );
  };
  const swipeFromRightOpen = (item) => {
    removeFromCart(item.id);
    Alert.alert("Deleted", `Vous avez effacer: ${item.name}`);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
       <HeaderNotif title="Mon Panier"/>

      {cartDishes.length > 0 ? (
        <ScrollView>
          {cartDishes.map((dish) => {
            const cartItem = cartItems.find((item) => item.id === dish.id);
            return (
              <Swipeable
                key={dish.id}
                renderRightActions={rightSwipeActions}
                onSwipeableOpen={() => swipeFromRightOpen(dish)}
              >
                <View key={dish.id} style={styles.itemContainer}>
                  <View style={styles.imageContainer}>
                    <Image source={dish.image} style={styles.image} />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignSelf: "flex-start",
                      width: "50%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginLeft: -20,
                        marginTop: 2,
                      }}
                    >
                      {dish.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "medium",
                        marginLeft: -20,
                      }}
                    >
                      {dish.price} FCFA
                    </Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => increaseQty(dish.id)}>
                      <Entypo
                        name="circle-with-plus"
                        size={24}
                        color="gray"
                        style={{ marginBottom: 10 }}
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>
                      {cartItem?.quantity || 0}
                    </Text>
                    <TouchableOpacity onPress={() => decreaseQty(dish.id)}>
                      <Entypo
                        name="circle-with-minus"
                        size={24}
                        color="gray"
                        style={{ marginTop: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Swipeable>
            );
          })}

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total : {totalPrice} FCFA</Text>

            <View style={{ flexDirection: "column", gap: 15 }}>
              <TouchableOpacity style={styles.button1} onPress={clearCart}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Tout Effacer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("OrderProcess")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Commander
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.emptyText}>Panier Vide.</Text>
      )}
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#E0E0E0",
    shadowColor: "#000",
    marginTop: 10,
    borderRadius: 22,
    paddingHorizontal: 5,
    paddingVertical:10
  },
  quantityContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 2,
    marginRight: 10,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 17,
    backgroundColor: "#FFE083",
    borderRadius: 8,
    width: 22,
    textAlign: "center",
    height: 24,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  imageContainer: {
    width: 150,
    height: 90,
    marginLeft: -30,
    borderRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  button: {
    borderRadius: 15,
    backgroundColor: "#FFC107",
    elevation: 3,
    padding: 6,
  },
  button1: {
    borderRadius: 15,
    backgroundColor: "gray",
    elevation: 3,
    padding: 6,
  },
});
