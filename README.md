## Animated Bottom Sheet With Pan Gesture

---

- Generic drop in bottom sheet created in React Native.
- This uses `react-native-reanimated2` and `react-native-gesture-handler` to acheive natural interactions
  that you would expect your bottom sheet to have.
- Compatible with android and iOS.

## Usage

---

```
    <BottomSheet
        ref={_bottomSheet}
        options={<your options>}
        onSelectOption={(option) => {}}
    />
```
