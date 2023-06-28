import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Colors } from '../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Header, Icon, Input, Line, Loading, Toast } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ASSET_TOKEN, URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils';
import { Icons } from '../components/Icon';
import { addFavorite, deleteFavorite, setErrorFavo } from '../redux/favoriteSlice';
import { addCart, setError } from '../redux/cartSlice';
import { ItemComment } from '../Item';
import { addComment, fetchComment } from '../redux/commentSlice';
import socketServcies from '../utils/socketService';

const DetailsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>();
    const [toast, setToast] = useState("")
    const [address, setAddress] = useState("")
    const [content, setContent] = useState("");

    const product: any = useSelector((state: RootState) => state.productSlice.productSelect)
    const user = useSelector((state: RootState) => state.userSlice.data)
    const error = useSelector((state: RootState) => state.cartSlice.error);
    const errorFavo = useSelector((state: RootState) => state.favoriteSlice.error)
    const loading = useSelector((state: RootState) => state.cartSlice.loading);
    const formattedMoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);


    const comment = useSelector((state: RootState) => {
        return state.commentSlice.data.filter((item: any) => {
            return item.id_product._id == product._id;
        })
    })
    const icon = useSelector((state: RootState) => {
        return state.favoriteSlice.data.some((item: any) => item.id_product._id === product._id)
    })

    const check = useSelector((state: RootState) => {
        console.log("hihih")
        return state.cartSlice.data.some((item: any) => {
            return item.id_product._id == product._id;
        })
    })

    useEffect(() => {
        socketServcies.initializeSocket();
    }, [])
    useEffect(() => {
        socketServcies.on("check_comment", (data: any) => {
            console.log("đây là data")
            console.log(data)
            if (data === "1") {
                console.log("đã load lại vì có commnet mới")
                dispatch(fetchComment());

            }
        });
    }, [])
    const handlerAddToCart = () => {
        dispatch(setError(""))
        let obj = {
            id_user: user._id,
            id_product: product._id,
            quantity: 1,
        }
        if (!check) {
            dispatch(addCart({ obj, user }))
            return
        } {
            setToast("Sản phẩm đã tồn tại trong giỏ hàng")
        }
    };
    const handlerBack = () => {
        navigation.goBack();
        dispatch(setError(""));
        dispatch(setErrorFavo(""));
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
        dispatch(setError(""))
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

    const handlerSend = async () => {
        if (content) {
            const obj = {
                id_user: user._id,
                id_product: product._id,
                content: content,
            }
            await dispatch(addComment({ user, obj }))
            await socketServcies.emit("comment", "1");
            setContent("")
        } else {
            setToast("Không để comment rỗng")
        }
    }
    const handlerRefresh = () => {
        dispatch(fetchComment())
    }

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

            <ScrollView style={{ flex: 1, width: '100%', padding: 10 }}>
                <View style={{ paddingBottom: 200 }}>
                    <Image
                        source={{ uri: `${URL}/images/${product.img}` }}
                        style={{ width: WINDOW_WIDTH - 20, height: WINDOW_HEIGHT / 3, borderRadius: 18, }} />
                    <Text style={styles.label}>
                        Tên món: <Text style={styles.text}>{product.name}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Giá: <Text style={[styles.text, styles.colorRed]}>{formattedMoney}</Text>
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
                    <Line borderColor={"black"} marginTop={20} />
                    <View style={styles.box1}>
                        <Text style={[styles.label, { fontSize: 20, }]}>Đánh giá</Text>
                        <TouchableOpacity onPress={handlerRefresh}>
                            <Text style={{ fontSize: 15, color: "red" }}>làm mới</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box2}>
                        <Image
                            source={{ uri: `${URL}/uploads/${user.img}` }}
                            style={styles.img}
                        />
                        <Input extraProps={{
                            placeholder: "Comment",
                            onChangeText: setContent,

                        }}
                            width={(WINDOW_WIDTH - 20) * 67 / 100}
                        />
                        <Button
                            text='Gửi'
                            buttonColor={Colors.BACKGROUND_COLOR}
                            textColor={Colors.WHITE_COLOR}
                            onClick={handlerSend}
                            width={(WINDOW_WIDTH - 20) * 15 / 100}
                        />
                    </View>
                    <View style={{ marginTop: 20, }}>
                        {comment.map((item, index) => <ItemComment item={item} key={index} />)}
                    </View>
                </View>

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
    box1: {
        width: WINDOW_WIDTH - 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    img: {
        width: (WINDOW_WIDTH - 20) * 15 / 100,
        height: (WINDOW_WIDTH - 20) * 15 / 100,
        borderRadius: 180,
        borderColor: Colors.BACKGROUND_COLOR,
        borderWidth: 3

    },
    box2: {
        width: WINDOW_WIDTH - 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
