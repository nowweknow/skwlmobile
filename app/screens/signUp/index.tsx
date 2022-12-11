import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppNavigatorParams} from 'navigation';
import {SliderStack} from 'app/navigation/constans';
import {SignCommon} from 'app/screens/common/screens';
import {SignEnum} from 'enum';

export const SignUpScreen: FC<NativeStackScreenProps<AppNavigatorParams>> = ({navigation}) => {
  const navigateLogin = () => {
    navigation.navigate(SliderStack.loginScreen);
  };

  return (
    <SignCommon
      type={SignEnum.SIGN_UP}
      title={'Sign Up'}
      buttonText={'Login'}
      description={'Already have an account?'}
      buttonHandler={navigateLogin}
      navigation={navigation}
    />
  );
};
