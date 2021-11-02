import {SafeAreaView, StyleSheet} from 'react-native';

import {Button} from '../../commons';
import React from 'react';

export default () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Button title="Open Sheet" />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
