import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react';
import DrawerNavigation from './DrawerNavigation';
import SingleDish from '../screens/ClientScreens/SingleDish';
import OrderProcess from '../screens/OrderProcessDoc/orderProcess/OrderProcess';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ModalScreen from '../screens/ClientScreens/Profile/ModalScreen';
import TrackDeliveryMap from '../screens/OrderProcessDoc/TrackDelivery/TrackDeliveryMap';
import LoginScreen from '../screens/GlobalScreens/LoginScreen'
import { CartScreen, FavScreen} from '../screens/ClientScreens';
import SignupScreen from '../screens/GlobalScreens/SignupScreen';
import DelivererBottomTabNavigation from '../screens/DelivererApp/Navigation/BottomTabNav';
import DetailCommandScreen from '../screens/DelivererApp/screens/DetailCommandScreen';
import ModalDeliv from '../screens/DelivererApp/screens/ModalDeliv';

const stack=createNativeStackNavigator();


const AppNavigation=()=>{
    return (
      <GestureHandlerRootView
        style={{
          marginTop: 30,
          flex: 1,
          position: "static",
          marginBottom: -10,
        }}
      >
        <NavigationContainer>
          <stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Main"
          >
            <stack.Group>
              <stack.Screen name="Main" component={DrawerNavigation} />
              <stack.Screen name="Signup" component={SignupScreen} />
              <stack.Screen name="Login" component={LoginScreen} />
              <stack.Screen name="singleDish" component={SingleDish} />
              <stack.Screen name="cartScreen" component={CartScreen} />
              <stack.Screen name="FavScreen" component={FavScreen} />
              <stack.Screen name="OrderProcess" component={OrderProcess} />
              <stack.Screen name="TrackDeliveryScreen" component={TrackDeliveryMap} />
              <stack.Screen name="Deliverer" component={DelivererBottomTabNavigation} />
              <stack.Screen name="DetailsCommand" component={DetailCommandScreen} />
            </stack.Group>
            <stack.Group screenOptions={{ presentation: "modal" }}>
              <stack.Screen name="ModalEdit" component={ModalScreen} />
              <stack.Screen name="ModalDeliv" component={ModalDeliv} />
            </stack.Group>
          </stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
}
export default AppNavigation
