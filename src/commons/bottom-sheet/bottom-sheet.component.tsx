import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useImperativeHandle, useRef, useState} from 'react';

import {BottomSheetOption} from './bottom-sheet-option.component';
import {BottomSheetProps} from '.';
import {BottomSheetRef} from './types';

const HIDDEN_UNDERLAY_COLOR = 'rgba(0,0,0,0)';
const DEFAULT_UNDERLAY_COLOR = 'rgba(0,0,0,0.5)';

const UNDERLAY_COLORS = [HIDDEN_UNDERLAY_COLOR, DEFAULT_UNDERLAY_COLOR];

export const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  ({options}, ref) => {
    const contentHeight = useRef<number>(0);
    const windowHeight = useWindowDimensions().height;

    const top = useSharedValue(windowHeight);
    const underlayColorIndex = useSharedValue(0);

    const [pointerEvents, setPointerEvents] = useState<'none' | 'auto'>('none');

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withSpring(top.value, {
              damping: 80,
              overshootClamping: true,
              restDisplacementThreshold: 0.1,
              restSpeedThreshold: 0.1,
              stiffness: 500,
            }),
          },
        ],
      };
    });

    const animatedUnderlayColor = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          underlayColorIndex.value,
          [0, 1],
          UNDERLAY_COLORS,
        ),
      };
    });

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const componentHeight = event.nativeEvent.layout.height;
      top.value = componentHeight;
      contentHeight.current = top.value;
    }, []);

    const setUnderlayColorIndex = useCallback((i: number) => {
      underlayColorIndex.value = withTiming(i, {
        duration: 500,
        easing: Easing.inOut(Easing.cubic),
      });
    }, []);

    const openMe = useCallback(() => {
      top.value = 0;
      setUnderlayColorIndex(1);
      runOnJS(setPointerEvents)('auto');
    }, [setUnderlayColorIndex]);

    const dismissMe = useCallback(() => {
      top.value = contentHeight.current;
      setUnderlayColorIndex(0);
      runOnJS(setPointerEvents)('none');
    }, [setUnderlayColorIndex]);

    useImperativeHandle(ref, () => ({
      open: openMe,
      dismiss: dismissMe,
    }));

    const gestureHandler = useAnimatedGestureHandler<
      GestureEvent<PanGestureHandlerEventPayload>,
      Record<string, number>
    >({
      onStart: (_, context) => {
        context.topVal = top.value;
      },
      onActive: (event, context) => {
        const moveVal = context.topVal + event.translationY;
        if (moveVal < 0) {
          return;
        }
        top.value = moveVal;
      },
      onEnd() {
        if (top.value > 0.3 * contentHeight.current) {
          runOnJS(dismissMe)();
        } else {
          runOnJS(openMe)();
        }
      },
    });

    return (
      <>
        <Animated.View
          style={[styles.underlay, animatedUnderlayColor]}
          pointerEvents={pointerEvents}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              dismissMe();
            }}
          />
        </Animated.View>

        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[styles.container, animatedStyle]}
            onLayout={handleLayout}>
            <View style={styles.pinContainer}>
              <View style={styles.pin} />
            </View>

            <SafeAreaView style={styles.innerContainer}>
              {options.map((option, optionIndex) => (
                <BottomSheetOption
                  key={optionIndex}
                  option={option}
                  isFirst={optionIndex === 0}
                  isLast={optionIndex === options.length - 1}
                />
              ))}
            </SafeAreaView>
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  },
);

const styles = StyleSheet.create({
  underlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  pinContainer: {
    alignItems: 'center',
    paddingBottom: 4,
  },
  pin: {
    backgroundColor: 'rgb(245,245,245)',
    width: 80,
    height: 8,
    borderRadius: 4,
  },
});
