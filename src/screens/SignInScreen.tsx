import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../constants'
import { EMAIL_REGEX, WINDOW_WIDTH } from '../utils'
import { Button, Input } from '../components'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUserLogin, setError } from '../redux/userSlice'
import Loading from '../components/Loading'

var logo = require("../assets/images/bannerapp.png")
const SignInScreen = () => {

  const navigation = useNavigation() as any;
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.userSlice.error)
  const loading = useSelector((state: RootState) => state.userSlice.loading)
  const navi = () => {
    navigation.navigate("BottomNavigation");
    setNull();
  }

  const setNull = () => {
    setEmail("");
    setPasswd("");
  }

  const handlerLogin = (): void => {
    if (email == "" || passwd == "") {
      dispatch(setError("Vui lòng nhập đầy đủ thông tin"));
    } else {
      if (!validate(email)) {
        dispatch(setError("Vui lòng nhập đúng định dạng email"));
      } else {
        let obj = {
          email: email,
          passwd: passwd,
        }
        dispatch(fetchUserLogin({ user: obj, navi }))
      }
    }

  }

  const validate = (email: string) => {
    return EMAIL_REGEX.test(email);
  }

  return (
    <View style={{ flex: 1 }} >
      <ImageBackground source={logo} style={styles.containerTop}>
        <Text style={{ fontSize: 35, fontWeight: '700', color: Colors.WHITE_COLOR, bottom: 20, end: 20 }}>Login</Text>
      </ImageBackground>
      <View style={styles.containerBottom}>

        <Input
          extraProps={{ placeholder: 'Email', onChangeText: setEmail }} />
        <Input
          extraProps={{
            placeholder: 'Password', onChangeText: setPasswd,
            secureTextEntry: true
          }} />
        <Text style={{ marginTop: 10, width: "80%", color: 'red', }}>{error}</Text>
        <Button
          text='Sign In'
          buttonColor={Colors.BACKGROUND_COLOR}
          textColor={Colors.WHITE_COLOR}
          onClick={handlerLogin}
          containsStyle={{ marginTop: 50, }} />
      </View>
      {loading && <Loading />}
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  containerTop: {
    width: WINDOW_WIDTH,
    height: 350,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  containerBottom: {
    width: WINDOW_WIDTH,
    alignItems: 'center'
  }
})