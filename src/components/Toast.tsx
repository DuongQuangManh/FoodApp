import React, { useRef, useEffect, FC } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface itemProps {
    message: string
}

const Toast: FC<itemProps> = ({ message }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    },
    toastText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Toast;
