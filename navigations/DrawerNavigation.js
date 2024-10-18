import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Faqs, ProfileScreen, SettingsScreen,Help,LogOut,HistoryCommands, HomeScreen, } from '../screens/ClientScreens';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTabNavigation from './BottomTabNavigation';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from "@react-navigation/native";
import LoginScreen from '../screens/GlobalScreens/LoginScreen';
import DelivererBottomTabNavigation from '../screens/DelivererApp/Navigation/BottomTabNav';


const Drawer= createDrawerNavigator();


const DrawerNavigation = ()=> {
    const navigation= useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
              style={{
                marginTop: 25,
                marginLeft: 10,
                marginBottom: -5,
              }}
            >
              <Entypo name="chevron-left" size={26} color="black" />
            </TouchableOpacity>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Image
                source={require("../assets/images/sky.jpg")}
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 80,
                  marginBottom: 12,
                  alignSelf: "center",
                }}
              />
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
                style={{
                  fontSize: 16,
                  color: "black",
                  textAlign: "center",
                  fontWeight: "300",
                  marginBottom: 10,
                }}
              >
                address@gmail.com
              </Text>
            </View>
            {/* Drawer items */}
            <View>
              <DrawerItemList {...props} />
            </View>

            {/* Bottom image section */}
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <Image
                source={require("../assets/images/ellipse.png")} // Replace with your ellipse image path
                style={{
                  height: 180,
                  width: "80%",
                  marginLeft: -10,
                  marginTop: -15,
                }}
              />
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#FFC107",
          width: "100%",
        },
        headerStyle: {
          backgroundColor: "#fff",
          
        },
        headerShown: false,
        headerTintColor: "black",
        drawerLabelStyle: {
          color: "black",
          fontSize: 16,
          marginLeft: -10,
          fontFamily: "Roboto",
          fontWeight: "200",
        },
        drawerActiveTintColor: "black", // Active item color
      }}
    >
      <Drawer.Screen
        name="Acpoint"
        options={{
          drawerLabel: "Accueil",
          title: "Accueil",
          headerShadowVisible: false,
          drawerIcon: () => <Ionicons name="home" size={24} color={"black"} />,
        }}
        component={BottomTabNavigation}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "Mon Profil",
          title: "Profil",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="person-circle" size={27} color={"black"} />
          ),
        }}
        component={ProfileScreen}
      />

      <Drawer.Screen
        name="commandHistory"
        options={{
          drawerLabel: "Historiques Commandes",
          title: "Historiques Commandes",
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5 name="history" size={24} color="black" />
          ),
        }}
        component={DelivererBottomTabNavigation}
      />

      <Drawer.Screen
        name="Settings"
        options={{
          drawerLabel: "Paramètres",
          title: "Paramètres",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="settings-sharp" size={24} color="black" />
          ),
        }}
        component={SettingsScreen}
      />

      <Drawer.Screen
        name="faqs"
        options={{
          drawerLabel: "FAQ",
          title: "FAQ",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="frequently-asked-questions"
              size={24}
              color="black"
            />
          ),
        }}
        component={Faqs}
      />

      <Drawer.Screen
        name="Help"
        options={{
          drawerLabel: "Aide",
          title: "Aide",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcons name="help-outline" size={24} color="black" />
          ),
        }}
        component={Help}
      />

      <Drawer.Screen
        name="LoginScreen"
        options={{
          drawerLabel: "Se Connecter",
          title: "Se Connecter",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcons name="logout" size={24} color="black" />
          ),
        }}
        component={LoginScreen}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation
