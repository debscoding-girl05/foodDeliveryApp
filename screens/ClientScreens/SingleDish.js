import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View,Image, Button, Alert } from 'react-native'
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import useCartStore from '../../store/CartStore';
import useFavoriteStore from '../../store/FavoriteStore';

function SingleDish({route, navigation}) {
    const {dish} = route.params;
    const [quantity, setQuantity]=useState(1);
    const totalPrice = dish.price * quantity;
    const {favorites, toggleFavorite} = useFavoriteStore();
     const addToCart = useCartStore((state) => state.addToCart);



    const handleAddToCart = () => {
      addToCart(dish, quantity); // Add dish and quantity to cart
        Alert.alert('Added')
    };
   
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dishcontainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Feather
              name="chevron-left"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Fontisto
            name="shopping-bag"
            size={22}
            color="#FFC107"
            onPress={() => navigation.navigate("cartScreen")}
          />
        </View>

        <View>
          <View
            style={{
              width: "97%",
              backgroundColor: "#F0F0F033",
              borderRadius: 25,
              alignSelf: "center",
              height: 450,
              marginTop: -45,
              overflow: "hidden",
              height: 380,
              zIndex: 1,
            }}
          >
            <Image
              source={dish.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={()=> toggleFavorite(dish.id)}
              style={{
                marginTop: -315,
                zIndex: 2,
                marginLeft: "85%",
                backgroundColor: "white",
                borderRadius: 55,
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {favorites.includes(dish.id) ? (
                <Ionicons name="heart-sharp" size={30} color="red" />
              ) : (
                <Ionicons name="heart-outline" size={30} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#FFFF",
              marginTop: -15,
              height: "60%",
            }}
          >
            <View
              style={{
                elevation: 2,
                shadowColor: "#000",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 30,
                  marginLeft: 20,
                  marginRight: 15,
                }}
              >
                <Text style={styles.name}>{dish.name}</Text>
                <Text style={styles.price}>{dish.price} FCFA</Text>
              </View>
              <View style={{ marginLeft: 17, marginRight: 15, marginTop: -5 }}>
                <Text style={{ fontWeight: "600" }}>Description:</Text>
                <Text>
                  Un plat frais et savoureux composé de viande tendre et de
                  salade croquante, agrémenté d'une vinaigrette délicieuse.
                  Parfait pour un repas léger ou un déjeuner sur le pouce.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 25,
                  alignSelf: "center",
                  gap: 40,
                }}
              >
                <FontAwesome
                  name="minus-circle"
                  size={45}
                  color="#FFE083"
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                />
                <Text style={{ fontSize: 25, fontWeight: "600" }}>
                  {quantity}
                </Text>
                <FontAwesome
                  name="plus-circle"
                  size={45}
                  color="#FFE083"
                  onPress={() => setQuantity(quantity + 1)}
                />
              </View>
              <View style={{ marginTop: 2 }}>
                <Text style={styles.totalPrice}>Total: {totalPrice} FCFA</Text>
              </View>
            </View>
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-around",
              }}
            >
              
              <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Ajouter au Panier
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding:8
  },
  dishcontainer: {
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginRight: 35,
    marginLeft: 20,
    zIndex: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    marginTop: 60,
    objectFit: "cover",
    borderRadius: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 13,
    backgroundColor: "#FFE083",
    marginBottom: 20,
    borderRadius: 25,
    padding: 10,
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 20,
  },
  button: {
    margin: 2,
    backgroundColor: "#FFC107",
    padding: 10,
    borderRadius: 25,
    width: "100%",
    elevation: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
    shadowColor: "#000",
  },
});

export default SingleDish
