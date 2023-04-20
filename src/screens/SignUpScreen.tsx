import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Header, Input, Loading, Toast } from '../components';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants';
import { EMAIL_REGEX, PHONE_REGEX, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setError, signUp } from '../redux/userSlice';

const SignUpScreen = () => {
    const navigation = useNavigation<any>();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passwd, setPasswd] = useState('');
    const [passwd2, setPasswd2] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.userSlice.loading)
    const error = useSelector((state: RootState) => state.userSlice.error)

    const handlerSignUp = () => {
        if (checkValidate()) {
            const obj = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                passwd: passwd,
                phone: phone,
                img: "imgnone.png",
                status: true,
                position: false,
                token: "",
            }
            dispatch(signUp(obj))
        }
    };
    const handlerBack = () => {
        navigation.goBack();
    };

    function checkValidate() {
        if (firstname && lastname && email && phone && passwd && passwd2) {
            if (validate(email, phone)) {
                if (passwd === passwd2) {
                    return true;
                } else {
                    dispatch(setError("Mật khẩu không trùng khớp!"))
                    return false;
                }
            } else {
                dispatch(setError("Email hoặc số điện thoại không đúng định dạng !"))
                return false;
            }
        } else {
            dispatch(setError("Vui lòng không bỏ trống thông tin !"))
            return false;
        }
    }
    const validate = (email: string, phone: string) => {
        return EMAIL_REGEX.test(email) && PHONE_REGEX.test(phone);
    }
    return (
        <View style={styles.container}>
            <Header label="Create Account" onBack={handlerBack} />
            <ScrollView>
                <View style={styles.box1}>
                    <Input
                        extraProps={{
                            onChangeText: setFirstName,
                        }}
                        label="FirstName"
                    />
                    <Input
                        extraProps={{
                            onChangeText: setLastName,
                        }}
                        label="LastName"
                    />
                    <Input
                        extraProps={{
                            onChangeText: setEmail,
                        }}
                        label="Email"
                    />
                    <Input
                        extraProps={{
                            onChangeText: setPhone,
                        }}
                        label="PhoneNumber"
                    />
                    <Input
                        extraProps={{
                            onChangeText: setPasswd,
                        }}
                        label="Password"
                    />
                    <Input
                        extraProps={{
                            onChangeText: setPasswd2,
                        }}
                        label="Password 2"
                    />

                    <Button
                        text="SignUp"
                        buttonColor={Colors.BACKGROUND_COLOR}
                        textColor={Colors.WHITE_COLOR}
                        onClick={handlerSignUp}
                        containsStyle={{ marginTop: 50 }}
                    />
                </View>
            </ScrollView>
            {loading && <Loading />}
            {error && <Toast message={error} />}
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    box1: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        alignItems: 'center',
        paddingTop: 20,
    },
});
