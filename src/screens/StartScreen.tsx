import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../constants'
import { WINDOW_WIDTH } from '../utils'
import { Button } from '../components'
import { useNavigation } from '@react-navigation/native'

const StartScreen = () => {
  const navigation = useNavigation<any>();
  const handlerStart = (): void => {
    navigation.navigate("SignInScreen")
  }
  return (
    <View style={styles.container} >
      <Image source={require("../assets/images/bannerapp.png")} style={{ width: WINDOW_WIDTH, height: 350 }} />
      <View style={styles.btn}>
        <Button text='Start' textColor={Colors.BACKGROUND_COLOR} buttonColor={Colors.WHITE_COLOR} onClick={handlerStart} />
      </View>
    </View>
  )
}

export default StartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR
  },
  btn: {
    position: 'absolute', bottom: 40, width: WINDOW_WIDTH, alignItems: 'center', zIndex: 3
  }
})