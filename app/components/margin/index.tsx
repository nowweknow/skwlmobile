import React from 'react';
import {View} from 'react-native';

interface IProps {
  children: React.ReactNode;
  marginTop?: number;
}
export const MarginTopBlock = ({children, marginTop}: IProps) => {
  return <View style={{marginTop: marginTop || 12}}>{children}</View>;
};
