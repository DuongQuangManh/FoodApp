import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../constants';
import {Icon} from '../components';
import {Icons} from '../components/Icon';
import {URL} from '../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {addDetail} from '../redux/productSlice';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
interface itemProps {
  item: any;
  navi: () => void;
}
const ItemLarge: React.FC<itemProps> = ({item, navi}) => {
  const formattedMoney = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(item.price);
  const dispatch = useDispatch<AppDispatch>();
  const handlerClickItem = () => {
    dispatch(addDetail(item));
    navi();
  };
  const loading = useSelector((state: RootState) => state.productSlice.loading);
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlerClickItem}>
      <View style={styles.containerItem}>
        <LinearGradient
          style={styles.containerTextItem}
          colors={['#f4f6f8', '#d5d6d7']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}>
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
            <ShimmerPlaceholder
              visible={!loading}
              LinearGradient={LinearGradient}
              width={80}>
              <Text
                style={{
                  letterSpacing: 1,
                  fontWeight: '600',
                  paddingStart: 10,
                  paddingEnd: 10,
                }}>
                {item.id_theloai.name}
              </Text>
            </ShimmerPlaceholder>
          </View>
          <View style={{marginTop: 70, width: 200}}>
            <ShimmerPlaceholder
              visible={!loading}
              LinearGradient={LinearGradient}>
              <Text
                style={{
                  fontWeight: '700',
                  color: 'black',
                  fontSize: 25,
                }}>
                {item.name}
              </Text>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              visible={!loading}
              LinearGradient={LinearGradient}
              width={100}
              style={{marginTop: 10}}>
              <Text
                style={{
                  fontWeight: '700',
                  color: 'red',
                  fontSize: 18,
                  marginTop: 15,
                }}>
                {formattedMoney}
              </Text>
            </ShimmerPlaceholder>

            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon type={Icons.Entypo} name="shop" color="black" size={20} />
              <ShimmerPlaceholder
                visible={!loading}
                LinearGradient={LinearGradient}
                width={140}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 16,
                    marginStart: 10,
                  }}>
                  {item.id_cuahang.name}
                </Text>
              </ShimmerPlaceholder>
            </View>
          </View>
        </LinearGradient>
        <ShimmerPlaceholder
          visible={!loading}
          LinearGradient={LinearGradient}
          width={140}
          style={[
            styles.imgItem,
            {
              position: 'absolute',
              right: -30,
              width: 188,
              height: 188,
              zIndex: 10,
            },
          ]}>
          <Image
            source={{uri: `${URL}/images/${item.img}`}}
            style={styles.imgItem}
          />
        </ShimmerPlaceholder>

        <View style={{width: '5%', backgroundColor: Colors.GRAY_COLOR}}></View>
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
    borderWidth: 1,
    borderColor: Colors.WHITE_COLOR,
    backgroundColor: Colors.WHITE_COLOR,
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
