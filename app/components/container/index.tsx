import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import * as S from './styles';

interface IProps {
  children: React.ReactNode;
  marginTop?: number;
  style?: StyleProp<ViewStyle>;
}
export const Container = ({children, marginTop, style}: IProps) => {
  return <View style={[S.CONTAINER, {marginTop: marginTop}, style]}>{children}</View>;
};
