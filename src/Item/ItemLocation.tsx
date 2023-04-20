import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

interface itemProps {
    item: any
}
const ItemLocation: FC<itemProps> = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text>{item.details}</Text>
        </View>
    )
}

export default ItemLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    }
})