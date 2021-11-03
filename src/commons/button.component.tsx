import {Colors, Font} from '../utils';
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

export const Button = React.memo(
  ({title, style, ...otherProps}: ButtonProps) => {
    return (
      <TouchableOpacity {...otherProps} style={[styles.container, style]}>
        <Text style={styles.titleStyle}>{title}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: Font.bold,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});
