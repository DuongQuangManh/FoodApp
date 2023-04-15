import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants';
import { Icon } from '../components';
import { Icons } from '../components/Icon';
import { URL } from '../utils/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addDetail } from '../redux/detailSlice';
var API = require('../../requestAPI/index');

interface itemProps {
    item: any,
    navi: () => void
}
const ItemLarge: React.FC<itemProps> = ({ item, navi }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handlerClickItem = () => {
        dispatch(addDetail(item))
        navi();
    };
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={handlerClickItem}>
            <View style={styles.containerItem}>
                <LinearGradient
                    style={styles.containerTextItem}
                    colors={['#f4f6f8', '#d5d6d7']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}>
                    <View
                        style={{
                            position: 'absolute',
                            top: 20,
                            start: 40,
                            zIndex: 2,
                            flexWrap: 'wrap',
                            padding: 5,
                            backgroundColor: Colors.WHITE_COLOR,
                            borderRadius: 9,
                        }}>
                        <Text
                            style={{
                                letterSpacing: 1,
                                fontWeight: '600',
                                paddingStart: 10,
                                paddingEnd: 10,
                            }}>
                            xxx
                        </Text>
                    </View>
                    <View style={{ marginTop: 70, width: 200 }}>
                        <Text
                            style={{
                                fontWeight: '700',
                                color: 'black',
                                fontSize: 25,
                            }}>
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                fontWeight: '700',
                                color: 'red',
                                fontSize: 18,
                                marginTop: 15,
                            }}>
                            {item.price}
                        </Text>
                        <View
                            style={{
                                marginTop: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Icon type={Icons.Entypo} name='shop' color='black' size={20} />
                            <Text
                                style={{
                                    fontWeight: '700',
                                    fontSize: 16,
                                    marginStart: 10,
                                }}>
                                xxxx
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                <Image
                    source={{ uri: `${URL}/images/${item.img}` }}
                    style={styles.imgItem}
                />

                <View style={{ width: '5%', backgroundColor: Colors.GRAY_COLOR }}></View>
            </View>
        </TouchableOpacity>
    );
};

export default ItemLarge;

const styles = StyleSheet.create({
    containerItem: {
        width: '100%',
        height: 200,
        margin: 5,
        borderRadius: 12,
        zIndex: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.GRAY_COLOR,
    },
    imgItem: {
        width: 185,
        height: 185,
        borderRadius: 180,
        borderWidth: 2,
        borderColor: Colors.WHITE_COLOR,
        backgroundColor: Colors.WHITE_COLOR,
        position: 'absolute',
        right: -30,
        zIndex: 10,
    },
    containerTextItem: {
        width: '95%',
        height: '100%',
        backgroundColor: Colors.WHITE_COLOR,
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
});
