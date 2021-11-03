import {
  BottomSheet,
  BottomSheetOption,
  BottomSheetRef,
  Button,
} from '../../commons';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from '../../utils';
import {RootStackParams} from '../../navigation/root.navigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {dummyBottomSheetOptions} from '../../constants';
import {useNavigation} from '@react-navigation/core';

export default React.memo(() => {
  const _bottomSheet = useRef<BottomSheetRef>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const handleOpenSheet = useCallback(() => {
    _bottomSheet.current?.open();
  }, []);

  const handleOptionSelection = useCallback((option: BottomSheetOption) => {
    _bottomSheet.current?.dismiss();
    navigation.push('screenB');
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Button
          title="Open Sheet"
          style={styles.button}
          onPress={handleOpenSheet}
        />
      </View>
      <BottomSheet
        ref={_bottomSheet}
        options={dummyBottomSheetOptions}
        onSelectOption={handleOptionSelection}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_DEFAULT,
  },
  button: {
    marginTop: 50,
  },
});
