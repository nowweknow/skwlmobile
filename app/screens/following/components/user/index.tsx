import React from 'react';
import {ImageBackground, View} from 'react-native';

import {Text} from 'components';

import * as S from './styles';

interface IProps {
  firstName: string;
  lastName: string;
  nickName: string;
}
export const User = (props: IProps) => {
  const {firstName, lastName, nickName} = props;
  return (
    <View style={S.CONTAINER}>
      <ImageBackground resizeMode="cover" style={S.IMAGE_BG} source={require('../img_mock/wave.jpg')} />
      <Text>{firstName}</Text>
      <Text>{lastName}</Text>
      <Text>{nickName}</Text>
    </View>
  );
};
