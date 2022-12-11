import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {InboxDialogScreen, InboxScreen} from 'screens';
import {InboxStack} from 'app/navigation/constans';

export type InboxNavigatorParams = {
  inboxScreen: undefined;
  inboxDialogScreen: {id: number; name: string};
};

export const InboxNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name={InboxStack.inboxScreen} component={InboxScreen} />
      <Stack.Screen name={InboxStack.inboxDialogScreen} component={InboxDialogScreen} />
    </Stack.Navigator>
  );
};
