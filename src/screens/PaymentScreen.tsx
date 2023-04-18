import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../components'
import { useNavigation } from '@react-navigation/native'

const PaymentScreen = () => {
    const navigation = useNavigation<any>();
    const handlerBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <Header label='Payment' onBack={handlerBack} />
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})