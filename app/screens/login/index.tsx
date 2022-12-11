import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppNavigatorParams} from 'navigation';
import {SliderStack} from 'app/navigation/constans';
import {SignCommon} from 'app/screens/common/screens';
import {SignEnum} from 'enum';

export const LoginScreen: FC<NativeStackScreenProps<AppNavigatorParams>> = ({navigation}) => {
  const navigateSignup = () => {
    navigation.navigate(SliderStack.signUpScreen);
  };

  return (
    <SignCommon
      type={SignEnum.SIGN_IN}
      title={'Sign in'}
      buttonText={'Sign Up'}
      description={"Don't have an account?"}
      buttonHandler={navigateSignup}
      navigation={navigation}
    />
  );
};
