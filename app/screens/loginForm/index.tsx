import React, {useState} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';

import {Button, Input, MarginTopBlock, Screen, Text} from 'components';
import {colors} from 'theme';
import {Header} from 'app/screens/common/customComponents';
import {AppNavigatorParams} from 'navigation';
import {SliderStack} from 'app/navigation/constans';
import {authSlice} from 'app/redux/reducers/auth/authSlice';

import * as S from './styles';

export const LoginFormScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParams>>();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    if (!email || !password) {
      return Snackbar.show({
        text: 'email and password are required!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.red,
      });
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      dispatch(authSlice.actions.login());
      Snackbar.show({
        text: 'Login successfully created',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.success,
      });
      setTimeout(() => {
        navigation.navigate(SliderStack.bottomTabs);
      }, 1000);
    } catch (e) {
      Snackbar.show({
        text: String(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.red,
      });
    }
  };

  return (
    <Screen style={S.LOGIN}>
      <Header title={''} isBack={true} />
      <View style={S.CONTAINER}>
        <View style={S.TITLE}>
          <Text style={S.TITLE_TEXT}>Login with Google</Text>
        </View>
        <View>
          <Text style={S.LABEL} text={'Email'} color={colors.stone} />
          <Input keyboardType={'email-address'} value={email} onChangeText={text => setEmail(text)} />
          <MarginTopBlock>
            <Text style={S.LABEL} text={'Password'} color={colors.stone} />
            <Input value={password} onChangeText={text => setPassword(text)} />
          </MarginTopBlock>
          <MarginTopBlock>
            <Button onPress={loginHandler} text={'Login with Google'} fullWith={true} isCentered={true} />
          </MarginTopBlock>
        </View>
      </View>
    </Screen>
  );
};
