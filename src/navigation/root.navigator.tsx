import {Colors, Font} from '../utils';
import {ScreenA, ScreenB} from '../features';

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParams = {
  screenA: undefined;
  screenB: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTitleStyle: {
          fontFamily: Font.regular,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="screenA"
        component={ScreenA}
        options={{
          title: 'Screen A',
        }}
      />
      <Stack.Screen
        name="screenB"
        component={ScreenB}
        options={{
          title: 'Screen B',
        }}
      />
    </Stack.Navigator>
  );
};
