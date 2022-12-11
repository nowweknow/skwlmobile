import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SubscriptionScreen,
  LikedVideosScreen,
  ProfileScreen,
  SavedProductsScreen,
  SettingsScreen,
  EditProfileScreen,
  NotificationsScreen,
  ReportProblemScreen,
  MyVideoScreen,
} from 'screens';
import { ProfileStack } from 'app/navigation/constans';

export type ProfileNavigatorParams = {
  profileScreen: undefined | { userId: string };
  settingsScreen: undefined;
  editProfileScreen: undefined;
  savedProductsScreen: undefined;
  likedVideosScreen: undefined;
  subscriptionScreen: undefined;
  notificationsScreen: undefined;
  reportScreen: undefined;
  privacyScreen: undefined;
  copyrightPolicyScreen: undefined;
  logoutScreen: undefined;
  myVideoScreen: { videoId: number };
};

export const ProfileNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name={ProfileStack.profileScreen} component={ProfileScreen} />
      <Stack.Screen name={ProfileStack.settingsScreen} component={SettingsScreen} />
      <Stack.Screen name={ProfileStack.editProfileScreen} component={EditProfileScreen} />
      <Stack.Screen name={ProfileStack.savedProductsScreen} component={SavedProductsScreen} />
      <Stack.Screen name={ProfileStack.likedVideosScreen} component={LikedVideosScreen} />
      <Stack.Screen name={ProfileStack.subscriptionScreen} component={SubscriptionScreen} />
      <Stack.Screen name={ProfileStack.notificationsScreen} component={NotificationsScreen} />
      <Stack.Screen name={ProfileStack.reportScreen} component={ReportProblemScreen} />
      <Stack.Screen name={ProfileStack.myVideoScreen} component={MyVideoScreen} />
    </Stack.Navigator>
  );
};
