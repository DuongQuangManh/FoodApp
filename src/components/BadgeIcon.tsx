import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface itemProps {
    icon: JSX.Element,
    badgeCount?: number,
}
const BadgeIcon: FC<itemProps> = ({ icon, badgeCount = 0 }) => {
    return (
        <View style={styles.container}>
            {/* Hiển thị icon */}
            {icon}
            {/* Hiển thị số lượng sản phẩm (hoặc đơn hàng) trên badge */}
            {badgeCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badgeCount}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
});

export default BadgeIcon;