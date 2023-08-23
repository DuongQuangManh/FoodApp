import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {Icon, Loading} from '../components';
import {Icons} from '../components/Icon';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {fetchCategory} from '../redux/categoriesSlice';
import {FlatList} from 'react-native-gesture-handler';
import {ItemCategory, ItemSmall} from '../Item';
import {fetchProduct, setTxtSearch} from '../redux/productSlice';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();
  const ditpatch = useDispatch<AppDispatch>();
  const handlerSearch = () => {
    ditpatch(setTxtSearch(search));
    navigation.navigate('SearchScreen');
  };
  const category = useSelector((state: RootState) => state.categoriesSlice);
  const product = useSelector(
    (state: RootState) => state.productSlice.dataPopular,
  );

  useEffect(() => {
    ditpatch(fetchProduct(category.cateSelect));
  }, [category.cateSelect]);

  const handlerSeeMore = () => {
    navigation.navigate('SeeMoreScreen');
  };
  const handlerDetails = () => {
    navigation.navigate('DetailsScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Delicious food for you</Text>
      <View style={styles.containerSearch}>
        <TextInput
          style={styles.inputSearch}
          placeholder="Search"
          onSubmitEditing={handlerSearch}
          onChangeText={text => {
            setSearch(text);
          }}
        />
        <View style={styles.iconsearch}>
          <Icon type={Icons.Ionicons} name="search" color="black" size={20} />
        </View>
      </View>
      <View style={{height: '100%', marginTop: 20, paddingTop: 40}}>
        <View style={{height: 30}}>
          <FlatList
            data={category.data}
            renderItem={({item}) => <ItemCategory item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            width: WINDOW_WIDTH,
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingStart: 20,
            paddingEnd: 20,
            marginTop: 10,
          }}>
          <Text style={[styles.textsm, {fontWeight: 'bold'}]}>
            Popular {category.nameSelect}
          </Text>
          <TouchableOpacity onPress={handlerSeeMore}>
            <Text style={[styles.textsm, {color: 'red'}]}>see more</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT / 2 - 20}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={product}
            renderItem={({item}) => (
              <ItemSmall item={item} navi={handlerDetails} />
            )}
            horizontal
            style={{paddingTop: 20, paddingStart: 5}}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  caption: {
    fontFamily: 'SF Pro Rounded',
    width: WINDOW_WIDTH / 2,
    height: 82,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 41,
    start: 35,
    marginTop: 60,
    color: 'black',
  },
  containerSearch: {
    width: '90%',
    height: 55,
    marginTop: 30,
    alignSelf: 'center',
    padding: 2,
  },
  inputSearch: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.GREY_COLOR,
    borderRadius: 20,
    paddingStart: 45,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 5,
  },
  iconsearch: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 15,
    start: 15,
  },
  textsm: {
    fontSize: 16,
  },
});
