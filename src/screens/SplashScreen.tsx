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
import { io } from 'socket.io-client'
const SplashScreen = () => {
  const navigation = useNavigation() as any;

  const navi = () => {
    navigation.navigate("LoadingScreen");
  }

  const dispatch = useDispatch<AppDispatch>();

  const checkLogin = async () => {
    const res: any = await AsyncStorage.getItem("user");
    const user = await JSON.parse(res);

    if (user) {
      if (user.token) {
        await dispatch(setUser(user))
        navi();
      }
    } else {
      setTimeout(() => {
        navigation.navigate("StartScreen");
      }, 2200)
    }
  }

  useEffect(() => {

    checkLogin();
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.BACKGROUND_COLOR }} >
      <Image source={require("../assets/images/bannerapp.png")} style={{ width: WINDOW_WIDTH, height: 350 }} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})