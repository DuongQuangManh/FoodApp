import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, FavoriteScreen, ProfileScreen, HistoryScreen } from '../screens'
import { Colors } from '../constants'
import { Icon } from '../components'
import { Icons } from '../components/Icon'
import { WINDOW_WIDTH } from '../utils'
import { useNavigation } from '@react-navigation/native'
const BottomNavigation = () => {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation() as any;
    const handlerOpenCart = (): void => {
        navigation.navigate("CartScreen")
    }
    return (
        <View style={{ flex: 1, }}>
            <View style={{ width: 30, height: 30, position: 'absolute', top: 10, end: 10, zIndex: 2 }}>
                <TouchableOpacity onPress={handlerOpenCart} style={{ zIndex: 5 }}>
                    <View style={styles.iconcart}>
                        <Icon type={Icons.Ionicons} name='cart-outline' color='black' size={25} />
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
                <Tab.Screen name='Favorite' component={FavoriteScreen} />
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