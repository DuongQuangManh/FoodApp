import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { WINDOW_WIDTH } from '../utils'
import { Colors } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { setMethodPaySelect } from '../redux/orderSlice'

interface itemProps {
    item: any
}
const ItemMethodPayment: FC<itemProps> = ({ item }) => {
    const select: any = useSelector((state: RootState) => state.orderSlice.methodpaySelect)
    const isSelect = select === item.id;
    const dispatch = useDispatch<AppDispatch>();
    const handlerSelect = () => {
        dispatch(setMethodPaySelect(item))
    }
    return (
        <TouchableOpacity style={{ width: "95%", }} activeOpacity={0.7} onPress={handlerSelect}>
            <View style={[styles.container,
            {
                backgroundColor: isSelect ? Colors.BACKGROUND_COLOR : Colors.WHITE_COLOR,
                borderColor: isSelect ? Colors.WHITE_COLOR : "black"
            }]}>
                <Text style={{
                    fontWeight: "600",
                    fontSize: 15,
                    color: isSelect ? Colors.WHITE_COLOR : undefined,
                }}
                >
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemMethodPayment

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 5,
        borderRadius: 7,
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        paddingStart: 10,
    }
})