import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TrendingScreen, FollowingScreen, NewScreen, TagScreen, PublishPost, WatchVideoScreen, ViewUserProfileScreen, InboxDialogScreen, InboxScreen } from 'screens';
import { HomeStack, InboxStack } from 'app/navigation/constans';
import { RouteProp } from '@react-navigation/native';
export type HomeNavigatorParams = {
  newScreen: undefined;
  trendingScreen?: { sharedVideoId?: number };
  followingScreen: undefined;
  tagScreen: {tag:string};

  publishPostScreen: { path: string };
  viewUserProfileScreen: { userId: number }
  watchVideo: { videoId: number }
};

export type HomeStackRouteProps<RouteName extends keyof HomeNavigatorParams> =
  RouteProp<HomeNavigatorParams, RouteName>

export const HomeNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name={HomeStack.trendingScreen} component={TrendingScreen} />
      <Stack.Screen name={HomeStack.newScreen} component={NewScreen} />
      <Stack.Screen name={HomeStack.tagScreen} component={TagScreen} />
      <Stack.Screen name={HomeStack.followingScreen} component={FollowingScreen} />

      <Stack.Screen name={HomeStack.publishPostScreen} component={PublishPost} />
      <Stack.Screen name={HomeStack.viewUserProfileScreen} component={ViewUserProfileScreen}/>
      <Stack.Screen name={HomeStack.watchVideoScreen} component={WatchVideoScreen} />
      <Stack.Screen name={InboxStack.inboxDialogScreen} component={InboxDialogScreen} />
      <Stack.Screen name={InboxStack.inboxScreen} component={InboxScreen} />
    </Stack.Navigator>
  );
};
