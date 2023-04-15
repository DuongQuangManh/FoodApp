import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../constants'
import Spinner from 'react-native-spinkit'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils'

const Loading = () => {
  return (
    <View style={styles.container}>
      <Spinner type='Circle' size={70} color={Colors.BACKGROUND_COLOR} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 5,
    backgroundColor: 'black',
    opacity: 0.7,
  },
})