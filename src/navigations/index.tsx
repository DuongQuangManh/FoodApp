import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  SplashScreen,
  SignInScreen,
  StartScreen,
  SeeMoreScreen,
  CartScreen,
  DetailsScreen,
  ChangePassScreen,
  ChangeProfileScreen,
  OrderScreen,
  PaymentScreen,
  AddressScreen,
  LoadingScreen,
  SignUpScreen
} from '../screens'
import BottomNavigation from './BottomNavigation'

const Stack = createNativeStackNavigator();

const StackNavi = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='StartScreen' component={StartScreen} />
        <Stack.Screen name='SignInScreen' component={SignInScreen} />
        <Stack.Screen name='BottomNavigation' component={BottomNavigation} />
        <Stack.Screen name='SeeMoreScreen' component={SeeMoreScreen} />
        <Stack.Screen name='CartScreen' component={CartScreen} />
        <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
        <Stack.Screen name='ChangePassScreen' component={ChangePassScreen} />
        <Stack.Screen name='ChangeProfileScreen' component={ChangeProfileScreen} />
        <Stack.Screen name='OrderScreen' component={OrderScreen} />
        <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
        <Stack.Screen name='AddressScreen' component={AddressScreen} />
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />





      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavi

const styles = StyleSheet.create({})