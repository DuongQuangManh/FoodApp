import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { FC } from 'react'
import { URL, WINDOW_WIDTH } from '../utils'
import { Colors } from '../constants'
import { Icon, Line } from '../components'
import { Icons } from '../components/Icon'
import ItemPayment from './ItemPayment'

interface itemProps {
    item: any,
}
const ItemHistory: FC<itemProps> = ({ item }) => {
    return (
        <View style={styles.container}>
            <FlatList data={item.listitem} renderItem={({ item }) => <ItemPayment item={item} />} />
            <Line marginTop={20} />
            <View style={{ flex: 1, }}>
                <View style={styles.box1}>
                    <Text>{`${item.listitem.length} sản phẩm`}</Text>
                    <Text style={{ color: "red", fontWeight: "600" }}>{`Thành tiền: ₫${item.sumpay}`}</Text>
                </View>
            </View>
        </View>
    )
}

export default ItemHistory

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH - 10,
        backgroundColor: Colors.WHITE_COLOR,
        padding: 10,
        borderRadius: 16,
        marginTop: 10,
    },
    box1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center'
    }
})