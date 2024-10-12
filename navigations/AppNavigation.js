import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react';
import BottomTabNavigation from './BottomTabNavigation';
import DrawerNavigation from './DrawerNavigation';
import { CartScreen, CommandsScreen, HomeScreen, LoginScreen, SignupScreen } from '../screens';
import SingleDish from '../screens/SingleDish';
const stack=createNativeStackNavigator();


const AppNavigation=()=>{
    return(
       <NavigationContainer>
        <stack.Navigator
        screenOptions={({headerShown: false})}
        initialRouteName='Main'
        >
            <stack.Screen name="Main" component={DrawerNavigation}/>
            <stack.Screen name="Signup" component={SignupScreen}/>
            <stack.Screen name="Login" component={LoginScreen}/>
            <stack.Screen name="singleDish" component={SingleDish}/>
            <stack.Screen name="cartScreen" component={CartScreen}/>
            <stack.Screen name="CommandsScreen" component={CommandsScreen}/>

        </stack.Navigator>
       </NavigationContainer>
    )
}
export default AppNavigation
