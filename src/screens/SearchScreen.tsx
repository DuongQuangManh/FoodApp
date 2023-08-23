import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from '../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {ItemLarge} from '../Item';
import {WINDOW_WIDTH} from '../utils';
import {Colors} from '../constants';
import {searchProduct} from '../redux/productSlice';

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector(
    (state: RootState) => state.productSlice.txtSearch,
  );
  const [txt, setTxt] = useState(search);
  const [limit, setLimit] = useState(5);
  const product = useSelector((state: RootState) => state.productSlice.data);
  const count = useSelector((state: RootState) => state.productSlice.count);
  const loading = useSelector((state: RootState) => state.productSlice.loading);
  useEffect(() => {
    const obj = {
      name: txt,
      limit: limit,
    };
    dispatch(searchProduct(obj));
  }, [limit, txt]);

  const handlerDetails = () => {
    navigation.navigate('DetailsScreen');
  };
  const handlerBack = () => {
    navigation.goBack();
  };
  const renderFooter = () => {
    if (loading) {
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
      <Header label="Search" onBack={handlerBack} />
      <View style={styles.box1}>
        <TextInput
          value={txt}
          style={styles.inputSearch}
          onChangeText={text => setTxt(text)}
          placeholder="Search"
        />
      </View>
      <FlatList
        data={product}
        renderItem={({item}) => <ItemLarge item={item} navi={handlerDetails} />}
        style={{marginTop: 10}}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (limit < count) {
            setLimit(pre => pre + 5);
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    width: WINDOW_WIDTH,
    height: 50,
    padding: 5,
  },
  inputSearch: {
    width: WINDOW_WIDTH - 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    paddingStart: 10,
    backgroundColor: Colors.WHITE_COLOR,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});
