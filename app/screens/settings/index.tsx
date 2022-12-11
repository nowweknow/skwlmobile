import { Screen } from 'app/components/screen';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Linking } from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Button, Container, Text } from 'components';
import { colors } from 'theme';
import { ProfileNavigatorParams } from 'navigation';
import { HomeStack, ProfileStack } from 'app/navigation/constans';
import { Header } from 'app/screens/common/customComponents';

import * as S from './styles';
import { useDispatch } from 'react-redux';
import { setIsLogged } from 'app/redux/reducers/auth/authSlice';
import { setProfile } from 'app/redux/reducers/profile/profileSlice';

interface IProps {
  navigation: NativeStackNavigationProp<ProfileNavigatorParams>;
}

export const SettingsScreen = ({ navigation }: IProps) => {
  const dispatch = useDispatch()

  const onLogoutPress = async () => {
    dispatch(setProfile(null))
    dispatch(setIsLogged(false))
    navigation.navigate(HomeStack.trendingScreen)
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }

  const buttons = [
    { title: 'Edit profile', handler: () => navigation.navigate(ProfileStack.editProfileScreen) },
    { title: 'Saved products', handler: () => navigation.navigate(ProfileStack.savedProductsScreen) },
    { title: 'Liked videos', handler: () => navigation.navigate(ProfileStack.likedVideosScreen) },
    { title: 'Notifications', handler: () => navigation.navigate(ProfileStack.notificationsScreen) },
    // { title: 'Subscription', handler: () => navigation.navigate(ProfileStack.subscriptionScreen) },
    { title: 'Report a problem', handler: () => navigation.navigate(ProfileStack.reportScreen) },
    { title: 'Privacy Policy', handler: () => Linking.openURL('https://www.termsfeed.com/live/42ce5adf-8d2b-4536-9dee-da6b1426428c') },
    { title: 'Copyright Policy', handler: () => Linking.openURL('https://www.termsfeed.com/live/6d503a89-8a2f-4121-9b02-47f1156c1ee5') },
    { title: 'Log out', handler: () => onLogoutPress() },
  ];

  return (
    <Screen>
      <Container>
        <Header style={S.HEADER} title={'Settings'} isBack={true} />
      </Container>
      <Container marginTop={29}>
        {buttons.map(button => {
          return (
            <Button
              key={button.title}
              iconRight={'arrowRight'}
              iconSize={12}
              iconColor={colors.grey1}
              style={S.BUTTON}
              textStyle={S.BUTTON_TEXT}
              text={button.title}
              onPress={button.handler}
              fullWith={true}
            />
          );
        })}
      </Container>
    </Screen>
  );
};
