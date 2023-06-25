import { StyleSheet, Text, TextInput, View, TextInputProps } from 'react-native';
import React from 'react';
interface Props {
  label?: string,
  extraProps: TextInputProps,
  containsStyle?: any,
  width?: number,
  height?: number,
  border?: number,
}
const FormInput: React.FC<Props> = ({ label, extraProps, width = 320, border = 8, height = 45, ...props }) => {
  return (
    <View style={props.containsStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, { width: width, height: height, borderRadius: border }]}
        {...extraProps}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 3,
    paddingStart: 10,
  },
  label: {
    fontWeight: 'bold',
    paddingStart: 5,
    fontSize: 16,
    marginTop: 5,
  },
});
