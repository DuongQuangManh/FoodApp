import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../constants'

interface lineProps {
    marginTop?: number;
}
const Line: FC<lineProps> = ({ marginTop = 0 }) => {
    return (
        <View style={[styles.container, { marginTop: marginTop }]}>
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