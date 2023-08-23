import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, Header, NotYet } from '../components'
import { useNavigation } from '@react-navigation/native'
import { ItemCart } from '../Item'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { WINDOW_WIDTH } from '../utils'
import { Colors } from '../constants'
import { Icons } from '../components/Icon'


const CartScreen = () => {
    const navigation = useNavigation() as any;
    const handlerBack = (): void => {
        navigation.goBack();
    }
    const data = useSelector((state: RootState) => state.cartSlice.data);
    const count = useSelector((state: RootState) => state.cartSlice.count)
    const sumPay = useSelector((state: RootState) => {
        return state.cartSlice.data.reduce((total, item: any) => total + (item.quantity * item.id_product.price), 0)
    })
    const formattedMoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPay);

    const handlerPay = () => {
        navigation.navigate("PaymentScreen")
    }
    return (
        <View style={styles.container}>
            <Header label='Cart' onBack={handlerBack} />
            {data.length > 0 ? <View style={{ flex: 1, }}>
                <FlatList data={data} renderItem={({ item }) => <ItemCart item={item} />} style={styles.flat} ListFooterComponent={<View style={{height:20}}/>}/>
                <View style={styles.containerSumPrice}>
                    <View style={styles.information}>
                        <Text style={styles.labelSum}>Total payment: </Text>
                        <Text style={styles.sum}>{`${formattedMoney} vnđ`}</Text>
                    </View>
                    <View style={styles.btnPay}>
                        <Button
                            text={`Pay (${count})`}
                            textColor={Colors.WHITE_COLOR}
                            buttonColor={Colors.BACKGROUND_COLOR}
                            width={130}
                            height={50}
                            borderRadius={8}
                            onClick={handlerPay} />
                    </View>
                </View>
            </View> : <NotYet
                title='No cart yet'
                content='Please add product to cart'
                nameIcon='opencart'
                typeIcon={Icons.FontAwesome}
                colorIcon={Colors.BACKGROUND_COLOR}
            />}

        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flat: {
        padding: 5,
        marginTop: 10,
    },
    containerSumPrice: {
        width: WINDOW_WIDTH,
        height: 70,
        position: 'absolute',
        bottom: 0,
        start: 0,
        end: 0,
        backgroundColor: Colors.WHITE_COLOR,
        borderTopColor: "#D4D5D7",
        borderTopWidth: 1,
        zIndex: 10,
        flexDirection: 'row'
    },
    information: {
        width: WINDOW_WIDTH - 150,
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 5,

    },
    btnPay: {
        width: 150,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelSum: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "black"
    },
    sum: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
    }
})