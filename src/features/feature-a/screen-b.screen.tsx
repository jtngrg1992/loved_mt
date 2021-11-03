import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button} from '../../commons';
import {Colors} from '../../utils';
import {useNavigation} from '@react-navigation/core';

export default React.memo(() => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Take me Back" onPress={handleBack} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DEFAULT,
    paddingTop: 50,
    alignItems: 'center',
  },
});
