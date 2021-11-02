import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import React from 'react';

export type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = ({title, style, ...otherProps}: ButtonProps) => {
  return (
    <TouchableOpacity {...otherProps} style={[styles.container, style]}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'tomato',
    borderRadius: 4,
  },
  titleStyle: {},
});
