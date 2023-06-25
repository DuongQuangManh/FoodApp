import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Header, Input, Toast } from '../components'
import { useNavigation } from '@react-navigation/native'
import { WINDOW_WIDTH } from '../utils'
import { Colors } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { changePass, setError } from '../redux/userSlice'

const ChangePassScreen = () => {
    const navigation = useNavigation<any>();
    const ditpatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.userSlice)
    const error = useSelector((state: RootState) => state.userSlice.error)
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPass2, setNewPass2] = useState('');

    const handlerBack = () => {
        navigation.goBack()
        ditpatch(setError(""))
    }
    const handlerChange = () => {
        ditpatch(setError(""))
        if (validate()) {
            const pass = {
                crpass: oldPass,
                newpass: newPass,
            }
            ditpatch(changePass({ id: user.data._id, pass }))
        }
    }

    function validate() {
        if (oldPass && newPass && newPass2) {
            if (newPass != newPass2) {
                console.log("không đủ")
                return false;
            } else {
                console.log("đủ điều kiện")
                return true;
            }
        } else {
            console.log("Vui lòng nhập đầy đủ thông tin")
            return false;
        }
    }
    return (
        <View style={styles.container}>
            <Header label='Change Password' onBack={handlerBack} />
            <Input
                extraProps={{
                    placeholder: "Old password",
                    secureTextEntry: true,
                    onChangeText: setOldPass

                }}
                containsStyle={{
                    marginTop: 20
                }}
                width={WINDOW_WIDTH - 30}
            />
            <Input
                extraProps={{
                    placeholder: "Enter a new password",
                    secureTextEntry: true,
                    onChangeText: setNewPass

                }}
                containsStyle={{
                    marginTop: 10
                }}
                width={WINDOW_WIDTH - 30}
            />
            <Input
                extraProps={{
                    placeholder: "Enter the new password again",
                    secureTextEntry: true,
                    onChangeText: setNewPass2

                }}
                containsStyle={{
                    marginTop: 10
                }}
                width={WINDOW_WIDTH - 30}
            />
            <Button
                buttonColor={Colors.BACKGROUND_COLOR}
                onClick={handlerChange}
                text='Change'
                textColor={Colors.WHITE_COLOR}
                width={WINDOW_WIDTH - 100}
                containsStyle={{
                    marginTop: 30
                }}
            />
            {error && <Toast message={error} />}
        </View>
    )
}

export default ChangePassScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})