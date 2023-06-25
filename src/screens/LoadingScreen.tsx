import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../constants'
import { Image } from 'react-native'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils'
import Spinner from 'react-native-spinkit'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchFavorite, setCountFavorite } from '../redux/favoriteSlice'
import { fetchAddress, setLocation } from '../redux/addressSlice'
import { fetchCart, setCountCart } from '../redux/cartSlice'
import { fetchCategory } from '../redux/categoriesSlice'
import { fetchProduct } from '../redux/productSlice'
import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from '@react-navigation/native'
import { fetchOrder } from '../redux/orderSlice'
import { fetchComment } from '../redux/commentSlice'
import { setError } from '../redux/userSlice'
const LoadingScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>();
    const user = useSelector((state: RootState) => state.userSlice.data);
    const favorite = useSelector((state: RootState) => state.favoriteSlice.data)
    const cart = useSelector((state: RootState) => state.cartSlice.data)

    useEffect(() => {
        console.log("1")
        dispatch(fetchAddress(user._id))
        console.log("2")
        dispatch(fetchFavorite(user._id))
        console.log("3")
        dispatch(fetchCart(user._id))
        console.log("4")
        dispatch(fetchCategory());
        console.log("5")
        dispatch(fetchProduct());
        console.log("6")
        dispatch(fetchOrder(user._id));
        dispatch(fetchComment());
        getCurrentLocation();
        dispatch(setError(""))
        setTimeout(() => {
            navigation.navigate("BottomNavigation")
        }, 3000)
    }, [])
    useEffect(() => {
        dispatch(setCountFavorite(favorite.length))
        dispatch(setCountCart(cart.length))
    }, [cart, favorite])
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                // setLatitude(position.coords.latitude);
                // setLongitude(position.coords.longitude)
                // Sử dụng latitude và longitude để thực hiện các tính năng liên quan đến định vị
                dispatch(setLocation([position.coords.longitude, position.coords.latitude]))
                console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
            },
            error => {
                // Xử lý lỗi nếu không thể lấy được vị trí GPS
                console.log(`Error getting current location: ${error.message}`);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };
    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/bannerapp.png")} style={styles.img} />
            <View style={styles.box1}>
                <Spinner type='Circle' size={60} color='white' />
            </View>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    img: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT / 2,
    },
    box1: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT / 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})