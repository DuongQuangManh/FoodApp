import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Icon} from '../components';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '../components/Icon';
import {ItemLarge} from '../Item';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {fetchProductFull} from '../redux/productSlice';
interface smProps {
  route: any;
}
const SeeMoreScreen: React.FC<smProps> = ({route}) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const [limit, setLimit] = useState(3);
  const icon = (
    <Icon type={Icons.Ionicons} name="cart-outline" color="black" size={25} />
  );
  const handlerBack = (): void => {
    navigation.goBack();
  };
  const category = useSelector((state: RootState) => state.categoriesSlice);
  const product = useSelector((state: RootState) => state.productSlice.data);
  const loadding = useSelector(
    (state: RootState) => state.productSlice.loading,
  );
  const count = useSelector((state: RootState) => state.productSlice.count);
  useEffect(() => {
    dispatch(fetchProductFull({id: category.cateSelect, limit: limit}));
  }, [category.cateSelect, limit]);

  const handlerCart = (): void => {
    navigation.navigate('CartScreen');
  };
  const handlerDetails = () => {
    navigation.navigate('DetailsScreen');
  };
  const renderFooter = () => {
    if (loadding) {
      return (
        <View style={{paddingVertical: 20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <Header
        label={category.nameSelect}
        onBack={handlerBack}
        icon={icon}
        onSub={handlerCart}
      />
      <FlatList
        data={product}
        renderItem={({item}) => <ItemLarge item={item} navi={handlerDetails} />}
        style={styles.flat}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (limit < count) {
            setLimit(pre => pre + 1);
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default SeeMoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flat: {
    paddingStart: 10,
    paddingTop: 15,
  },
});
