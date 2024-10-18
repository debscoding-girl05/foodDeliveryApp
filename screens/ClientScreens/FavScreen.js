import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import useFavoriteStore from "../../store/FavoriteStore";
import { dishes } from "../../data/dishesData";
import HeaderNotif from "../../components/HeaderNotif";
import AntDesign from "@expo/vector-icons/AntDesign";

function FavScreen({ navigation }) {
  // Destructure the required methods and state from the favorite store
  const { favorites, deleteFavorite, clearFavorite } = useFavoriteStore();

  // Correct filter logic to find favorite dishes
  const favDishes = dishes.filter((dish) => favorites.includes(dish.id));

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <HeaderNotif title="Mes Favoris" />

        {favDishes.length > 0 ? (
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginTop: 27,
                paddingBottom: 20,
              }}
            >
              {favDishes.map((dish) => {
                return (
                  <View style={styles.dishStyle} key={dish.id}>
                    <TouchableOpacity
                      onPress={() => navigation.push("singleDish", { dish })}
                    >
                      <View>
                        <TouchableOpacity
                          onPress={() => deleteFavorite(dish.id)}
                          style={{
                            zIndex: 10,
                            marginBottom: -45,
                            height: 22,
                            width: 32,
                            borderRadius: 55,
                            alignContent: "center",
                            justifyContent: "center",
                            alignSelf: "flex-end",
                            marginRight: -2,
                          }}
                        >
                          <AntDesign
                            name="closecircle"
                            size={21}
                            color="#FFC107"
                          />
                        </TouchableOpacity>
                      </View>
                      <Image
                        source={dish.image}
                        style={{
                          width: 165,
                          height: 165,
                          borderRadius: 20,
                          marginTop: -10,
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "column",
                        gap: 10,
                        marginTop: 14,
                        alignSelf: "center",
                        marginBottom: 20,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.push("singleDish", { dish })}
                        style={{
                          flexDirection: "column",
                          paddingVertical: -5,
                          marginBottom: -15,
                        }}
                      >
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>
                          {dish.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#D1170B",
                            textAlign: "center",
                            fontWeight: "400",
                          }}
                        >
                          {dish.price} FCFA
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity
              onPress={clearFavorite}
              style={{ marginTop: 10, right:28 }}
            >
              <Text
                style={{
                  color: "crimson",
                  textAlign: "right",
                  fontWeight: "300",
                }}
              >
                Tout Supprimer
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <Text style={styles.emptyText}>Pas de Favoris.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default FavScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingBottom: 5,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 15,
    marginTop:50
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  dishStyle: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    borderRadius: 20,
    paddingVertical: 10,
    zIndex:-1
  },
});
