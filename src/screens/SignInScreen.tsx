import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
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
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const error = useSelector((state: RootState) => state.userSlice.error)
  const loading = useSelector((state: RootState) => state.userSlice.loading)
  const user = useSelector((state: RootState) => state.userSlice.data)

  const navi = () => {
    navigation.navigate("LoadingScreen");
    setNull();
  }

  const setNull = () => {
    setEmail("");
    setPasswd("");
  }

  const handlerLogin = async () => {
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
        await dispatch(fetchUserLogin({ user: obj, navi })).then((res) => {
          console.log(res)
          if (res.payload.data) {
            navi();
          }
        })

      }
    }

  }

  const validate = (email: string) => {
    return EMAIL_REGEX.test(email);
  }

  const handlerSignUp = () => {
    navigation.navigate("SignUpScreen")
  }

  return (
    <View style={{ flex: 1 }} >
      <View style={styles.box1}>
        <Image source={logo} style={styles.containerTop} />
        <Text style={styles.label}>Login</Text>
      </View>
      <View style={styles.containerBottom}>

        <Input
          extraProps={{
            placeholder: 'Email',
            onChangeText: setEmail,
            value: email
          }}
          containsStyle={{ marginTop: 20, }}
          width={WINDOW_WIDTH - 50}
          border={11}
        />
        <Input
          extraProps={{
            value: passwd,
            placeholder: 'Password', onChangeText: setPasswd,
            secureTextEntry: true
          }}
          containsStyle={{ marginTop: 10, }}
          width={WINDOW_WIDTH - 50}
          border={11}

        />
        <Text style={{ marginTop: 10, width: "80%", color: 'red', }}>{error}</Text>
        <Button
          text='Sign In'
          buttonColor={Colors.BACKGROUND_COLOR}
          textColor={Colors.WHITE_COLOR}
          onClick={handlerLogin}
          containsStyle={{ marginTop: 50, }} />
        <TouchableOpacity onPress={handlerSignUp} style={{ marginTop: 20 }}>
          <Text>Do you have an account? SignUp</Text>
        </TouchableOpacity>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  containerBottom: {
    width: WINDOW_WIDTH,
    alignItems: 'center'
  },
  box1: {
    width: WINDOW_WIDTH,
  },
  label: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.WHITE_COLOR,
    position: 'absolute',
    end: 20,
    bottom: 10,
  }
})