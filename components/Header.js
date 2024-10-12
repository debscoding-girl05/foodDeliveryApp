import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity,} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Fontisto from "@expo/vector-icons/Fontisto";
import { useNavigation } from '@react-navigation/native';

const Header =({title, onPress})=>{
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            styles={styles.iconContainer}
          >
            <Entypo name="menu" size={30} color="white" />
          </TouchableOpacity>

          <Text
            style={{
              marginLeft: 10,
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("cartScreen")}
          styles={{ marginRight:45 }}
        >
          <Fontisto name="shopping-bag" size={22} color="white" />
        </TouchableOpacity>
      </View>
    );
}
export default Header

const styles=StyleSheet.create({
   container:{
       flexDirection:"row",
       alignItems:"center",
       justifyContent:"space-between",
       marginTop:20,
       marginHorizontal:20
   },
   iconContainer:{
    height:45,
    width:45,
    borderRadius:999,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"gray"
   },
   
});