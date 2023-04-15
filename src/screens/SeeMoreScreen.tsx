import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { Header, Icon } from '../components'
import { useNavigation } from '@react-navigation/native'
import { Icons } from '../components/Icon'
import { ItemLarge } from '../Item'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface smProps {
    route: any
}
const SeeMoreScreen: React.FC<smProps> = ({ route }) => {
    const navigation = useNavigation<any>();
    const icon = <Icon type={Icons.Ionicons} name='cart-outline' color='black' size={25} />
    const handlerBack = (): void => {
        navigation.goBack();
    }
    const category = useSelector((state: RootState) => state.categoriesSlice)
    const product = useSelector((state: RootState) => {
        const products = state.productSlice.data.filter((item: any) => {
            return item.id_theloai._id === category.cateSelect;
        })
        return products
    })
    const handlerCart = (): void => {
        navigation.navigate("CartScreen")
    }
    const handlerDetails = () => {
        navigation.navigate("DetailsScreen")
    }
    return (
        <View style={styles.container}>
            <Header label={category.nameSelect} onBack={handlerBack} icon={icon} onSub={handlerCart} />
            <FlatList
                data={product}
                renderItem={({ item }) => <ItemLarge item={item} navi={handlerDetails} />}
                style={styles.flat} />
        </View>
    )
}

export default SeeMoreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flat: {
        paddingStart: 10,
        paddingTop: 15,
    }
})