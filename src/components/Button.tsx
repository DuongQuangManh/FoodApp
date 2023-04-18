import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

interface Props {
  text: string,
  buttonColor: any,
  textColor: any,
  containsStyle?: any
  width?: number,
  height?: number,
  borderRadius?: number
  onClick: () => void
}

const Button: React.FC<Props> = ({ text, buttonColor = {}, textColor = {}, width = 280, height = 50, borderRadius = 12, ...props }) => {
  return (
    <View style={props.containsStyle}>
      <TouchableOpacity onPress={props.onClick}>
        <View style={[styles.btn, { backgroundColor: buttonColor, width: width, height: height, borderRadius: borderRadius }]}>
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
  },
});
