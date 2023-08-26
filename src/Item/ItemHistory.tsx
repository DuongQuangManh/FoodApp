import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH} from '../utils';
import {Colors} from '../constants';
import {Line} from '../components';
import ItemPayment from './ItemPayment';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

interface itemProps {
  item: any;
}
const ItemHistory: FC<itemProps> = ({item}) => {
  const formattedMoney = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(item.sumpay);
  const sumCountProduct = item.listitem.reduce((total: number, item: any) => {
    return total + item.quantity;
  }, 0);
  const loading = useSelector((state: RootState) => state.orderSlice.loading);
  console.log('đây là số sản phẩm:' + sumCountProduct);
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        visible={!loading}
        LinearGradient={LinearGradient}
        width={WINDOW_WIDTH - 30}
        height={120}
        style={{borderRadius: 12}}>
        <FlatList
          data={item.listitem}
          renderItem={({item}) => <ItemPayment item={item} />}
        />
      </ShimmerPlaceholder>

      <Line marginTop={20} />
      <View style={{flex: 1}}>
        <View style={styles.box1}>
          <ShimmerPlaceholder
            visible={!loading}
            LinearGradient={LinearGradient}
            width={100}>
            <Text>{`${sumCountProduct} sản phẩm`}</Text>
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            visible={!loading}
            LinearGradient={LinearGradient}
            width={150}>
            <Text
              style={{
                color: 'red',
                fontWeight: '600',
              }}>{`Thành tiền: ${formattedMoney}`}</Text>
          </ShimmerPlaceholder>
        </View>
      </View>
    </View>
  );
};

export default ItemHistory;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH - 10,
    backgroundColor: Colors.WHITE_COLOR,
    padding: 10,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
    alignSelf: 'center',
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
});
