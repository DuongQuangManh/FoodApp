import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';
import {Icon} from '../components';
import {Icons} from '../components/Icon';
import {WINDOW_WIDTH} from '../utils';
import {URL} from '../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {addDetail} from '../redux/productSlice';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
interface itemProps {
  item: any;
  navi: () => void;
}
const ItemSmall: React.FC<itemProps> = ({item, navi}) => {
  const formattedMoney = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(item.price);
  const dispatch = useDispatch<AppDispatch>();
  const loadding = useSelector(
    (state: RootState) => state.productSlice.loading,
  );
  const handlerClickItem = () => {
    dispatch(addDetail(item));
    navi();
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlerClickItem}>
      <View style={styles.containerItem}>
        <View style={styles.box1Item}></View>
        <View style={styles.box2Item}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            visible={!loadding}
            width={100}
            height={25}
            style={{borderRadius: 7}}>
            <Text style={{fontSize: 20, fontWeight: '800', color: 'black'}}>
              {item.name}
            </Text>
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            visible={!loadding}
            width={140}
            height={25}
            style={{borderRadius: 7, marginTop: 15}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: 'red',
                marginTop: 15,
              }}>
              {formattedMoney}
            </Text>
          </ShimmerPlaceholder>

          <View style={styles.box3Item}>
            <View style={styles.containerShop}>
              <Icon type={Icons.Entypo} name="shop" color="black" size={20} />
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                visible={!loadding}
                width={50}
                height={25}
                style={{borderRadius: 7}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    marginStart: 10,
                  }}>
                  {item.id_cuahang.name}
                </Text>
              </ShimmerPlaceholder>
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
        <ShimmerPlaceholder
          visible={!loadding}
          LinearGradient={LinearGradient}
          style={[
            {
              width: WINDOW_WIDTH / 2 - 50,
              height: WINDOW_WIDTH / 2 - 50,
              borderRadius: 180,
              position: 'absolute',
              top: 0,
            },
          ]}>
          <Image
            source={{uri: `${URL}/images/${item.img}`}}
            style={styles.imageItem}
          />
        </ShimmerPlaceholder>
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
    marginTop: 10,
  },
});
