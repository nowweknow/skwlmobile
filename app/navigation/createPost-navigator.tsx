import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MockStack} from 'app/navigation/constans';
import {MockScreen} from 'screens';

export const MockNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name={MockStack.mockScreen} component={MockScreen} />
    </Stack.Navigator>
  );
};
