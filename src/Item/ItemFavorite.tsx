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
import { deleteFavorite, setErrorFavo } from '../redux/favoriteSlice';
import { addCart, setError } from '../redux/cartSlice';


interface itemProps {
    item: any
}
const ItemFavorite: React.FC<itemProps> = ({ item }) => {
    const formattedMoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.id_product.price);

    const translateX = new Animated.Value(-1);
    const user = useSelector((state: RootState) => state.userSlice.data)
    const dispatch = useDispatch<AppDispatch>();
    const onSwipeRight = () => {
        Animated.timing(translateX, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const onSwipeLeft = () => {
        Animated.timing(translateX, {
            toValue: -1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const onPressDelete = () => {
        let obj = {
            id_user: user._id,
            id_product: item.id_product._id,
        }
        dispatch(deleteFavorite({ obj, user }))
        Animated.timing(translateX, {
            toValue: -1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    const check = useSelector((state: RootState) => {
        return state.cartSlice.data.some((itemCart: any) => {
            return itemCart.id_product._id == item.id_product._id;
        })
    })

    const handlerAddToCart = () => {
        console.log(check)
        let obj = {
            id_user: user._id,
            id_product: item.id_product._id,
            quantity: 1,
        }
        if (!check) {
            dispatch(addCart({ obj, user }))
            setTimeout(() => {
                dispatch(setError(""))
            }, 2000)
        }
    }

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
                                    inputRange: [-1, 1],
                                    outputRange: [0, -80],
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
                                {formattedMoney}
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
                                    width: 120,
                                    height: 25,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={handlerAddToCart}>
                                    <Text style={{ color: Colors.WHITE_COLOR }}>Add to cart</Text>
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
                        <TouchableOpacity onPress={onPressDelete}>
                            <View style={styles.btn}>
                                <Icon type={Icons.Ionicons} name='heart' color='white' size={30} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </GestureRecognizer>
    );
};

export default ItemFavorite;

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
