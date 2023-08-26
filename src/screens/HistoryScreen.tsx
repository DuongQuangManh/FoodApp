import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {ItemHistory, ItemStatus} from '../Item';
import {Colors, Status} from '../constants';
import {WINDOW_WIDTH} from '../utils';
import {NotYet} from '../components';
import {Icons} from '../components/Icon';
import {fetchOrder, fetchOrderMore} from '../redux/orderSlice';

const HistoryScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [start, setStart] = useState(0);
  const statusSelect = useSelector(
    (state: RootState) => state.orderSlice.statusSelect,
  );
  const user = useSelector((state: RootState) => state.userSlice.data);
  const data = useSelector((state: RootState) => state.orderSlice.data);
  const loading = useSelector(
    (state: RootState) => state.orderSlice.loadingmore,
  );
  const count = useSelector((state: RootState) => state.orderSlice.count);
  useEffect(() => {
    dispatch(fetchOrder({id: user._id, status: statusSelect}));
    setStart(5);
  }, [statusSelect]);
  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{paddingVertical: 20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return <View style={{height: 40}} />;
    }
  };
  const handlerLoadMore = () => {
    if (start < count) {
      dispatch(
        fetchOrderMore({
          id: user._id,
          status: statusSelect,
          start: start,
          limit: 5,
        }),
      );
      setStart(pre => pre + 5);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Order History</Text>
      <View style={{flex: 1, paddingTop: 10}}>
        <View style={{height: 30}}>
          <FlatList
            data={Status}
            renderItem={({item}) => <ItemStatus item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {data.length > 0 ? (
          <View>
            <FlatList
              data={data}
              renderItem={({item}: any) => <ItemHistory item={item} />}
              style={{marginTop: 10}}
              ListFooterComponent={renderFooter}
              onEndReached={() => handlerLoadMore()}
              onEndReachedThreshold={0.5}
            />
          </View>
        ) : (
          <NotYet
            content="You have not ordered any food yet"
            title="No orders yet"
            nameIcon="event-note"
            typeIcon={Icons.MaterialIcons}
            colorIcon={Colors.BACKGROUND_COLOR}
          />
        )}
      </View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  textHeader: {
    fontFamily: 'SF Pro Rounded',
    width: WINDOW_WIDTH / 2 + 20,
    height: 82,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 41,
    start: 15,
    marginTop: 40,
    color: 'black',
  },
});
