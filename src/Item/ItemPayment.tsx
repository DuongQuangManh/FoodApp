import { StyleSheet, Text, View, Image } from 'react-native'
import React, { FC } from 'react'
import Icon, { Icons } from '../components/Icon'
import { URL, WINDOW_WIDTH } from '../utils'
import { Colors } from '../constants'

interface itemProps {
    item: any,
    payment?: boolean,
    borderColor?: string,
}
const ItemPayment: FC<itemProps> = ({ item, payment = false, borderColor = Colors.GRAY_COLOR }) => {
    console.log(item)
    return (
        <View style={[styles.container, { borderColor: borderColor }]}>
            <View style={{
                width: 105,
                height: 105,
                borderRadius: 12,
                borderColor: Colors.WHITE_COLOR,
                borderWidth: 3,
            }}
            >
                <Image source={{ uri: `${URL}/images/${item.id_product.img}` }} style={{
                    width: 100,
                    height: 100
                }} />
            </View>
            <View style={{ flex: 1, }}>
                <Text style={{ fontWeight: 'bold', color: "black", fontSize: 24 }}>{item.id_product.name}</Text>
                <Text style={{ fontWeight: '600', color: "red", fontSize: 16, marginTop: 15, }}>Giá: ₫{payment ? item.id_product.price : item.price} /1</Text>
                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon type={Icons.Entypo} name='shop' color='black' size={20} />
                        <Text style={{ fontWeight: '600', color: "black", fontSize: 16 }}>{item.id_product.id_cuahang.name}</Text>
                    </View>
                    <Text style={{ fontWeight: '600', color: "black", fontSize: 16 }}>Số lượng: {item.quantity}</Text>
                </View>
            </View>
        </View>
    )
}
export default ItemPayment

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH - 25,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 5,
        borderRadius: 16,
        backgroundColor: Colors.WHITE_COLOR,
        marginTop: 5,
    }
})