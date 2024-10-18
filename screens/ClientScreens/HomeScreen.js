import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { SearchBar } from "@rneui/themed";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { dishes } from "../../data/dishesData";
import useFavoriteStore from "../../store/FavoriteStore";


function HomeScreen() {
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const {favorites, toggleFavorite} = useFavoriteStore();


  const handlePress = (buttonName) => {
    setSelectedButton(buttonName);
  };

    

 
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#FFC107", paddingVertical: 10 }}>
        <View style={styles.headerContainer}>
          <Header title="Accueil" />
        </View>

        <View style={styles.searchContainer}>
          <SearchBar
            platform="android"
            onChangeText={(newVal) => setValue(newVal)}
            placeholder="Entrez le Plat..."
            placeholderTextColor="#888"
            round
            showCancel
            showLoading
            value={value}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.inputContainer}
          />
        </View>
      </View>
      <View
        style={{
          borderRadius: 45,
          marginTop: -20,
          zIndex: 100,
          backgroundColor: "white",
          marginLeft: 1,
          marginRight: 1,
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginLeft: 20,
                marginRight: 20,
                marginTop: 25,
              }}
            >
              {["tout", "poulet", "Poisson", "Viande"].map((category) => (
                <Pressable
                  key={category}
                  onPress={() => handlePress(category)}
                  style={[
                    styles.button,
                    selectedButton === category && styles.selectedButton,
                  ]}
                >
                  <Text>{category.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginTop: 18,
              }}
            >
              {dishes.map((dish) => (
                <View style={styles.dishStyle} key={dish.id}>
                  <TouchableOpacity
                    onPress={() => navigation.push("singleDish", { dish })}
                  >
                    <View>
                      <TouchableOpacity
                        onPress={() => toggleFavorite(dish.id)}
                        style={{
                          zIndex: 10,
                          marginBottom: -35,
                          backgroundColor: "white",
                          height: 33,
                          width: 32,
                          borderRadius: 55,
                          alignContent: "center",
                          justifyContent: "center",
                          alignSelf: "flex-end",
                          marginRight: 5,
                        }}
                      >
                        {favorites.includes(dish.id) ? (
                          <Ionicons name="heart-sharp" size={30} color="red" />
                        ) : (
                          <Ionicons
                            name="heart-outline"
                            size={30}
                            color="red"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={dish.image}
                      style={{
                        width: 165,
                        height: 165,
                        borderRadius: 20,
                        marginTop: -2,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 10,
                      marginTop: 14,
                      alignSelf: "center",
                      marginBottom: 12,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.push("singleDish", { dish })}
                      style={{ flexDirection: "column" }}
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
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    backgroundColor: "#FFC107",
    paddingBottom: 5,
  },
  searchContainer: {
    alignItems: "center", // Center horizontally
    marginTop: 25,
    marginBottom: 55,
  },
  searchBarContainer: {
    borderRadius: 35,
    width: "90%",
    height: 60,
    alignContent: "center",
  },
  inputContainer: {
    borderRadius: 15,
  },
  button: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
  },
  selectedButton: {
    backgroundColor: "#FFC107",
    color: "white",
  },
  scrollContainer: {
    height: "inherited",
    flexGrow: 1,
    paddingBottom: 380,
  },
  dishStyle: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 20,
    paddingVertical:2,
    zIndex:-1
  },
});

export default HomeScreen;
