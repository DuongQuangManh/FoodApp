import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { Header } from '../components'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { ItemLocation } from '../Item'

const SelectLocation = () => {
    const navigation = useNavigation<any>();
    const location = useSelector((state: RootState) => state.addressSlice.data)
    const handlerBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <Header label='Select Location' onBack={handlerBack} />
            <Text style={styles.label}>
                Chọn địa chỉ nhận hàng
            </Text>
            <FlatList
                data={location}
                renderItem={({ item }) => <ItemLocation item={item} enable />}
                style={{ marginTop: 10, }}
            />
        </View>
    )
}

export default SelectLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "black",
        start: 10,
        marginTop: 10,
    }
})