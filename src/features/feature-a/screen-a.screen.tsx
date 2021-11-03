import {
  BottomSheet,
  BottomSheetOption,
  BottomSheetRef,
  Button,
} from '../../commons';
import React, {useCallback, useRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {dummyBottomSheetOptions} from '../../constants';

export default () => {
  const _bottomSheet = useRef<BottomSheetRef>(null);

  const handleOpenSheet = useCallback(() => {
    _bottomSheet.current?.open();
  }, []);

  const handleOptionSelection = useCallback((option: BottomSheetOption) => {
    _bottomSheet.current?.dismiss();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Button
          title="Open Sheet"
          style={styles.button}
          onPress={handleOpenSheet}
        />
      </SafeAreaView>
      <BottomSheet
        ref={_bottomSheet}
        options={dummyBottomSheetOptions}
        onSelectOption={handleOptionSelection}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 50,
  },
});
