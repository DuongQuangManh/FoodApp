import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Header, Icon, Input, Loading, NotYet, Toast } from '../components'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { ItemPayment, ItemStatus } from '../Item'
import { Colors, MethodPayment } from '../constants'
import { ASSET_TOKEN, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils'
import { Icons } from '../components/Icon'
import ItemMethodPayment from '../Item/ItemMethodPayment'
import { addOrder } from '../redux/orderSlice'
import { clearCart } from '../redux/cartSlice'
import { CartModel } from '../models'
import { setLocationSelect } from '../redux/addressSlice'

const PaymentScreen = () => {


    
    const navigation = useNavigation<any>();
    const dispatch = useDispatch<AppDispatch>();

    const [isMyLocation, setMyLocation] = useState(false)
    const [address, setAddress] = useState("");
    const [detailsLocation, setDetailLocation] = useState("");
    const [toast, setToast] = useState("");

    const user = useSelector((state: RootState) => state.userSlice.data)
    const location = useSelector((state: RootState) => state.addressSlice.locationSelect)
    const sanpham = useSelector((state: RootState) => state.cartSlice.data);
    const mylocation = useSelector((state: RootState) => state.addressSlice.myLocation)
    const loading = useSelector((state: RootState) => state.orderSlice.loading);
    const error = useSelector((state: RootState) => state.orderSlice.error);

    const sumPay = useSelector((state: RootState) => {
        return state.cartSlice.data.reduce((total, item: any) => total + (item.quantity * item.id_product.price), 0)
    })
    const methodPay = useSelector((state: RootState) => state.orderSlice.methodpaySelect);

    const getAddress = async (longitude: number, latitude: number) => {
        await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=${ASSET_TOKEN}
        `)
            .then(response => response.json())
            .then(data => {
                if (data.features[0]) {
                    setAddress(data.features[0].place_name)
                } else { setAddress("Không tìm thấy địa chỉ này") }
            })
            .catch(error => console.error(error));
    }

    const handlerBack = () => {
        navigation.goBack();
        setToast("");
    }
    const handlerSelectLocation = () => {
        setMyLocation(false);
        setAddress("");
        setDetailLocation("");
        navigation.navigate("SelectLocation");
    }


    const handlerMyLocation = () => {
        setMyLocation(true);
        dispatch(setLocationSelect({
            _id: "",
            details: "",
            longitude: 0,
            latitude: 0,
            id_user: "",
        }))
        getAddress(mylocation[0], mylocation[1]);
    }
    const handlerPay = () => {
        const obj = {
            id_user: user._id,
            listitem: sanpham.map(({ id_product, quantity, ...rest }) => { return { id_product, quantity, price: id_product.price } }),
            sumpay: sumPay,
            status: 1,
            paymentstatus: 1,
            methodpay: methodPay,
            location: isMyLocation ? `${detailsLocation},${address}` : location.details
        }
        if (checkAddress()) {
            dispatch(addOrder(obj));
            dispatch(clearCart(user));

        } else {
            setToast("Vui lòng nhập địa chỉ nhận hàng")
        }
    }
    function checkAddress() {
        setToast("");
        if (isMyLocation) {
            if (address && detailsLocation) {
                console.log("đủ1")
                // if(getDistance(mylocation[1],mylocation[0],))
                const a = checkDistance(sanpham, mylocation[1], mylocation[0])
                if (a) {
                    return true;
                } else {
                    Alert.alert("Chú ý", "Một số sản phẩm không nằm trong phạm vi giao hàng")
                    return false;
                }

            } else {
                return false;
            }
        } else {
            if (location.details) {
                console.log("đủ2")
                const a = checkDistance(sanpham, location.latitude, location.longitude)
                if (a) {
                    return true;
                } else {
                    Alert.alert("Chú ý", "Một số sản phẩm không nằm trong phạm vi giao hàng")
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    const checkDistance = (listitem = [] as CartModel[], lat_user: number, long_user: number) => {
        return listitem.every(item => {
            const a = getDistance(item.id_product.id_cuahang.location.latitude, item.id_product.id_cuahang.location.longitude, lat_user, long_user);
            return a <= 10;
        });
    }

    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const earthRadius = 6371; // Đường kính trung bình của Trái Đất (đơn vị: km)
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
        return distance;
    }

    const formattedMoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPay);

    return (
        <View style={styles.container}>
            <Header label='Payment' onBack={handlerBack} />
            {sanpham.length > 0 ? <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: WINDOW_WIDTH, paddingBottom: 100, }}>
                        <Text style={styles.label}>
                            Mặt hàng
                        </Text>
                        <View style={styles.box1}>
                            {sanpham.map((item, key) => <ItemPayment item={item} payment borderColor={Colors.WHITE_COLOR} key={key} />)}
                        </View>
                        <View style={styles.box2}>
                            <Text style={styles.label}>
                                Địa chỉ
                            </Text>
                            <TouchableOpacity onPress={handlerMyLocation}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text >Vị trí hiện tại</Text>
                                    <Icon type={Icons.Ionicons} name='location' color={Colors.BACKGROUND_COLOR} size={26} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.box1}>
                            <Button
                                text='Chọn vị trí'
                                buttonColor={Colors.WHITE_COLOR}
                                textColor={Colors.BACKGROUND_COLOR}
                                onClick={handlerSelectLocation}
                                width={WINDOW_WIDTH - 20}
                                height={40}
                            />
                        </View>
                        {location.details && !isMyLocation && (<View style={styles.box1}>
                            <View style={{ width: WINDOW_WIDTH - 20, padding: 5, flexDirection: 'row', borderRadius: 16, backgroundColor: Colors.WHITE_COLOR }}>
                                <Icon type={Icons.Ionicons} name='location' color={Colors.BACKGROUND_COLOR} size={26} />
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {`${user.firstname} ${user.lastname}`}
                                    </Text>
                                    <Text>
                                        {user.phone}
                                    </Text>
                                    <Text>
                                        {location.details}
                                    </Text>
                                </View>
                            </View>
                        </View>)}
                        {isMyLocation && (<View style={{ width: WINDOW_WIDTH, alignItems: 'center' }}>
                            <Input extraProps={{
                                placeholder: "Địa chỉ cụ thể",
                                onChangeText: setDetailLocation
                            }} />
                            <Input extraProps={{
                                value: address,
                                editable: false
                            }}
                            />
                        </View>)}
                        <Text style={[styles.label, { marginTop: 10, }]}>
                            Phương thức thanh toán
                        </Text>
                        <View style={styles.box1}>
                            {MethodPayment.map((item, key) => <ItemMethodPayment item={item} key={key} />)}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.boxBottom}>
                    <View style={styles.box3}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                Tổng thanh toán
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 16, color: "red" }}>
                                {formattedMoney}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.box4}>
                        <Button
                            text='Đặt hàng'
                            buttonColor={Colors.BACKGROUND_COLOR}
                            onClick={handlerPay}
                            textColor={Colors.WHITE_COLOR}
                            width={100}
                            height={50}
                        />
                    </View>
                </View>
            </View> : <NotYet
                content='Please check in history'
                nameIcon='checkmark-done-circle'
                title='Successful Order'
                typeIcon={Icons.Ionicons}
                colorIcon={Colors.BACKGROUND_COLOR}
            />}
            {toast && <Toast message={toast} />}
            {loading && <Loading />}
            {error && <Toast message={error} />}
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box1: {
        width: WINDOW_WIDTH,
        alignItems: 'center',
        marginTop: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 22,
        color: "black",
        start: 10,

    },
    box2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    boxBottom: {
        width: WINDOW_WIDTH,
        height: 60,
        backgroundColor: Colors.WHITE_COLOR,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        position: 'absolute',
        bottom: 0,
        start: 0,
        end: 0,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    box3: {
        width: "70%",
        height: 60,
        borderTopLeftRadius: 8,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingEnd: 10,
    },
    box4: {
        width: "30%",
        height: 60,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})