import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Button, MarginTopBlock, Screen, SVGIcon, Text} from 'components';
import {colors} from 'theme';
import {BottomTabsParam} from 'navigation';
import {BottomTabStack, HomeStack, SliderStack} from 'app/navigation/constans';

import * as S from './styles';
import {SignEnum} from 'enum';
import {useDispatch, useSelector} from 'react-redux';
import {signInWithFacebook, signInWithGoogle, signInWithApple, signUpWithApple, signUpWithFacebook, signUpWithGoogle} from 'app/redux/reducers/auth/actionCreators';
import {auth} from 'app/redux/selectors';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {WEB_CLIENT_ID_FOR_GOOGLE_LOGIN} from '@env';
import appleAuth from '@invertase/react-native-apple-authentication';

interface IProps {
  title: string;
  buttonText: string;
  description: string;
  buttonHandler: () => void;
  navigation: NativeStackNavigationProp<BottomTabsParam>;
  type: SignEnum;
}
export const SignCommon = (props: IProps) => {
  const dispatch = useDispatch();
  const {title, buttonText, description, buttonHandler, navigation, type} = props;
  const error: string | null = useSelector(auth.error);

  const navigateHome = () => {
    navigation.navigate(BottomTabStack.homeTab, {screen: HomeStack.trendingScreen});
  };

  const navToSignUpWithNumber = () => {
    return navigation.navigate(SliderStack.signUpWithNumberScreen);
  };
  const navToSignInWithNumber = () => {
    return navigation.navigate(SliderStack.signInWithNumberScreen);
  };
  // useEffect(() => {
  //   if (error) {
  //     Alert.alert('Error', error as string);
  //     console.log(error);
  //   }
  // }, [error]);

 
  const googleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const googleSignUp = () => {
    dispatch(signUpWithGoogle());
  };

  const facebookSignUp = () => {
    dispatch(signUpWithFacebook());
  };

  const facebookSignIn = () => {
    dispatch(signInWithFacebook());
  };

  const appleSignIn = () => {
    dispatch(signInWithApple());
  };
  const appleSignUp = () => {
    dispatch(signUpWithApple());
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID_FOR_GOOGLE_LOGIN,
      offlineAccess: true,
    });

    if (Platform.OS !== 'ios') {
      return;
    }

    return appleAuth.onCredentialRevoked(async () => {
      //console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []);

  return (
    <Screen style={S.CONTAINER}>
      <TouchableOpacity activeOpacity={1} style={S.BTN_CLOSE} onPress={navigateHome}>
        <SVGIcon name={'close'} color={colors.black} width={18} height={18} />
      </TouchableOpacity>
      <MarginTopBlock marginTop={60}>
        <View style={S.TITLE}>
          <Text preset="titleBiggest" text={`${title} for Skwl`} />
        </View>
        <Text style={S.SUBTITLE} preset={'titleBig'} text="Create a profile, follow other accounts, make your own videos, and more." />
      </MarginTopBlock>

      <View style={S.CONTINUE_BLOCK}>
        {/* <Button
          onPress={type === SignEnum.SIGN_IN ? facebookSignIn : facebookSignUp}
          fullWith={true}
          style={S.BUTTON}
          textStyle={S.BUTTON_TEXT}
          text="Continue with Facebook"
          iconLeft="facebook"
          iconColor={colors.grey2}
        /> */}
        <MarginTopBlock>
          <Button
            onPress={type === SignEnum.SIGN_IN ? googleSignIn : googleSignUp}
            fullWith={true}
            style={S.BUTTON}
            textStyle={S.BUTTON_TEXT}
            text="Continue with Google"
            iconLeft="google"
            iconColor={colors.grey2}
          />
        </MarginTopBlock>
        {Platform.OS === 'ios' && (
          <MarginTopBlock>
            <Button
              onPress={type === SignEnum.SIGN_IN ? appleSignIn : appleSignUp}
              fullWith={true}
              style={S.BUTTON}
              textStyle={S.BUTTON_TEXT}
              text="Continue with Apple"
              iconLeft="apple"
              iconColor={colors.grey2}
            />
          </MarginTopBlock>
        )}
        <MarginTopBlock>
          <Button
            onPress={type === SignEnum.SIGN_IN ? navToSignInWithNumber : navToSignUpWithNumber }
            fullWith={true}
            style={S.BUTTON}
            textStyle={S.BUTTON_TEXT}
            text="Continue with Phone number"
            iconLeft="phone"
            iconColor={colors.grey2}
          />
        </MarginTopBlock>
      </View>

      <View style={S.ACCOUNT}>
        <Text>{description}</Text>
        <Button onPress={buttonHandler} text={` ${buttonText}`} preset="underline" />
      </View>

      <View style={S.FOOTER}>
        <Text style={S.FOOTER_TEXT}>By signing up, you agree to our </Text>
        <Button text={'Terms of Service'} preset={'underline'} textStyle={S.FOOTER_TEXT} />
        <Text style={S.FOOTER_TEXT}>and acknowledge that you have read our </Text>
        <Button text={'Privacy Policy'} preset={'underline'} textStyle={S.FOOTER_TEXT} />
        <Text style={S.FOOTER_TEXT}>to learn how we collect, use, and share your date.</Text>
      </View>
    </Screen>
  );
};
