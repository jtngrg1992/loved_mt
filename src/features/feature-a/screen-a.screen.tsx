import {BottomSheet, BottomSheetRef, Button} from '../../commons';
import React, {useCallback, useRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {dummyBottomSheetOptions} from '../../constants';

export default () => {
  const _bottomSheet = useRef<BottomSheetRef>(null);

  const handleOpenSheet = useCallback(() => {
    _bottomSheet.current?.open();
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
      <BottomSheet ref={_bottomSheet} options={dummyBottomSheetOptions} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: 50,
  },
});
