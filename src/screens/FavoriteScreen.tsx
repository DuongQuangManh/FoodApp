import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { ItemFavorite } from '../Item'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchFavorite } from '../redux/favoriteSlice'
import { useFocusEffect } from '@react-navigation/native'
import { Toast } from '../components'

const FavoriteScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const user = useSelector((state: RootState) => state.userSlice.data);
    const data = useSelector((state: RootState) => state.favoriteSlice.data)
    const errorCart = useSelector((state: RootState) => state.cartSlice.error)
    const dispatch = useDispatch<AppDispatch>();
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        dispatch(fetchFavorite(user._id)).then(() => {
            setRefreshing(false);
        });
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>My Favorite</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <ItemFavorite item={item} />}
                style={styles.flat}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            {errorCart && <Toast message={errorCart} />}
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textHeader: {
        fontFamily: 'SF Pro Rounded',
        width: 200,
        height: 82,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 34,
        lineHeight: 41,
        start: 15,
        marginTop: 40,
        color: 'black',
    },
    flat: {
        padding: 5,
        marginTop: 10,
    }
})