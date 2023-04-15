import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { setSelect } from '../redux/categoriesSlice'
import { WINDOW_WIDTH } from '../utils'

interface itemProps {
    item: any
}
const ItemCategory: FC<itemProps> = ({ item }) => {

    const select = useSelector((state: RootState) => state.categoriesSlice.cateSelect)
    const isSelect = item._id === select;

    const dispatch = useDispatch<AppDispatch>();
    const handlerClick = (): void => {
        dispatch(setSelect(item))
    }
    return (
        <TouchableOpacity onPress={handlerClick} style={{ width: WINDOW_WIDTH / 3, height: 30, }}>
            <View style={styles.containerItem}>
                <Text style={{ fontSize: 16, color: isSelect ? 'black' : 'gray', fontWeight: isSelect ? 'bold' : '600' }}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemCategory

const styles = StyleSheet.create({
    containerItem: {
        width: WINDOW_WIDTH / 3,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})