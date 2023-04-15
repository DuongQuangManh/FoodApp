import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants'

const Line = () => {
    return (
        <View style={styles.container}>
        </View>
    )
}

export default Line

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderColor: Colors.GRAY_COLOR,
        borderWidth: 1,
        height: 1
    }
})