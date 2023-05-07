import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Colors } from '../constants';
import { URL, WINDOW_WIDTH } from '../utils';
import { Icon } from '../components';
import { Icons } from '../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { deleteCart, increQuantity, subQuantity } from '../redux/cartSlice';
import { addFavorite, deleteFavorite } from '../redux/favoriteSlice';


interface itemProps {
    item: any
}
const ItemCart: React.FC<itemProps> = ({ item }) => {
    const translateX = new Animated.Value(-15);
    const dispatch = useDispatch<AppDispatch>();

    const icon = useSelector((state: RootState) => {
        return state.favoriteSlice.data.some((itemFavorite: any) => itemFavorite.id_product._id === item.id_product._id)
    })

    const user = useSelector((state: RootState) => state.userSlice.data)

    const onSwipeRight = () => {
        Animated.timing(translateX, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const onSwipeLeft = () => {
        Animated.timing(translateX, {
            toValue: -15,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handlerDelete = () => {
        const obj = {
            id: item._id,
            id_user: user._id
        }
        console.log(obj)
        dispatch(deleteCart({ obj, user }))
        Animated.timing(translateX, {
            toValue: -15,
            duration: 500,
            useNativeDriver: true,
        }).start();


    };

    const handlerLike = () => {
        let obj = {
            id_user: user._id,
            id_product: item.id_product._id,
        }
        if (icon) {
            dispatch(deleteFavorite({ obj, user }))
            console.log("remove")
        } else {
            dispatch(addFavorite({ obj, user }))
            console.log("add")
        }
        console.log('Edit pressed');
        Animated.timing(translateX, {
            toValue: -15,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handlerIncre = () => {
        dispatch(increQuantity(item._id))
    };
    const handlerSub = () => {
        if (item.quantity > 1) {
            dispatch(subQuantity(item._id))
        }
    }
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };
    return (
        <GestureRecognizer
            onSwipeRight={onSwipeLeft}
            onSwipeLeft={onSwipeRight}
            style={{
                height: 100,
                marginTop: 10,
            }}
            config={config}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <Animated.View
                    style={{
                        height: 100,
                        alignItems: 'center',
                        transform: [
                            {
                                translateX: translateX.interpolate({
                                    inputRange: [-15, 1],
                                    outputRange: [0, -140],
                                }),
                            },
                        ],
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            width: WINDOW_WIDTH - 10,
                            borderRadius: 10,
                            backgroundColor: Colors.WHITE_COLOR,
                            height: 100,
                            alignItems: 'center',
                            paddingStart: 10,
                            flexDirection: 'row',
                        }}>
                        <View
                            style={{
                                width: 76,
                                height: 76,
                                borderRadius: 180,
                                borderWidth: 3,
                                borderColor: Colors.GRAY_COLOR,
                            }}>
                            <Image
                                source={{ uri: `${URL}/images/${item.id_product.img}` }}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 180,
                                    backgroundColor: 'yellow',
                                }}
                            />
                        </View>
                        <View style={{ paddingStart: 10, height: 70 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>
                                {item.id_product.name}
                            </Text>
                            <Text
                                style={{
                                    fontWeight: '600',
                                    fontSize: 17,
                                    color: 'red',
                                    marginTop: 5,
                                }}>
                                {item.id_product.price}
                            </Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                flex: 1,
                                height: 70,
                                paddingEnd: 20,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: Colors.BACKGROUND_COLOR,
                                    borderRadius: 18,
                                    width: 80,
                                    height: 25,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={handlerSub}>
                                    <Text style={{ color: Colors.WHITE_COLOR }}>-</Text>
                                </TouchableOpacity>
                                <Text style={{ color: Colors.WHITE_COLOR }}>{item.quantity}</Text>
                                <TouchableOpacity
                                    onPress={handlerIncre}>
                                    <Text style={{ color: Colors.WHITE_COLOR }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginLeft: 10,
                        }}>
                        <TouchableOpacity onPress={handlerLike}>
                            <View style={styles.btn}>
                                <Icon type={Icons.Ionicons} name={icon ? "heart" : "heart-outline"} color={Colors.WHITE_COLOR} size={30} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlerDelete} style={{ marginLeft: 10 }}>
                            <View style={styles.btn}>
                                <Icon type={Icons.MaterialIcons} name='delete' color={Colors.WHITE_COLOR} size={30} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </GestureRecognizer>
    );
};

export default ItemCart;

const styles = StyleSheet.create({
    btn: {
        width: 50,
        height: 50,
        backgroundColor: Colors.BACKGROUND_COLOR,
        borderRadius: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
