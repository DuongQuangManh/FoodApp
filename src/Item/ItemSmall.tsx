import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants';
import { Icon } from '../components';
import { Icons } from '../components/Icon';
import { WINDOW_WIDTH } from '../utils';
import { URL } from '../utils/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addDetail } from '../redux/productSlice';

interface itemProps {
    item: any,
    navi: () => void
}
const ItemSmall: React.FC<itemProps> = ({ item, navi }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handlerClickItem = () => {
        dispatch(addDetail(item))
        navi();
    };
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={handlerClickItem}>
            <View style={styles.containerItem}>
                <View style={styles.box1Item}></View>
                <View style={styles.box2Item}>
                    <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: '600',
                            color: 'red',
                            marginTop: 15,
                        }}>
                        {item.price}
                    </Text>
                    <View style={styles.box3Item}>
                        <View style={styles.containerShop}>
                            <Icon type={Icons.Entypo} name='shop' color='black' size={20} />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '400',
                                    marginStart: 10,
                                }}>
                                xxx
                            </Text>
                        </View>

                        <View style={styles.containerShop}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: 'gray',
                                    marginStart: 10,
                                }}>
                                sold: <Text>xx</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <Image source={{ uri: `${URL}/images/${item.img}` }} style={styles.imageItem} />
            </View>
        </TouchableOpacity>
    );
};

export default ItemSmall;

const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: Colors.GRAY_COLOR,
        width: WINDOW_WIDTH / 2 - 15,
        height: 260,
        borderRadius: 20,
        alignItems: 'center',
        marginEnd: 20,
    },
    imageItem: {
        width: WINDOW_WIDTH / 2 - 55,
        height: WINDOW_WIDTH / 2 - 55,
        borderRadius: 180,
        position: 'absolute',
        top: 0,
        borderColor: Colors.WHITE_COLOR,
        borderWidth: 3,
        zIndex: 10,
    },
    box1Item: {
        width: '100%',
        height: '20%',
        backgroundColor: Colors.GRAY_COLOR,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    box2Item: {
        width: '100%',
        height: '80%',
        backgroundColor: Colors.WHITE_COLOR,
        borderRadius: 20,
        paddingTop: 90,
        alignItems: 'center',
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
    box3Item: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerShop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
});
