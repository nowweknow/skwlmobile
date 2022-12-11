import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';

import {Text} from 'components';

import * as S from './styles';

interface IProps {
  title: string;
  price: string;
  link: string;
}

export const AdsBlock = ({title, price, link}: IProps) => {
  return (
    <TouchableOpacity style={S.ADS} onPress={() => Linking.openURL(link)}>
      <View style={S.ADS_INFO}>
        <Text style={S.ADS_PRODUCT_TEXT}>{title}</Text>
      </View>
        <Text style={S.ADS_PRICE}>${price}</Text>
    </TouchableOpacity>
  );
};
