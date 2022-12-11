import React from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {shallowEqual} from 'react-redux';

import {Button} from 'components';
import {HomeStack, SliderStack} from 'app/navigation/constans';
import {AppNavigatorParams, HomeNavigatorParams, ProfileNavigatorParams} from 'navigation';
import {useSelector} from 'hooks';

import * as S from './styles';

type NavigationTypes = {
  navigation: NativeStackNavigationProp<HomeNavigatorParams & ProfileNavigatorParams & AppNavigatorParams>;
  onTabChange?: () => void
};

export const HomeNavigation = React.memo((props: NavigationTypes) => {
  const {navigation, onTabChange} = props;
  const route = useRoute();
  const {isLogged} = useSelector(state => state.auth, shallowEqual);
  const {videos, isVideosLoaded} = useSelector(state => state.home, shallowEqual);

  const setInactiveButtonClass = route?.name === HomeStack.followingScreen && !videos?.length ? S.BTN_TEXT_GREY : S.BTN_TEXT_OPACITY;

  const setActiveFollowing = () => {
    if (route?.name === HomeStack.followingScreen && !videos?.length && isVideosLoaded) {
      return S.BTN_TEXT_ACCENT;
    } else if (route?.name === HomeStack.followingScreen && videos) {
      return S.BTN_TEXT;
    }
    return;
  };

  const navigateNew = () => {
    onTabChange && onTabChange()
    navigation.navigate(HomeStack.newScreen);
  };

  const navigateTrending = () => {
    onTabChange && onTabChange()
    navigation.navigate(HomeStack.trendingScreen);
  };
  const navigateFollowing = () => {
    onTabChange && onTabChange()
    if (!isLogged) {
      navigation.navigate(SliderStack.signUpScreen);
    }
    navigation.navigate(HomeStack.followingScreen);
  };

  return (
    <View style={S.HEADER}>
      <View style={S.BTN}>
        <Button preset="text" text={'New'} textStyle={[setInactiveButtonClass, route?.name === HomeStack.newScreen && S.BTN_TEXT]} onPress={navigateNew} />
      </View>
      <View style={S.BTN}>
        <Button
          preset={'text'}
          text={'Trending'}
          textStyle={[setInactiveButtonClass, route?.name === HomeStack.trendingScreen && S.BTN_TEXT]}
          onPress={navigateTrending}
        />
      </View>
      <View style={S.BTN}>
        <Button preset={'text'} text={'Following'} textStyle={[S.BTN_TEXT_OPACITY, setActiveFollowing()]} onPress={navigateFollowing} />
      </View>
    </View>
  );
});
