import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { WINDOW_WIDTH } from '../utils'
import Icon, { Icons } from './Icon'

interface itemProps {
    typeIcon: any,
    nameIcon: string,
    sizeIcon?: number,
    colorIcon?: string,
    title: string,
    content: string,
}
const NotYet: FC<itemProps> = ({ sizeIcon = 100, colorIcon = "black", ...props }) => {
    return (
        <View style={styles.container}>
            <Icon type={props.typeIcon} name={props.nameIcon} size={sizeIcon} color={colorIcon} />
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: "black" }}>
                {props.title}
            </Text>
            <Text>
                {props.content}
            </Text>
        </View>
    )
}

export default NotYet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})