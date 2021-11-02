/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import 'react-native-gesture-handler';
import React from 'react';
import {ScreenA} from './src/features';
import {name as appName} from './app.json';

const AppRoot = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <ScreenA />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => AppRoot);
