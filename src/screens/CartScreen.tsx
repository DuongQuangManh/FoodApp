import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../components'
import { useNavigation } from '@react-navigation/native'
import ItemCart from '../Item/ItemFavorite'


const CartScreen = () => {
    const navigation = useNavigation() as any;
    const handlerBack = (): void => {
        navigation.goBack();
    }
    // const data = [
    //     {
    //         name: "Cơm",
    //         price: 20000
    //     },
    //     {
    //         name: "Cứt",
    //         price: 20000
    //     },
    //     {
    //         name: "Cứt",
    //         price: 20000
    //     }
    // ]
    return (
        <View style={styles.container}>
            <Header label='Cart' onBack={handlerBack} />
            {/* <FlatList data={data} renderItem={({ item }) => <ItemCart item={item} />} style={styles.flat} /> */}
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
    }
})