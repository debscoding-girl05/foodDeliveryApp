import * as React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import HeaderCart from "../../../components/HeaderCart";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 3 }}>
      <View>
        <HeaderCart />
        <View
          style={{
            height: 200,
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/sky.jpg")}
            style={{
              height: 150,
              width: 150,
              borderRadius: 80,
              marginBottom: 12,
              alignSelf: "center",
              zIndex: -1,
            }}
          />
          <View>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => navigation.navigate("ModalEdit")}
            >
              <Feather name="edit" size={26} color="#ddd" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
              textAlign: "center",
            }}
          >
            UserName
          </Text>
          <Text
            style={{ fontSize: 16, color: "lightgray", textAlign: "center" }}
          >
            dtakouessa@gmail.com
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.headText}>Informations Personnels</Text>
          <View style={styles.personalInfo}>
            <View style={styles.info}>
              <Text style={styles.firsText}>Nom :</Text>
              <View style={styles.secondTextStyle}>
                <Text style={styles.secondText}>Username</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.firsText}>Prenom :</Text>
              <View style={styles.secondTextStyle}>
                <Text style={styles.secondText}>Username</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.firsText}>Email :</Text>
              <View style={styles.secondTextStyle}>
                <Text style={styles.secondText}>Username</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.firsText}>N° Telephone :</Text>
              <View style={styles.secondTextStyle}>
                <Text style={styles.secondText}>Username</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.firsText}>Mot de Passe :</Text>
              <View style={styles.secondTextStyle}>
                <Text style={styles.secondText}>Username</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
  },
  editIcon: {
    zIndex: 2,
    alignItems: "center",
    marginTop: -38,
    marginLeft: 65,
  },
  infoContainer: {
    marginTop: 30,
    width: "100%",
    elevation: 1,
    shadowColor: "#ccc",
    marginHorizontal:10
  },
  info: {
    flexDirection: "column",
    paddingVertical: 8,
    gap: 10,
    marginHorizontal:4,
    marginLeft:6
  },
  firsText: {
    fontSize: 15,
    fontWeight: "500",
  },
  secondText: {
    fontSize: 14,
    fontWeight: "300",
    marginLeft: 10,
    marginTop: 2,
  },
  secondTextStyle: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
    height: 30,
    marginTop: -4,
    width:'90%'
  },
  headText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#FFC107",
    textAlign:'center'
  },
});
