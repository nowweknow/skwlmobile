import React, { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification'
import messaging from '@react-native-firebase/messaging'
import * as RNIap from 'react-native-iap';

import { BottomTabs } from 'app/navigation/bottom-tabs';
import {
  GalleryVideo,
  LoginScreen,
  OnboardScreen,
  RecordVideo,
  SignUpScreen,
  SignUpWithNumberScreen,
  SignInWithNumberScreen,
  EnterCodeScreen,
} from 'screens';
import { CreatePostStack, SliderStack } from 'app/navigation/constans';
import { navigationRef } from 'app/navigation/RootNavigation';
import { LoginFormScreen } from 'app/screens/loginForm';
import { useDispatch, useSelector } from 'react-redux';
import { auth, profile as profileSelector } from 'app/redux/selectors';
import { onPressPush } from "app/helpers/pushNotification/onPressPush";
import { createAndroidChannel } from "app/helpers/pushNotification/createAndroidChannel";
import { openLocalNotification } from "app/helpers/pushNotification/openLocalNotification";
import { getLikedVideo } from 'app/redux/reducers/video';
import { useState } from 'react';
import { IProfile } from 'types';
import { api } from 'app/api';
import { getBrand, getDeviceId, getDeviceName, getUniqueId } from 'react-native-device-info';
import { getNotificationsSettings } from 'app/redux/reducers/profile/actionCreators';

messaging().setBackgroundMessageHandler(() => Promise.resolve({}))
PushNotification.configure({
  onNotification: onPressPush,
})

export type AppNavigatorParams = {
  sliderScreen: undefined;
  signUpScreen: undefined;
  signUpWithNumberScreen: undefined;
  signInWithNumberScreen: undefined;
  loginScreen: undefined;
  loginFormScreen: undefined;
  bottomTabs: undefined;

  recordVideoScreen: undefined;
  galleryVideoScreen: undefined;
};

const Stack = createStackNavigator();

const AppStack = () => {
  const isLogged: boolean = useSelector(auth.isLogged);
  const isOnboardingSeen: boolean = useSelector(profileSelector.isOnboardingSeen);
  const profile: IProfile | null = useSelector(profileSelector.my);
  const [fcmToken, setFcmToken] = useState<string>('')
  const dispatch = useDispatch()

  const getFcmToken = useCallback(async () => {
    const authStatus = await messaging().requestPermission()
    const permissionStatus =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    if (Platform.OS === 'android') {
      createAndroidChannel()
    }
    if (permissionStatus) {
      const fcmToken = await messaging().getToken()
      setFcmToken(fcmToken)
      console.log('fcmToken', fcmToken);
    }
  }, [])

  useEffect(() => {
    getFcmToken().then()
  }, [getFcmToken])

  useEffect(() => {
    if (fcmToken && profile?.id) {
      getDeviceName().then((deviceName: string) => {
        api.sendFcmTokenAndDeviceInfo({
          token: fcmToken,
          userId: profile.id,
          deviceId: getDeviceId(),
          deviceName,
          brand: getBrand(),
          deviceUniqueId: getUniqueId(),
        })
      });
      console.log(profile.id,"IDDDD")
    }
  }, [fcmToken, profile])

  useEffect(() => {
    if (isLogged) {
      dispatch(getLikedVideo())
      dispatch(getNotificationsSettings())
    }
  }, [isLogged])

  useEffect(() => {
    RNIap.initConnection();
    return () => {
      messaging().onMessage(openLocalNotification)
      RNIap.endConnection();
    }
  }, [])

  // useEffect(()=>{
  //   messaging().onNotificationOpenedApp(message=>console.log('message background',message))
  //   messaging().getInitialNotification().then(message=>console.log('message quit',message))
  // },[])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isOnboardingSeen && <Stack.Screen name={SliderStack.sliderScreen} component={OnboardScreen} />}
      {isLogged ? (
        <>
          <Stack.Screen name={SliderStack.bottomTabs} component={BottomTabs} />
          <Stack.Screen name={CreatePostStack.recordVideoScreen} component={RecordVideo} />
          <Stack.Screen name={CreatePostStack.galleryVideoScreen} component={GalleryVideo} />
        </>
      ) : (
        <>
          <Stack.Screen name={SliderStack.bottomTabs} component={BottomTabs} />
          <Stack.Screen name={SliderStack.signUpScreen} component={SignUpScreen} />
          <Stack.Screen name={SliderStack.signUpWithNumberScreen} component={SignUpWithNumberScreen} />
          <Stack.Screen name={SliderStack.signInWithNumberScreen} component={SignInWithNumberScreen} />
          <Stack.Screen name={SliderStack.enterCodeScreen} component={EnterCodeScreen} />
          <Stack.Screen name={SliderStack.loginScreen} component={LoginScreen} />
          <Stack.Screen name={SliderStack.loginFormScreen} component={LoginFormScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: NavigationProps) => {
  const handleNavigationRef = (ref: React.ReactNode) => {
    navigationRef.current = ref;
  };

  return (
    <NavigationContainer ref={handleNavigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
