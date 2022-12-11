import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MarketPlaceScreen} from 'screens';
import {MarketStack} from 'app/navigation/constans';
import {colors} from 'theme';

export type MarketPlaceNavigatorParams = {
  MarketPlaceScreen: undefined;
};

export const MarketPlaceNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        headerTintColor: colors.red,
      }}>
      <Stack.Screen name={MarketStack.marketPlaceScreen} component={MarketPlaceScreen} />
    </Stack.Navigator>
  );
};
