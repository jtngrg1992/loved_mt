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
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useImperativeHandle, useRef, useState} from 'react';

import {BottomSheetOption} from './bottom-sheet-option.component';
import {BottomSheetProps} from '.';
import {BottomSheetRef} from './types';
import {Colors} from '../../utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HIDDEN_UNDERLAY_COLOR = Colors.TRANSPARENT;
const DEFAULT_UNDERLAY_COLOR = Colors.TRANSLUCENT_BLACK;
const UDERLAY_SOLID_COLOR = Colors.GREY;

const EDGE_RADIUS = 20;

const UNDERLAY_COLORS = [
  HIDDEN_UNDERLAY_COLOR,
  DEFAULT_UNDERLAY_COLOR,
  UDERLAY_SOLID_COLOR,
];

export const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  ({options, onSelectOption}, ref) => {
    const windowHeight = useWindowDimensions().height;
    const spacerHeight = useRef<number>(0);
    const pinContainerHeight = useRef<number>(0);

    const top = useSharedValue(windowHeight);
    const pinContainerOpacity = useSharedValue(1);
    const underlayColorIndex = useSharedValue(0);
    const roundedEdges = useSharedValue(EDGE_RADIUS);

    const bottom = useSafeAreaInsets().bottom;
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
          [0, 1, 2],
          UNDERLAY_COLORS,
        ),
      };
    });

    const animatedRoundedEdges = useAnimatedStyle(() => {
      return {
        borderTopLeftRadius: withTiming(roundedEdges.value, {duration: 200}),
        borderTopRightRadius: withTiming(roundedEdges.value, {duration: 200}),
      };
    });

    const pinContainerAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(pinContainerOpacity.value, {duration: 400}),
      };
    });

    const handleSpacerLayout = useCallback((event: LayoutChangeEvent) => {
      spacerHeight.current = event.nativeEvent.layout.height;
    }, []);

    const handlePinContainerLayout = useCallback((event: LayoutChangeEvent) => {
      pinContainerHeight.current = event.nativeEvent.layout.height;
    }, []);

    const setUnderlayColorIndex = useCallback((i: number) => {
      underlayColorIndex.value = withTiming(i, {
        duration: 500,
        easing: Easing.inOut(Easing.cubic),
      });
    }, []);

    const openMe = useCallback(() => {
      top.value = spacerHeight.current;
      pinContainerOpacity.value = 1;
      setUnderlayColorIndex(1);
      setPointerEvents('auto');
    }, [setUnderlayColorIndex]);

    const dismissMe = useCallback(() => {
      top.value = windowHeight;
      setUnderlayColorIndex(0);
      setPointerEvents('none');
    }, [setUnderlayColorIndex]);

    const snapMeFull = useCallback(() => {
      top.value = -pinContainerHeight.current;
      pinContainerOpacity.value = 0;
      setUnderlayColorIndex(2);
    }, []);

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
        top.value = moveVal;

        const p = (windowHeight - top.value) / windowHeight;
        roundedEdges.value = (1 - p) * EDGE_RADIUS;
      },
      onEnd() {
        if (top.value > 0.7 * windowHeight) {
          runOnJS(dismissMe)();
        } else if (top.value <= 0.2 * windowHeight) {
          runOnJS(snapMeFull)();
        } else {
          runOnJS(openMe)();
        }
      },
    });

    return (
      <View style={styles.absoluteFill} pointerEvents={pointerEvents}>
        <Animated.View style={[styles.absoluteFill, animatedUnderlayColor]}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              dismissMe();
            }}
          />
        </Animated.View>

        <View style={[styles.absoluteFill]}></View>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[{flex: 1}, animatedStyle]}>
            <Animated.View
              onLayout={handlePinContainerLayout}
              style={[styles.pinContainer, pinContainerAnimatedStyle]}>
              <View style={styles.pin} />
            </Animated.View>

            <Animated.View
              style={[styles.innerContainer, animatedRoundedEdges]}>
              <View style={{marginBottom: bottom, backgroundColor: 'white'}}>
                {options.map((option, optionIndex) => (
                  <BottomSheetOption
                    onPress={() => onSelectOption(option)}
                    key={optionIndex}
                    option={option}
                    isFirst={optionIndex === 0}
                    isLast={optionIndex === options.length - 1}
                  />
                ))}
              </View>
            </Animated.View>
            <View style={styles.spacer} onLayout={handleSpacerLayout} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  absoluteFill: {
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
    overflow: 'hidden',
    backgroundColor: Colors.GREY,
  },
  pinContainer: {
    alignItems: 'center',
    paddingBottom: 6,
  },
  pin: {
    backgroundColor: Colors.GREY,
    width: 80,
    height: 8,
    borderRadius: 4,
  },
  spacer: {backgroundColor: Colors.GREY, flex: 1},
});
