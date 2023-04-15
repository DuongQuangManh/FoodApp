import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import { Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Icon } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { URL, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils';
import { Icons } from '../components/Icon';

const DetailsScreen = () => {
    const navigation = useNavigation<any>();
    const product: any = useSelector((state: RootState) => state.detailSlice.product)
    const icon = <Icon type={Icons.Ionicons} name='heart-outline' color={Colors.BACKGROUND_COLOR} size={25} />
    const handlerAddToCart = () => {
    };
    const handlerBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <Header label='Detail' onBack={handlerBack} icon={icon} />
            <View style={styles.containImg}>
                <Image source={{ uri: `${URL}/images/${product.img}` }} style={{ width: WINDOW_WIDTH - 10, height: WINDOW_HEIGHT / 3, borderRadius: 18, }} />
            </View>
            <ScrollView style={{ flex: 1, width: '100%', padding: 10 }}>
                <Text style={styles.label}>
                    Tên món: <Text style={styles.text}>{product.name}</Text>
                </Text>
                <Text style={styles.label}>
                    Giá: <Text style={[styles.text, styles.colorRed]}>{product.price} <Text style={[styles.vnd, styles.colorRed]}>VNĐ</Text></Text>
                </Text>
                <Text style={styles.label}>
                    Category: <Text style={styles.text}>{product.id_theloai.name}</Text>
                </Text>
                <Text style={styles.label}>
                    Description: <Text style={styles.text}>{product.description}</Text>
                </Text>
            </ScrollView>
            <View style={styles.boxbtn}>
                <Button
                    buttonColor={Colors.BACKGROUND_COLOR}
                    text="Add To Cart"
                    textColor={Colors.WHITE_COLOR}
                    onClick={handlerAddToCart}
                />
            </View>
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GRAY_COLOR,
    },
    boxbtn: {
        width: WINDOW_WIDTH,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
    },
    text: {
        fontWeight: '400',
        fontSize: 20,
    },
    vnd: {
        fontSize: 14
    },
    colorRed: {
        color: "red"
    },
    containImg: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT / 3,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});
