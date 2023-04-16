import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { Icon, Line } from '../components';
import { Icons } from '../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { URL } from '../utils';
import { fetchLogout } from '../redux/userSlice';

const ProfileScreen = () => {
    const user = useSelector((state: RootState) => state.userSlice.data)
    const dispatch = useDispatch<AppDispatch>();
    console.log(user.img)
    const navigation = useNavigation<any>();
    const handlerChange = () => {
        navigation.navigate('ChangeProfileScreen');
    };

    const handlerChangePass = () => {
        navigation.navigate('ChangePassScreen');
    };
    const handlerOrder = () => {
        navigation.navigate('OrderScreen');
    };

    const goToLogin = () => {
        navigation.navigate("SignInScreen");
    }
    const handlerLogOut = () => {
        Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    dispatch(fetchLogout({ user, goToLogin }))
                }
            },
        ]);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>My Profile</Text>
            <View style={styles.box1}>
                <Text style={{ fontWeight: '600', color: 'black' }}>
                    Personal details
                </Text>
                <TouchableOpacity onPress={handlerChange}>
                    <Text style={{ color: 'red', fontWeight: '400' }}>Change</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.box2, styles.profile]}>
                <View style={{ width: '35%', padding: 5 }}>
                    <Image
                        source={{
                            uri: `${URL}/uploads/${user.img}`,
                        }}
                        style={{ width: '100%', height: 120, borderRadius: 15 }}
                    />
                </View>
                <View style={{ width: '65%', padding: 5 }}>
                    <Text style={styles.textname}>
                        {user.firstname} {user.lastname}
                    </Text>
                    <Text style={styles.textbox2}>{user.email}</Text>
                    <Line />
                    <Text style={styles.textbox2}>0xxxxxxxx</Text>
                    <Line />
                    <Text style={[styles.textbox2]}>
                        No 15 uti street off ovie palace road effurun delta state
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={handlerOrder} activeOpacity={0.8}>
                <View style={[styles.box2, styles.btnNavi]}>
                    <Text style={styles.textname}>Orders</Text>
                    <Icon type={Icons.MaterialIcons} name='keyboard-arrow-right' size={30} color='black' />
                </View>
            </TouchableOpacity>
            <View style={[styles.box2, styles.btnNavi]}>
                <Text style={styles.textname}>Orders</Text>
                <Icon type={Icons.MaterialIcons} name='keyboard-arrow-right' size={30} color='black' />
            </View>
            <TouchableOpacity onPress={handlerChangePass} activeOpacity={0.8}>
                <View style={[styles.box2, styles.btnNavi]}>
                    <Text style={styles.textname}>Change Password</Text>
                    <Icon type={Icons.MaterialIcons} name='keyboard-arrow-right' size={30} color='black' />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerLogOut} activeOpacity={0.8}>
                <View style={[styles.box2, styles.btnNavi]}>
                    <Text style={styles.textname}>Log out</Text>
                    <Icon type={Icons.MaterialIcons} name='keyboard-arrow-right' size={30} color='black' />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    textHeader: {
        fontFamily: 'SF Pro Rounded',
        width: 200,
        height: 82,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 34,
        lineHeight: 41,
        start: 15,
        marginTop: 40,
        color: 'black',
    },
    box1: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box2: {
        backgroundColor: Colors.WHITE_COLOR,
        borderRadius: 15,
        marginTop: 15,
    },
    profile: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    textbox2: {
        fontWeight: '400',
        fontSize: 14,
        marginTop: 5,
    },
    btnNavi: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    textname: {
        fontWeight: '600',
        fontSize: 17,
        color: 'black',
    },
});
