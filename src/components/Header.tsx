import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { Colors } from '../constants';
import Icon, { Icons } from './Icon';

interface headerProps {
    backgroundColor?: string,
    label: string,
    icon?: JSX.Element,
    onBack: () => void
    onSub?: () => void
}
const Header: React.FC<headerProps> = ({ backgroundColor = Colors.GRAY_COLOR, onBack, label, ...props }) => {
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    start: 5,
                    top: 5,
                    zIndex: 10,
                }}
                onPress={onBack}>
                <Icon type={Icons.Ionicons} name='chevron-back-sharp' size={35} color='black' />
            </TouchableOpacity>
            <Text style={styles.text}>{label}</Text>
            <TouchableOpacity style={{ position: 'absolute', top: 10, end: 10, }} onPress={props.onSub}>
                <View>
                    {props.icon && (
                        props.icon
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default memo(Header);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
    },
});
