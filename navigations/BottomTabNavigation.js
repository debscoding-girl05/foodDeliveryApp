import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform } from 'react-native'
import {
  CartScreen,
  FavScreen,
  HomeScreen,
  ProfileScreen,
} from "../screens/ClientScreens";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from "@expo/vector-icons/Fontisto";


const Tab=createBottomTabNavigator();

const screenOptions={
       tabBarShowLabel:false,
       headerShown:false,
        tabBarVisible: true, 
        tabBarHideOnKeyboard: true, 
       tabBarActiveTintColor: '#FFC107',
       tabBarInactiveTintColor: 'black',
       tabBarStyle:{
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        elevation:0,
        height:Platform.OS === "ios" ? 90:60,
        backgroundColor:  '#ffff',
       }
}

const BottomTabNavigation =() =>{
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={26}
              color={focused ? "#FFC107" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Fav"
        component={FavScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name="favorite"
              size={26}
              color={focused ? "#FFC107" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="shopping-cart"
              size={23}
              color={focused ? "#FFC107" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle"
              size={36}
              color={focused ? "#FFC107" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigation