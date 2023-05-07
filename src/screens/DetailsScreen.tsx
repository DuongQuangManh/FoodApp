import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Colors } from '../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Header, Icon, Loading, Toast } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ASSET_TOKEN, URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils';
import { Icons } from '../components/Icon';
import { addFavorite, deleteFavorite, setErrorFavo } from '../redux/favoriteSlice';
import { addCart, setError } from '../redux/cartSlice';

const DetailsScreen = () => {
    const navigation = useNavigation<any>();
    const [toast, setToast] = useState("")
    const [address, setAddress] = useState("")

    const product: any = useSelector((state: RootState) => state.productSlice.productSelect)
    const user = useSelector((state: RootState) => state.userSlice.data)
    const error = useSelector((state: RootState) => state.cartSlice.error);
    const errorFavo = useSelector((state: RootState) => state.favoriteSlice.error)
    const loading = useSelector((state: RootState) => state.cartSlice.loading);
    const icon = useSelector((state: RootState) => {
        return state.favoriteSlice.data.some((item: any) => item.id_product._id === product._id)
    })

    const check = useSelector((state: RootState) => {
        return state.cartSlice.data.some((item: any) => {
            return item.id_product._id == product._id;
        })
    })

    const dispatch = useDispatch<AppDispatch>();

    const handlerAddToCart = () => {
        let obj = {
            id_user: user._id,
            id_product: product._id,
            quantity: 1,
        }
        if (!check) {
            dispatch(addCart({ obj, user }))

        } {
            setToast("Sản phẩm đã tồn tại trong giỏ hàng")
        }
    };
    const handlerBack = () => {
        navigation.goBack();
        dispatch(setError(""))
        dispatch(setErrorFavo(""))


    };

    useEffect(() => {
        getAddress();
    }, [])
    const getAddress = async () => {
        await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${product.id_cuahang.location.longitude},${product.id_cuahang.location.latitude}.json?limit=1&access_token=${ASSET_TOKEN}
        `)
            .then(response => response.json())
            .then(data => {
                if (data.features[0]) {
                    setAddress(data.features[0].place_name)
                } else { setAddress("Không tìm thấy địa chỉ này") }
            })
            .catch(error => console.error(error));
    }

    const handlerLike = () => {
        let obj = {
            id_user: user._id,
            id_product: product._id,
        }
        if (icon) {
            dispatch(deleteFavorite({ obj, user }))
            console.log("remove")
        } else {
            dispatch(addFavorite({ obj, user }))
            console.log("add")
        }
    }


    console.log(product.id_cuahang)
    return (
        <View style={styles.container}>
            <Header
                label='Detail'
                onBack={handlerBack}
                icon={
                    icon
                        ? <Icon type={Icons.Ionicons} name='heart' color={Colors.BACKGROUND_COLOR} size={25} />
                        : <Icon type={Icons.Ionicons} name='heart-outline' color={Colors.BACKGROUND_COLOR} size={25}
                        />
                }
                onSub={handlerLike} />
            <View style={styles.containImg}>
                <Image source={{ uri: `${URL}/images/${product.img}` }} style={{ width: WINDOW_WIDTH - 10, height: WINDOW_HEIGHT / 3, borderRadius: 18, }} />
            </View>
            <ScrollView style={{ flex: 1, width: '100%', padding: 10 }}>
                <Text style={styles.label}>
                    Tên món: <Text style={styles.text}>{product.name}</Text>
                </Text>
                <Text style={styles.label}>
                    Giá: <Text style={[styles.text, styles.colorRed]}>{product.price} <Text style={[styles.vnd, styles.colorRed]}>VNĐ</Text></Text>
                </Text>
                <Text style={styles.label}>
                    Category: <Text style={styles.text}>{product.id_theloai.name}</Text>
                </Text>
                <Text style={styles.label}>
                    Description: <Text style={styles.text}>{product.description}</Text>
                </Text>
                <Text style={styles.label}>
                    Address: <Text style={styles.text}>{address}</Text>
                </Text>
            </ScrollView>
            <View style={styles.boxbtn}>
                <Button
                    buttonColor={Colors.BACKGROUND_COLOR}
                    text="Add To Cart"
                    textColor={Colors.WHITE_COLOR}
                    onClick={handlerAddToCart}
                />
            </View>
            {error && <Toast message={error} />}
            {loading && <Loading />}
            {toast && <Toast message={toast} />}
            {errorFavo && <Toast message={errorFavo} />}
        </View>
    );

};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GRAY_COLOR,
    },
    boxbtn: {
        width: WINDOW_WIDTH,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
    },
    text: {
        fontWeight: '400',
        fontSize: 20,
    },
    vnd: {
        fontSize: 14
    },
    colorRed: {
        color: "red"
    },
    containImg: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT / 3,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});
