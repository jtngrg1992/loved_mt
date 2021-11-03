/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
// import 'react-native-gesture-handler';
import React from 'react';
import {RootStack} from './src/navigation';
import {name as appName} from './app.json';

const AppRoot = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => AppRoot);
