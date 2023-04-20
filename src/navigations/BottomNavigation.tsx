import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, FavoriteScreen, ProfileScreen, HistoryScreen } from '../screens'
import { Colors } from '../constants'
import { BadgeIcon, Icon } from '../components'
import { Icons } from '../components/Icon'
import { WINDOW_WIDTH } from '../utils'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchFavorite, setCountFavorite } from '../redux/favoriteSlice'
import { fetchCart } from '../redux/cartSlice'
import { fetchCategory } from '../redux/categoriesSlice'
import { fetchProduct } from '../redux/productSlice'
import Geolocation from '@react-native-community/geolocation'
import { fetchAddress, setLocation } from '../redux/addressSlice'
const BottomNavigation = () => {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation() as any;
    const handlerOpenCart = (): void => {
        navigation.navigate("CartScreen")
    }

    const user = useSelector((state: RootState) => state.userSlice.data);
    const token = useSelector((state: RootState) => state.userSlice.token);
    const favorite = useSelector((state: RootState) => state.favoriteSlice.data)


    const count = useSelector((state: RootState) => state.favoriteSlice.count);
    const countCart = useSelector((state: RootState) => state.cartSlice.count);

    // const getCurrentLocation = () => {
    //     Geolocation.getCurrentPosition(
    //         position => {
    //             // setLatitude(position.coords.latitude);
    //             // setLongitude(position.coords.longitude)
    //             // Sử dụng latitude và longitude để thực hiện các tính năng liên quan đến định vị
    //             dispatch(setLocation([position.coords.longitude, position.coords.latitude]))
    //             console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    //         },
    //         error => {
    //             // Xử lý lỗi nếu không thể lấy được vị trí GPS
    //             console.log(`Error getting current location: ${error.message}`);
    //         },
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    // };
    return (
        <View style={{ flex: 1, }}>
            <View style={{ width: 30, height: 30, position: 'absolute', top: 10, end: 10, zIndex: 2 }}>
                <TouchableOpacity onPress={handlerOpenCart} style={{ zIndex: 5 }}>
                    <View style={styles.iconcart}>
                        <BadgeIcon badgeCount={countCart} icon={<Icon type={Icons.Ionicons} name='cart-outline' color='black' size={25} />} />
                    </View>
                </TouchableOpacity>
            </View>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = "";
                        let colorIcon = Colors.BACKGROUND_COLOR;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline'
                            colorIcon = focused ? Colors.BACKGROUND_COLOR : 'black'
                        } else if (route.name === 'Favorite') {
                            iconName = focused ? "heart" : "heart-outline"
                            colorIcon = focused ? Colors.BACKGROUND_COLOR : 'black'

                        } else if (route.name === 'Profile') {
                            iconName = focused ? "person-circle" : "person-circle-outline"
                            colorIcon = focused ? Colors.BACKGROUND_COLOR : 'black'

                        } else if (route.name === 'History') {
                            iconName = focused ? "timer" : "timer-outline"
                            colorIcon = focused ? Colors.BACKGROUND_COLOR : 'black'

                        }

                        return <Icon type={Icons.Ionicons} name={iconName} color={colorIcon} />;
                    },
                    tabBarActiveTintColor: Colors.BACKGROUND_COLOR,
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarStyle: {
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20,

                    },
                    tabBarShowLabel: false,
                })}>
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen
                    name='Favorite'
                    component={FavoriteScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return <BadgeIcon badgeCount={count} icon={<Icon type={Icons.Ionicons} name={focused ? "heart" : "heart-outline"} color={focused ? Colors.BACKGROUND_COLOR : "black"} />} />
                        }
                    }}
                />
                <Tab.Screen name='Profile' component={ProfileScreen} />
                <Tab.Screen name='History' component={HistoryScreen} />
            </Tab.Navigator>
        </View>

    )
}

export default BottomNavigation

const styles = StyleSheet.create({
    iconcart: {
        width: 30,
        height: 30,
    }
})