import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

interface Props {
  text: string,
  buttonColor: any,
  textColor: any,
  containsStyle?: any
  onClick: () => void
}

const Button: React.FC<Props> = ({ text, buttonColor = {}, textColor = {}, ...props }) => {
  return (
    <View style={[{ flex: 1 }, props.containsStyle]}>
      <TouchableOpacity onPress={props.onClick}>
        <View style={[styles.btn, { backgroundColor: buttonColor }]}>
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: 280,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
  },
});
