import { StyleSheet, Text, View, Image } from 'react-native'
import React, { FC } from 'react'
import { URL, WINDOW_WIDTH } from '../utils'
interface ItemProps {
    item: any
}

const ItemComment: FC<ItemProps> = ({ item }) => {
    const date = new Date(item.createdAt);

    return (
        <View style={styles.container}>
            <Image source={{ uri: `${URL}/uploads/${item.id_user.img}` }} style={styles.img} />
            <View style={styles.box1}>
                <View style={styles.box2}>
                    <Text style={styles.label}>{`${item.id_user.firstname} ${item.id_user.lastname}`}</Text>
                    <Text>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()},${date.getHours()}:${date.getMinutes()}`}</Text>
                </View>
                <Text>{item.content}</Text>
            </View>
        </View>
    )
}

export default ItemComment

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH - 20,
        flexDirection: 'row',
        marginBottom: 5,
    },
    img: {
        width: (WINDOW_WIDTH - 20) * 15 / 100,
        height: (WINDOW_WIDTH - 20) * 15 / 100,
        borderRadius: 180
    },
    box1: {
        paddingStart: 10,
    },
    box2: {
        width: (WINDOW_WIDTH - 40) * 85 / 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontWeight: 'bold',
        color: "black",
        fontSize: 16,
    }
})