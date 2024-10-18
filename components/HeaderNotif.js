import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HeaderNotif = ({ title, onPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row",gap:80}}>
        <TouchableOpacity styles={styles.iconContainer}>
          <Feather
            name="chevron-left"
            size={26}
            color="#FFC107"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            textAlign:'center'
          }}
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("cartScreen")}
        styles={{ marginRight: 45 }}
      >
        <Ionicons name="notifications" size={26} color="#FFC107" />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderNotif;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom:18
  },
  iconContainer: {
    height: 65,
    width: 45,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",

  },
});
