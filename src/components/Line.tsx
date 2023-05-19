import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../constants'

interface lineProps {
    marginTop?: number;
    borderColor?: any;
}
const Line: FC<lineProps> = ({ marginTop = 0, borderColor = Colors.GRAY_COLOR }) => {
    return (
        <View style={[styles.container, { marginTop: marginTop, borderColor: borderColor, }]}>
        </View>
    )
}

export default Line

const styles = StyleSheet.create({
    container: {
        width: "100%",

        borderWidth: 1,
        height: 1
    }
})