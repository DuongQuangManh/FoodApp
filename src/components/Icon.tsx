import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants';

export const Icons = {
    Ionicons,
    FontAwesome,
    MaterialIcons,
    Entypo
}
interface IconProps {
    type?: any,
    name: string,
    color?: string,
    size?: number
}
const Icon: React.FC<IconProps> = ({ type = Icons.MaterialIcons, name, color = 'black', size = 26 }) => {
    const Tag = type;
    return (
        <>
            {type && name && (
                <Tag name={name} color={color} size={size} />
            )}
        </>
    )
}

export default Icon

const styles = StyleSheet.create({})