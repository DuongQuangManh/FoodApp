import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input } from '../components'
import { Colors } from '../constants'
import { WINDOW_WIDTH } from '../utils'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { setUser } from '../redux/userSlice'

const SplashScreen = () => {
  const navigation = useNavigation() as any;

  const navi = () => {
    navigation.navigate("BottomNavigation");
  }

  const dispatch = useDispatch<AppDispatch>();

  const checkLogin = async () => {
    const res: any = await AsyncStorage.getItem("user");
    const user = JSON.parse(res);
    if (user.token) {
      navi();
      dispatch(setUser(user))
    } else {
      navigation.navigate("StartScreen");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2200)
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.BACKGROUND_COLOR }} >
      <Image source={require("../assets/images/bannerapp.png")} style={{ width: WINDOW_WIDTH, height: 350 }} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})