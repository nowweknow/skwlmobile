import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SVGIcon} from 'components';
import {colors} from 'theme';
import {AppNavigatorParams, HomeNavigator, InboxNavigator, MarketPlaceNavigator, MockNavigator, ProfileNavigator} from 'navigation';
import {BottomTabStack, HomeStack, SliderStack} from 'app/navigation/constans';
import {BottomPopup} from 'app/screens/createPostMenu/bottomPopup';
import {navigationRef} from 'app/navigation/RootNavigation';
import {useSelector} from 'hooks';

import * as S from './styles';

export type BottomTabsParam = {
  homeTab: undefined;
  marketTab: undefined;
  createPostTab: undefined;
  inboxTab: undefined;
  profileTab: undefined;
};

export const BottomTabs = () => {
  const ref = useRef(null);
  const Tab = createBottomTabNavigator<BottomTabsParam>();
  const route = navigationRef?.current?.getCurrentRoute();
  const insets = useSafeAreaInsets();
  const {navigate} = useNavigation<NativeStackNavigationProp<AppNavigatorParams>>();
  const isLogged = useSelector(state => state.auth.isLogged);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: S.ITEM_BOTTOM_TABS,
        tabBarStyle: [
          S.BOTTOM_TABS,
          {
            paddingBottom: insets.bottom ? 20 : 10,
          },
        ],
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => null,
      }}>
      <Tab.Screen
        name={BottomTabStack.homeTab}
        component={HomeNavigator}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(HomeStack.trendingScreen);
          },
        })}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={S.ICONBOX_BASE}>
              <SVGIcon name={'homeTab'} size={48} color={focused && route?.name !== HomeStack.publishPostScreen ? colors.black : colors.grey1} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabStack.marketTab}
        component={MarketPlaceNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={S.ICONBOX_MARKETPLACE}>
              <SVGIcon name={'basketTab'} width={60} height={48} color={focused ? colors.black : colors.grey1} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabStack.createPostTab}
        component={MockNavigator}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            if (!isLogged) {
              navigate(SliderStack.signUpScreen);
            }
          },
        }}
        options={{
          tabBarIcon: () => (
            <View style={S.ICONBOX_CREATE_POST}>
              <BottomPopup ref={ref} isDisabled={!isLogged} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabStack.inboxTab}
        component={InboxNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={S.ICONBOX_MARKETPLACE}>
              <SVGIcon name={'inboxTab'} width={60} height={48} color={focused ? colors.black : colors.grey1} />
            </View>
          ),
        }}
        listeners={{
          tabPress: e => {
            if (!isLogged) {
              e.preventDefault();
              navigate(SliderStack.signUpScreen);
            }
          },
        }}
      />
      <Tab.Screen
        name={BottomTabStack.profileTab}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={S.ICONBOX_BASE}>
              <SVGIcon name={'profileTab'} size={48} color={focused ? colors.black : colors.grey1} />
            </View>
          ),
        }}
        listeners={{
          tabPress: e => {
            if (!isLogged) {
              e.preventDefault();
              navigate(SliderStack.signUpScreen);
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
