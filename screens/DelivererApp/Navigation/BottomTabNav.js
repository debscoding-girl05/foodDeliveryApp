import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform, Text } from 'react-native'
import DelivProfile from '../screens/Profile';
import DetailCommandScreen from '../screens/DetailCommandScreen';
import CommandScreen from '../screens/CommandScreen';
import DeliveryMap from '../screens/DeliveryMap';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


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

const DelivererBottomTabNavigation =() =>{
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="CommandScreen"
        component={CommandScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome6 
              name="clipboard-list"
              size={26}
              color={focused ? "#FFC107" : "black"}
            />
          
          ),
        }}
      />
      <Tab.Screen
        name="DeliveryMap"
        component={DeliveryMap}
        options={{
          tabBarIcon: ({ focused }) => (
               <FontAwesome6
              name="map-location-dot"
              size={26}
              color={focused ? "#FFC107" : "black"}
            />
          ),
        }}
      />
     
      <Tab.Screen
        name="DelivProfile"
        component={DelivProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons 
              name="face-man-profile" 
              size={26}
              color={focused ? "#FFC107" : "black"}
            />
            
          
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
export default DelivererBottomTabNavigation