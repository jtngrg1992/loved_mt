import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';

import {BottomSheetOptionProps} from './types';
import {Font} from '../../utils';

export const BottomSheetOption = ({
  option,
  isFirst,
  isLast,
}: BottomSheetOptionProps) => {
  const showGap = useMemo(() => {
    return !isLast;
  }, [isFirst, isLast]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginBottom: showGap ? 1 : 0,
        },
      ]}>
      <View style={styles.imageContainer}>
        <Image source={option.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{option.title}</Text>
        {option.subtitle && (
          <Text style={styles.subtitle}>{option.subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(245,245,245)',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    height: 60,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: Font.semiBold,
  },
  subtitle: {
    fontSize: 12,
    color: 'grey',
    fontFamily: Font.semiBold,
    marginTop: 1,
  },
});
