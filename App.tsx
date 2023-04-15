import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SplashScreen } from './src/screens'
import StackNavi from './src/navigations'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
function App(): JSX.Element {

  return (
    <Provider store={store}>
      <StackNavi />
    </Provider>
  );
}

const styles = StyleSheet.create({

});

export default App;
