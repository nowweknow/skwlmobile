import {SVGIcon, Text} from 'components';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {StyleProp, TouchableOpacity, View, ViewStyle, ActivityIndicator, Keyboard, KeyboardAvoidingViewBase} from 'react-native';
import {colors} from 'theme';
import {IconTypes} from 'app/components/svg-icon/icons';

import * as S from './styles';
import { InboxStack } from 'app/navigation/constans';

export type InboxNavigatorParams = {
  inboxScreen: undefined;
  inboxDialogScreen: {id: number; val: number; name: string};
};
interface IProps {
  title: string;
  isBack: boolean;
  rightIconHandler?: () => void;
  rightIcon?: IconTypes;
  titleColor?: string;
  leftIconColor?: string;
  rightIconColor?: string;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconWidth?: number;
  iconHeight?: number;
  isLoading?: boolean;
}

export const Header = (props: IProps) => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack();
  };
 
  const {title, isBack, rightIconHandler, rightIcon, titleColor, leftIconColor, rightIconColor, iconSize, iconWidth, iconHeight, style, isLoading} = props;
  return (
    <View style={[S.HEADER, style]}>
      <Text preset={'titleBold'} style={S.TITLE_TEXT} color={titleColor || colors.accent}>
        {title}
      </Text>
      {isBack && (
        <TouchableOpacity onPress={goBackHandler} style={S.ICON_LEFT}>
          <SVGIcon name={'arrowLeft'} color={leftIconColor || colors.black} width={iconSize || iconWidth} height={iconSize || iconHeight} size={iconSize} />
        </TouchableOpacity>
      )}
      {rightIcon && (
        <TouchableOpacity onPress={rightIconHandler} style={S.ICON_RIGHT}>
          <SVGIcon
            name={rightIcon as IconTypes}
            color={rightIconColor || colors.black}
            width={iconSize || iconWidth}
            height={iconSize || iconHeight}
            size={iconSize}
          />
        </TouchableOpacity>
      )}
      {isLoading && (
        <View style={S.ICON_RIGHT}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};
