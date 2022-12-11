import React, {FC} from 'react';
import {StyleProp, TextInput, View, ViewStyle, TextStyle, TouchableOpacity, KeyboardTypeOptions} from 'react-native';

import {colors} from 'theme';
import {SVGIcon} from 'app/components/svg-icon';
import {IconTypes} from 'app/components/svg-icon/icons';

import * as S from './styles';

type InputProps = {
  styleContainer?: StyleProp<ViewStyle>;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  textStyle?: StyleProp<TextStyle | ViewStyle>;
  iconLeft?: IconTypes;
  leftIconWidth?: number;
  leftIconHeight?: number;
  leftIconSize?: number;
  leftIconColor?: string;
  iconRight?: IconTypes;
  rightIconWidth?: number;
  rightIconHeight?: number;
  rightIconSize?: number;
  rightIconColor?: string;
  rightIconHandler?: () => void;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
};

export const Input: FC<InputProps> = ({
  styleContainer,
  placeholder,
  value,
  onChangeText = () => {},
  textStyle = {},
  iconLeft,
  leftIconWidth,
  leftIconHeight,
  leftIconSize,
  leftIconColor,
  iconRight,
  rightIconWidth,
  rightIconHeight,
  rightIconSize,
  rightIconColor,
  rightIconHandler,
  editable,
  keyboardType,
  multiline,

  ...props
}) => {
  return (
    <View style={[S.CONTAINER, styleContainer]}>
      {iconLeft && (
        <View style={S.ICON_LEFT}>
          <SVGIcon name={iconLeft} color={leftIconColor} width={leftIconSize || leftIconWidth} height={leftIconSize || leftIconHeight} size={leftIconSize} />
        </View>
      )}

      <View style={S.INPUT}>
        <TextInput
          autoCapitalize="none"
          placeholderTextColor={colors.darkGrey}
          placeholder={placeholder}
          style={[S.TEXT, textStyle]}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          multiline={multiline}
          {...props}
        />
      </View>

      {iconRight && (
        <TouchableOpacity onPress={rightIconHandler}>
          <SVGIcon name={iconRight} color={rightIconColor} size={rightIconSize} height={rightIconHeight} width={rightIconWidth} />
        </TouchableOpacity>
      )}
    </View>
  );
};
